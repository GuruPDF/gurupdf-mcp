# GuruPDF MCP — convert PDFs & 100+ file formats from your AI agent

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/GuruPDF/gurupdf-mcp/blob/main/LICENSE)
[![gurupdf-mcp MCP server](https://glama.ai/mcp/servers/GuruPDF/gurupdf-mcp/badges/score.svg)](https://glama.ai/mcp/servers/GuruPDF/gurupdf-mcp)

A free **[Model Context Protocol](https://modelcontextprotocol.io) (MCP) server** that lets Claude, Cursor, VS Code, Windsurf and other AI agents **convert, compress, merge, split and edit PDFs — and convert between 100+ file formats** (Word, Excel, PowerPoint, JPG, PNG, HEIC, ebooks, and more), right on your own machine. Powered by [GuruPDF](https://gurupdf.com).

**Languages:** English · [Español](i18n/README.es.md) · [Français](i18n/README.fr.md) · [Deutsch](i18n/README.de.md) · [中文](i18n/README.zh.md) · [Русский](i18n/README.ru.md) · [Українська](i18n/README.uk.md) · [Polski](i18n/README.pl.md) · [Nederlands](i18n/README.nl.md) · [Türkçe](i18n/README.tr.md) · [Čeština](i18n/README.cs.md) · [Ελληνικά](i18n/README.el.md) · [العربية](i18n/README.ar.md)

> Ask your assistant: *"compress this PDF"*, *"turn invoice.docx into a PDF"*, or *"merge these three files"* — and it converts the files right on your machine.

- 🗂️ **126 tools** — PDF ⇄ Word/Excel/PowerPoint, images, ebooks, OCR, compress, merge, split, rotate, protect, watermark, and more.
- 💻 **Works on your local files** — reads and writes files on disk, no manual upload/download.
- 🆓 **Free to start** — every account gets daily credits. No credit card required.

## Install

You need **Node.js 18+** and a free **GuruPDF API key**:

1. Sign up at **[gurupdf.com](https://gurupdf.com)**.
2. Open **[Profile → API tokens](https://gurupdf.com/profile)** and create a token.
3. Add the server to your agent with that key (configs below). No install step — `npx` fetches it on first run.

### Claude Desktop

`claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gurupdf": {
      "command": "npx",
      "args": ["-y", "gurupdf-mcp"],
      "env": { "GURUPDF_API_KEY": "your_token_here" }
    }
  }
}
```

### Cursor

`~/.cursor/mcp.json` (or `.cursor/mcp.json` in a project):

```json
{
  "mcpServers": {
    "gurupdf": {
      "command": "npx",
      "args": ["-y", "gurupdf-mcp"],
      "env": { "GURUPDF_API_KEY": "your_token_here" }
    }
  }
}
```

### VS Code

`.vscode/mcp.json`:

```json
{
  "servers": {
    "gurupdf": {
      "command": "npx",
      "args": ["-y", "gurupdf-mcp"],
      "env": { "GURUPDF_API_KEY": "your_token_here" }
    }
  }
}
```

### Windsurf

`~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "gurupdf": {
      "command": "npx",
      "args": ["-y", "gurupdf-mcp"],
      "env": { "GURUPDF_API_KEY": "your_token_here" }
    }
  }
}
```

## Tools

| Tool | What it does |
|------|--------------|
| `convert_file` | Convert/process a local file (or URL). Give it an input and a target format (`pdf`, `png`, `docx`…) or a tool slug (`compress-pdf`, `merge-pdf`…). Saves the result to disk. |
| `get_status` | Check a conversion job by id and download the result when ready (for long jobs like video). |
| `list_conversions` | List supported conversions/tools, optionally filtered by an input format. |
| `check_credits` | Show remaining credits and how to get more. |

### Examples

> **"Compress `~/Documents/report.pdf`."**
> → `convert_file(input: "~/Documents/report.pdf", to: "compress-pdf")`

> **"Convert `invoice.docx` to PDF."**
> → `convert_file(input: "invoice.docx", to: "pdf")`

> **"Merge `a.pdf` and `b.pdf` into one."**
> → `convert_file(input: ["a.pdf", "b.pdf"], to: "merge-pdf")`

> **"Password-protect this PDF with `hunter2`."**
> → `convert_file(input: "secret.pdf", to: "protect-pdf", options: { password: "hunter2" })`

> **"Save this web page as a PDF: https://example.com"**
> → `convert_file(input: "https://example.com", to: "url-to-pdf")`

## Free tier & credits

Each tool costs a few credits. Free accounts get **daily credits** (refreshed every day) and **2 conversions/minute, 10/day**. When you run out, the assistant will tell you — you can wait for the daily refresh or [top up / upgrade](https://gurupdf.com/pricing). Conversions run on GuruPDF's servers; files are deleted automatically within an hour.

## Configuration

| Env var | Default | Notes |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Required.** Your API token from [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | Override only for self-hosted / staging. |

## Links

- Glama: [gurupdf-mcp on Glama](https://glama.ai/mcp/servers/GuruPDF/gurupdf-mcp)

[![gurupdf-mcp MCP server](https://glama.ai/mcp/servers/GuruPDF/gurupdf-mcp/badges/card.svg)](https://glama.ai/mcp/servers/GuruPDF/gurupdf-mcp)

- Landing page: [gurupdf.com/mcp](https://gurupdf.com/mcp)
- Guide: [Convert files in Claude & Cursor with the GuruPDF MCP](https://gurupdf.com/blog/file-conversion-mcp-for-claude-and-cursor)
- Website: [gurupdf.com](https://gurupdf.com)
- API docs: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Pricing: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## License

MIT
