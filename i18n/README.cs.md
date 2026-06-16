# GuruPDF MCP — převádějte PDF a více než 100 formátů souborů ze svého AI agenta

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/GuruPDF/gurupdf-mcp/blob/main/LICENSE)

Bezplatný **[Model Context Protocol](https://modelcontextprotocol.io) (MCP) server**, který umožňuje Claude, Cursor, VS Code, Windsurf a dalším AI agentům **převádět, komprimovat, slučovat, rozdělovat a upravovat PDF — a převádět mezi více než 100 formáty souborů** (Word, Excel, PowerPoint, JPG, PNG, HEIC, e-knihy a další), přímo na vašem počítači. Poháněno službou [GuruPDF](https://gurupdf.com).

**Languages:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [中文](README.zh.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Türkçe](README.tr.md) · **Čeština** · [Ελληνικά](README.el.md) · [العربية](README.ar.md)

> Zeptejte se svého asistenta: *"komprimuj toto PDF"*, *"převeď invoice.docx na PDF"* nebo *"sluč tyto tři soubory"* — a on soubory převede přímo na vašem počítači.

- 🗂️ **126 nástrojů** — PDF ⇄ Word/Excel/PowerPoint, obrázky, e-knihy, OCR, komprese, slučování, rozdělování, otáčení, ochrana, vodoznaky a další.
- 💻 **Funguje s vašimi lokálními soubory** — čte a zapisuje soubory na disk, bez ručního nahrávání/stahování.
- 🆓 **Zdarma na začátek** — každý účet získá denní kredity. Není vyžadována platební karta.

## Instalace

Potřebujete **Node.js 18+** a bezplatný **GuruPDF API key**:

1. Zaregistrujte se na **[gurupdf.com](https://gurupdf.com)**.
2. Otevřete **[Profile → API tokens](https://gurupdf.com/profile)** a vytvořte token.
3. Přidejte server do svého agenta pomocí tohoto klíče (konfigurace níže). Není potřeba žádný instalační krok — `npx` jej při prvním spuštění stáhne.

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

`~/.cursor/mcp.json` (nebo `.cursor/mcp.json` v projektu):

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

## Nástroje

| Tool | Co dělá |
|------|--------------|
| `convert_file` | Převede/zpracuje lokální soubor (nebo URL). Zadejte vstup a cílový formát (`pdf`, `png`, `docx`…) nebo slug nástroje (`compress-pdf`, `merge-pdf`…). Výsledek uloží na disk. |
| `get_status` | Zkontroluje úlohu převodu podle id a stáhne výsledek, jakmile je připraven (pro delší úlohy, jako je video). |
| `list_conversions` | Vypíše podporované převody/nástroje, volitelně filtrované podle vstupního formátu. |
| `check_credits` | Zobrazí zbývající kredity a jak získat další. |

### Příklady

> **"Komprimuj `~/Documents/report.pdf`."**
> → `convert_file(input: "~/Documents/report.pdf", to: "compress-pdf")`

> **"Převeď `invoice.docx` na PDF."**
> → `convert_file(input: "invoice.docx", to: "pdf")`

> **"Sluč `a.pdf` a `b.pdf` do jednoho."**
> → `convert_file(input: ["a.pdf", "b.pdf"], to: "merge-pdf")`

> **"Chraň toto PDF heslem `hunter2`."**
> → `convert_file(input: "secret.pdf", to: "protect-pdf", options: { password: "hunter2" })`

> **"Ulož tuto webovou stránku jako PDF: https://example.com"**
> → `convert_file(input: "https://example.com", to: "url-to-pdf")`

## Bezplatná úroveň a kredity

Každý nástroj stojí několik kreditů. Bezplatné účty získávají **denní kredity** (obnovované každý den) a **2 převody/minutu, 10/den**. Když vám dojdou, asistent vám to oznámí — můžete počkat na denní obnovení nebo [doplnit kredity / přejít na vyšší tarif](https://gurupdf.com/pricing). Převody běží na serverech GuruPDF; soubory jsou automaticky smazány do jedné hodiny.

## Konfigurace

| Env var | Výchozí | Poznámky |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Povinné.** Váš API token z [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | Přepisujte pouze pro self-hosted / staging. |

## Odkazy

- Website: [gurupdf.com](https://gurupdf.com)
- API docs: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Pricing: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## Licence

MIT
