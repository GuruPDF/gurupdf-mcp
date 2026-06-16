# GuruPDF MCP — converteer PDF's en 100+ bestandsindelingen vanuit je AI-agent

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/GuruPDF/gurupdf-mcp/blob/main/LICENSE)

Een gratis **[Model Context Protocol](https://modelcontextprotocol.io) (MCP) server** waarmee Claude, Cursor, VS Code, Windsurf en andere AI-agents **PDF's kunnen converteren, comprimeren, samenvoegen, splitsen en bewerken — en kunnen converteren tussen 100+ bestandsindelingen** (Word, Excel, PowerPoint, JPG, PNG, HEIC, e-books en meer), rechtstreeks op je eigen machine. Aangedreven door [GuruPDF](https://gurupdf.com).

**Languages:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [中文](README.zh.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Polski](README.pl.md) · **Nederlands** · [Türkçe](README.tr.md) · [Čeština](README.cs.md) · [Ελληνικά](README.el.md) · [العربية](README.ar.md)

> Vraag je assistent: *"comprimeer deze PDF"*, *"maak van invoice.docx een PDF"*, of *"voeg deze drie bestanden samen"* — en hij converteert de bestanden rechtstreeks op jouw machine.

- 🗂️ **126 tools** — PDF ⇄ Word/Excel/PowerPoint, afbeeldingen, e-books, OCR, comprimeren, samenvoegen, splitsen, roteren, beveiligen, watermerken en meer.
- 💻 **Werkt met je lokale bestanden** — leest en schrijft bestanden op schijf, zonder handmatig uploaden/downloaden.
- 🆓 **Gratis om te starten** — elk account krijgt dagelijkse credits. Geen creditcard vereist.

## Installatie

Je hebt **Node.js 18+** en een gratis **GuruPDF API-sleutel** nodig:

1. Registreer op **[gurupdf.com](https://gurupdf.com)**.
2. Open **[Profile → API tokens](https://gurupdf.com/profile)** en maak een token aan.
3. Voeg de server toe aan je agent met die sleutel (configuraties hieronder). Geen installatiestap — `npx` haalt het op bij de eerste uitvoering.

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

`~/.cursor/mcp.json` (of `.cursor/mcp.json` in een project):

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

| Tool | Wat het doet |
|------|--------------|
| `convert_file` | Converteer/verwerk een lokaal bestand (of URL). Geef een invoer en een doelformaat (`pdf`, `png`, `docx`…) of een tool-slug (`compress-pdf`, `merge-pdf`…). Slaat het resultaat op schijf op. |
| `get_status` | Controleer een conversietaak op id en download het resultaat zodra het klaar is (voor lange taken zoals video). |
| `list_conversions` | Toon ondersteunde conversies/tools, optioneel gefilterd op een invoerformaat. |
| `check_credits` | Toon resterende credits en hoe je er meer krijgt. |

### Voorbeelden

> **"Comprimeer `~/Documents/report.pdf`."**
> → `convert_file(input: "~/Documents/report.pdf", to: "compress-pdf")`

> **"Converteer `invoice.docx` naar PDF."**
> → `convert_file(input: "invoice.docx", to: "pdf")`

> **"Voeg `a.pdf` en `b.pdf` samen tot één bestand."**
> → `convert_file(input: ["a.pdf", "b.pdf"], to: "merge-pdf")`

> **"Beveilig deze PDF met een wachtwoord `hunter2`."**
> → `convert_file(input: "secret.pdf", to: "protect-pdf", options: { password: "hunter2" })`

> **"Sla deze webpagina op als PDF: https://example.com"**
> → `convert_file(input: "https://example.com", to: "url-to-pdf")`

## Gratis tier & credits

Elke tool kost een paar credits. Gratis accounts krijgen **dagelijkse credits** (elke dag vernieuwd) en **2 conversies/minuut, 10/dag**. Als je zonder credits komt te zitten, zal de assistent het je vertellen — je kunt wachten op de dagelijkse vernieuwing of [opwaarderen / upgraden](https://gurupdf.com/pricing). Conversies draaien op de servers van GuruPDF; bestanden worden automatisch binnen een uur verwijderd.

## Configuratie

| Env var | Standaard | Opmerkingen |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Vereist.** Je API-token van [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | Alleen overschrijven voor self-hosted / staging. |

## Links

- Website: [gurupdf.com](https://gurupdf.com)
- API-documentatie: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Prijzen: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## Licentie

MIT
