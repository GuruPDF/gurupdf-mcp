export type ToolInfo = {
    slug: string;
    name?: string;
    credit_cost?: number;
    accepted_formats?: string[];
    output_format?: string;
    max_file_size_mb?: number;
    category?: string;
};

export type Conversion = {
    uuid: string;
    status: "pending" | "working" | "completed" | "error";
    tool?: string;
    credits_used?: number;
    original_file_name?: string;
    input_format?: string;
    output_format?: string;
    download_url?: string | null;
    error_message?: string | null;
};

export type Balance = {
    daily: number;
    subscription: number;
    purchased: number;
    total: number;
};

/** An error carrying the GuruPDF API error code / status so callers can map it to friendly copy. */
export class GuruPdfError extends Error {
    code: string;
    status: number;
    meta?: Record<string, unknown>;
    retryAfter?: number;

    constructor(message: string, opts: { code?: string; status?: number; meta?: Record<string, unknown>; retryAfter?: number } = {}) {
        super(message);
        this.name = "GuruPdfError";
        this.code = opts.code ?? "ERROR";
        this.status = opts.status ?? 0;
        this.meta = opts.meta;
        this.retryAfter = opts.retryAfter;
    }
}

type ApiResult<T> = { data: T; meta?: Record<string, unknown> };

export class GuruPdfClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string, baseUrl = "https://gurupdf.com/api/v1") {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl.replace(/\/+$/, "");
    }

    private async request<T>(method: string, path: string, opts: { json?: unknown; form?: FormData } = {}): Promise<ApiResult<T>> {
        const headers: Record<string, string> = {
            Authorization: `Bearer ${this.apiKey}`,
            Accept: "application/json",
        };
        let body: BodyInit | undefined;
        if (opts.form) {
            body = opts.form; // fetch sets the multipart boundary itself
        } else if (opts.json !== undefined) {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(opts.json);
        }

        const res = await fetch(`${this.baseUrl}${path}`, { method, headers, body });
        const retryAfter = this.parseRetryAfter(res);
        const raw = await res.text();
        let parsed: any = null;
        try {
            parsed = raw ? JSON.parse(raw) : null;
        } catch {
            /* non-JSON body */
        }

        if (!res.ok) {
            const err = parsed?.error ?? {};
            throw new GuruPdfError(err.message ?? `Request failed (HTTP ${res.status})`, {
                code: err.code ?? `HTTP_${res.status}`,
                status: res.status,
                meta: parsed?.meta ?? err.meta,
                retryAfter,
            });
        }

        return { data: (parsed?.data ?? parsed) as T, meta: parsed?.meta };
    }

    private parseRetryAfter(res: Response): number | undefined {
        const ra = res.headers.get("Retry-After");
        if (ra && /^\d+$/.test(ra)) return Number(ra);
        const reset = res.headers.get("X-RateLimit-Reset");
        if (reset && /^\d+$/.test(reset)) {
            const secs = Number(reset) - Math.floor(Date.now() / 1000);
            if (secs > 0 && secs < 3600) return secs;
        }
        return undefined;
    }

    listTools() {
        return this.request<ToolInfo[]>("GET", "/tools");
    }

    getBalance() {
        return this.request<Balance>("GET", "/account/balance");
    }

    getConversion(uuid: string) {
        return this.request<Conversion>("GET", `/conversions/${encodeURIComponent(uuid)}`);
    }

    startConversion(
        slug: string,
        files: { filename: string; buffer: Uint8Array }[],
        fields: Record<string, string | number | boolean> = {},
    ) {
        const form = new FormData();
        for (const f of files) {
            form.append("files[]", new Blob([f.buffer as unknown as BlobPart]), f.filename);
        }
        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined && value !== null) form.append(key, String(value));
        }
        return this.request<{ conversions: Conversion[] }>("POST", `/convert/${encodeURIComponent(slug)}`, { form });
    }

    async download(uuid: string): Promise<{ buffer: Buffer; filename: string }> {
        const res = await fetch(`${this.baseUrl}/conversions/${encodeURIComponent(uuid)}/download`, {
            headers: { Authorization: `Bearer ${this.apiKey}` },
        });
        if (!res.ok) {
            let parsed: any = null;
            try {
                parsed = await res.json();
            } catch {
                /* ignore */
            }
            const err = parsed?.error ?? {};
            throw new GuruPdfError(err.message ?? `Download failed (HTTP ${res.status})`, {
                code: err.code ?? `HTTP_${res.status}`,
                status: res.status,
                meta: parsed?.meta,
            });
        }
        const buffer = Buffer.from(await res.arrayBuffer());
        const disposition = res.headers.get("Content-Disposition") ?? "";
        const match = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
        const filename = match ? decodeURIComponent(match[1]) : uuid;
        return { buffer, filename };
    }
}
