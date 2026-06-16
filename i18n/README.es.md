# GuruPDF MCP — convierte PDFs y más de 100 formatos de archivo desde tu agente de AI

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/GuruPDF/gurupdf-mcp/blob/main/LICENSE)

Un **servidor gratuito de [Model Context Protocol](https://modelcontextprotocol.io) (MCP)** que permite a Claude, Cursor, VS Code, Windsurf y otros agentes de AI **convertir, comprimir, fusionar, dividir y editar PDFs — y convertir entre más de 100 formatos de archivo** (Word, Excel, PowerPoint, JPG, PNG, HEIC, ebooks y más), directamente en tu propia máquina. Impulsado por [GuruPDF](https://gurupdf.com).

**Languages:** [English](../README.md) · **Español** · [Français](README.fr.md) · [Deutsch](README.de.md) · [中文](README.zh.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Türkçe](README.tr.md) · [Čeština](README.cs.md) · [Ελληνικά](README.el.md) · [العربية](README.ar.md)

> Pídele a tu asistente: *"compress this PDF"*, *"turn invoice.docx into a PDF"*, o *"merge these three files"* — y convierte los archivos directamente en tu máquina.

- 🗂️ **126 herramientas** — PDF ⇄ Word/Excel/PowerPoint, imágenes, ebooks, OCR, comprimir, fusionar, dividir, rotar, proteger, marca de agua y más.
- 💻 **Funciona con tus archivos locales** — lee y escribe archivos en disco, sin carga/descarga manual.
- 🆓 **Gratis para empezar** — cada cuenta obtiene créditos diarios. No se requiere tarjeta de crédito.

## Install

Necesitas **Node.js 18+** y una **GuruPDF API key** gratuita:

1. Regístrate en **[gurupdf.com](https://gurupdf.com)**.
2. Abre **[Profile → API tokens](https://gurupdf.com/profile)** y crea un token.
3. Añade el servidor a tu agente con esa clave (configuraciones abajo). No hay paso de instalación — `npx` lo obtiene en la primera ejecución.

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

`~/.cursor/mcp.json` (o `.cursor/mcp.json` en un proyecto):

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

| Tool | Qué hace |
|------|----------|
| `convert_file` | Convierte/procesa un archivo local (o URL). Dale una entrada y un formato de destino (`pdf`, `png`, `docx`…) o un slug de herramienta (`compress-pdf`, `merge-pdf`…). Guarda el resultado en disco. |
| `get_status` | Comprueba un trabajo de conversión por id y descarga el resultado cuando esté listo (para trabajos largos como video). |
| `list_conversions` | Lista las conversiones/herramientas compatibles, opcionalmente filtradas por un formato de entrada. |
| `check_credits` | Muestra los créditos restantes y cómo obtener más. |

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

Cada herramienta cuesta unos pocos créditos. Las cuentas gratuitas obtienen **créditos diarios** (actualizados cada día) y **2 conversiones/minuto, 10/día**. Cuando se te acaben, el asistente te lo dirá — puedes esperar a la actualización diaria o [recargar / mejorar tu plan](https://gurupdf.com/pricing). Las conversiones se ejecutan en los servidores de GuruPDF; los archivos se eliminan automáticamente en el plazo de una hora.

## Configuration

| Env var | Default | Notes |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Obligatoria.** Tu token de API de [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | Cámbialo solo para self-hosted / staging. |

## Links

- Website: [gurupdf.com](https://gurupdf.com)
- API docs: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Pricing: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## License

MIT
