#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFile, writeFile, stat } from "node:fs/promises";
import { basename, dirname, join, extname } from "node:path";
import { GuruPdfClient, GuruPdfError, type ToolInfo, type Conversion } from "./client.js";
import { outOfCreditsMessage, rateLimitedMessage, fileTooLargeMessage, noApiKeyMessage } from "./messages.js";

const API_KEY = process.env.GURUPDF_API_KEY ?? "";
const API_URL = process.env.GURUPDF_API_URL ?? "https://gurupdf.com/api/v1";
const client = API_KEY ? new GuruPdfClient(API_KEY, API_URL) : null;

const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });
const isUrl = (s: string) => /^https?:\/\//i.test(s);

let toolCache: ToolInfo[] | null = null;
async function catalog(): Promise<ToolInfo[]> {
    if (!toolCache) toolCache = (await client!.listTools()).data;
    return toolCache;
}

/** Map a GuruPDF error to copy the agent can relay; null if it isn't a known case. */
function friendly(e: unknown): string | null {
    if (e instanceof GuruPdfError) {
        if (e.status === 402 || e.code === "INSUFFICIENT_CREDITS") return outOfCreditsMessage(e.meta);
        if (e.status === 429) return rateLimitedMessage(e.retryAfter);
        return `GuruPDF couldn't do that: ${e.message}`;
    }
    return null;
}

/** Resolve `to` (a target format like "pdf"/"png", or a tool slug) + input extension to a tool. */
function resolveTool(tools: ToolInfo[], to: string, inputExt: string): ToolInfo | null {
    const direct = tools.find((t) => t.slug === to);
    if (direct) return direct;

    const target = "." + to.replace(/^\./, "").toLowerCase();
    const matches = tools.filter(
        (t) =>
            t.output_format?.toLowerCase() === target &&
            (!inputExt || (t.accepted_formats ?? []).map((f) => f.toLowerCase()).includes(inputExt)),
    );
    matches.sort((a, b) => a.slug.length - b.slug.length); // prefer the simplest "<from>-to-<to>"
    return matches[0] ?? null;
}

async function pollUntilDone(uuid: string, timeoutMs = 5 * 60 * 1000): Promise<Conversion> {
    const start = Date.now();
    let delay = 1500;
    // The status endpoint is not rate-limited, so polling is free.
    while (Date.now() - start < timeoutMs) {
        const { data } = await client!.getConversion(uuid);
        if (data.status === "completed" || data.status === "error") return data;
        await new Promise((r) => setTimeout(r, delay));
        delay = Math.min(delay * 1.4, 8000);
    }
    return (await client!.getConversion(uuid)).data;
}

const server = new McpServer({ name: "gurupdf", version: "0.1.2" });

server.tool(
    "convert_file",
    "Convert or process a local file (or URL) with GuruPDF. Convert between 100+ formats (PDF ⇄ Word/Excel/PowerPoint, images, ebooks, etc.) or run a PDF tool (compress, merge, split, rotate, protect, watermark, OCR…). Saves the result next to the input and returns the path.",
    {
        input: z
            .union([z.string(), z.array(z.string())])
            .describe("Absolute path to a local file (or several paths for merge), or an https URL for url-to-pdf."),
        to: z
            .string()
            .describe("Target format (e.g. 'pdf', 'docx', 'png') OR a tool slug (e.g. 'compress-pdf', 'merge-pdf', 'protect-pdf')."),
        output_dir: z.string().optional().describe("Folder to save the result in. Defaults to the input file's folder."),
        options: z
            .record(z.union([z.string(), z.number(), z.boolean()]))
            .optional()
            .describe("Tool-specific options, e.g. { password, page_range, rotation, watermark_text }."),
        wait: z.boolean().optional().describe("Wait for the result (default true). If false, returns a job id to check with get_status."),
    },
    async ({ input, to, output_dir, options, wait }) => {
        if (!client) return text(noApiKeyMessage());
        try {
            const inputs = Array.isArray(input) ? input : [input];
            const urlMode = inputs.length === 1 && isUrl(inputs[0]);
            const inputExt = urlMode ? "" : extname(inputs[0]).toLowerCase();

            const tools = await catalog();
            // URL inputs only work with URL tools (e.g. url-to-pdf). resolveTool keys off the
            // input extension, which is empty for a URL, so route URL mode explicitly — otherwise
            // it falls through to the shortest-slug file tool (merge-pdf, …) and the API 422s.
            const tool = urlMode
                ? tools.find((t) => t.slug === to) ??
                  tools.find(
                      (t) =>
                          (t.accepted_formats?.length ?? 0) === 0 &&
                          t.output_format?.toLowerCase() === "." + to.replace(/^\./, "").toLowerCase(),
                  ) ??
                  tools.find((t) => (t.accepted_formats?.length ?? 0) === 0)
                : resolveTool(tools, to, inputExt);
            if (!tool) {
                return text(
                    `I couldn't find a GuruPDF tool to turn ${inputExt || "that input"} into "${to}". ` +
                        `Run list_conversions${inputExt ? ` with from_format "${inputExt.slice(1)}"` : ""} to see the options.`,
                );
            }

            const fields: Record<string, string | number | boolean> = { ...(options ?? {}) };
            const files: { filename: string; buffer: Uint8Array }[] = [];

            if (urlMode) {
                fields.url = inputs[0];
            } else {
                const maxMb = tool.max_file_size_mb ?? 100;
                for (const p of inputs) {
                    let info;
                    try {
                        info = await stat(p);
                    } catch {
                        return text(`File not found: ${p}`);
                    }
                    if (info.size > maxMb * 1024 * 1024) {
                        return text(fileTooLargeMessage(basename(p), info.size / 1048576, maxMb));
                    }
                    files.push({ filename: basename(p), buffer: await readFile(p) });
                }
            }

            let conv: Conversion | undefined;
            try {
                const res = await client.startConversion(tool.slug, files, fields);
                conv = res.data.conversions?.[0];
            } catch (e) {
                const f = friendly(e);
                if (f) return text(f);
                throw e;
            }
            if (!conv) return text("GuruPDF didn't start the conversion — please try again.");

            if (wait === false) {
                return text(`Started ${tool.slug} (job id ${conv.uuid}). Use get_status with this id to fetch the result.`);
            }

            const done = await pollUntilDone(conv.uuid);
            if (done.status === "error") return text(`The conversion failed: ${done.error_message ?? "unknown error"}.`);
            if (done.status !== "completed") {
                return text(`Still processing (job id ${conv.uuid}) — this one's taking a while. Check back with get_status.`);
            }

            const { buffer, filename } = await client.download(conv.uuid);
            const dir = output_dir ?? (urlMode ? process.cwd() : dirname(inputs[0]));
            const outPath = join(dir, filename);
            await writeFile(outPath, buffer);

            let remaining = "";
            try {
                remaining = ` You have ${(await client.getBalance()).data.total} credits left.`;
            } catch {
                /* non-fatal */
            }
            const used = done.credits_used ?? 0;
            return text(`Done — saved to ${outPath}. Used ${used} credit${used === 1 ? "" : "s"}.${remaining}`);
        } catch (e) {
            return text(friendly(e) ?? `Something went wrong: ${(e as Error).message}`);
        }
    },
);

server.tool(
    "get_status",
    "Check a GuruPDF conversion job by its id (uuid). If it's finished, downloads the result to disk.",
    {
        uuid: z.string().describe("The job id returned by convert_file."),
        output_dir: z.string().optional().describe("Folder to save the result in. Defaults to the current directory."),
    },
    async ({ uuid, output_dir }) => {
        if (!client) return text(noApiKeyMessage());
        try {
            const { data } = await client.getConversion(uuid);
            if (data.status === "error") return text(`Job ${uuid} failed: ${data.error_message ?? "unknown error"}.`);
            if (data.status !== "completed") return text(`Job ${uuid} is "${data.status}". Try again in a few seconds.`);
            const { buffer, filename } = await client.download(uuid);
            const outPath = join(output_dir ?? process.cwd(), filename);
            await writeFile(outPath, buffer);
            return text(`Job ${uuid} is done — saved to ${outPath}.`);
        } catch (e) {
            return text(friendly(e) ?? `Couldn't check job ${uuid}: ${(e as Error).message}`);
        }
    },
);

server.tool(
    "list_conversions",
    "List the conversions and tools GuruPDF supports, optionally filtered by an input file format.",
    {
        from_format: z.string().optional().describe("e.g. 'pdf', 'jpg', 'docx' — show only tools that accept this input."),
    },
    async ({ from_format }) => {
        if (!client) return text(noApiKeyMessage());
        try {
            const tools = await catalog();
            const ext = from_format ? "." + from_format.replace(/^\./, "").toLowerCase() : null;
            const list = ext
                ? tools.filter((t) => (t.accepted_formats ?? []).map((f) => f.toLowerCase()).includes(ext))
                : tools;
            if (!list.length) return text(`No GuruPDF tools accept "${from_format}" files.`);
            const lines = list.map(
                (t) => `- ${t.slug}: ${(t.accepted_formats ?? []).join(", ") || "?"} → ${t.output_format ?? "?"} (${t.credit_cost ?? "?"} credits)`,
            );
            return text(`GuruPDF tools${from_format ? ` for .${from_format.replace(/^\./, "")}` : ""} (${list.length}):\n${lines.join("\n")}`);
        } catch (e) {
            return text(friendly(e) ?? `Couldn't load the tool list: ${(e as Error).message}`);
        }
    },
);

server.tool(
    "check_credits",
    "Show how many GuruPDF credits the user has left, and how to get more.",
    {},
    async () => {
        if (!client) return text(noApiKeyMessage());
        try {
            const { data } = await client.getBalance();
            const lowNote = data.total <= 3 ? " Running low — top up here: https://gurupdf.com/pricing#credit-bundles" : "";
            return text(
                `GuruPDF credits: ${data.total} total (${data.daily} daily, ${data.subscription} subscription, ${data.purchased} purchased).${lowNote}`,
            );
        } catch (e) {
            return text(friendly(e) ?? `Couldn't fetch your balance: ${(e as Error).message}`);
        }
    },
);

const transport = new StdioServerTransport();
await server.connect(transport);
