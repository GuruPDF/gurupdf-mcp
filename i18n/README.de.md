# GuruPDF MCP — PDFs und 100+ Dateiformate direkt aus deinem AI-Agenten konvertieren

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![npm downloads](https://img.shields.io/npm/dm/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![license: MIT](https://img.shields.io/npm/l/gurupdf-mcp.svg)](./LICENSE)

Ein kostenloser **[Model Context Protocol](https://modelcontextprotocol.io) (MCP) Server**, mit dem Claude, Cursor, VS Code, Windsurf und andere AI-Agenten **PDFs konvertieren, komprimieren, zusammenführen, aufteilen und bearbeiten können — und zwischen 100+ Dateiformaten konvertieren** (Word, Excel, PowerPoint, JPG, PNG, HEIC, E-Books und mehr), direkt auf deinem eigenen Rechner. Unterstützt von [GuruPDF](https://gurupdf.com).

**Languages:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · **Deutsch** · [中文](README.zh.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Türkçe](README.tr.md) · [Čeština](README.cs.md) · [Ελληνικά](README.el.md) · [العربية](README.ar.md)

> Frag deinen Assistenten: *"compress this PDF"*, *"turn invoice.docx into a PDF"* oder *"merge these three files"* — und er konvertiert die Dateien direkt auf deinem Rechner.

- 🗂️ **126 Werkzeuge** — PDF ⇄ Word/Excel/PowerPoint, Bilder, E-Books, OCR, komprimieren, zusammenführen, aufteilen, drehen, schützen, Wasserzeichen und mehr.
- 💻 **Funktioniert mit deinen lokalen Dateien** — liest und schreibt Dateien auf der Festplatte, kein manuelles Hoch- oder Herunterladen.
- 🆓 **Kostenloser Einstieg** — jedes Konto erhält tägliche Credits. Keine Kreditkarte erforderlich.

## Installation

Du benötigst **Node.js 18+** und einen kostenlosen **GuruPDF API-Schlüssel**:

1. Registriere dich auf **[gurupdf.com](https://gurupdf.com)**.
2. Öffne **[Profile → API tokens](https://gurupdf.com/profile)** und erstelle ein Token.
3. Füge den Server mit diesem Schlüssel zu deinem Agenten hinzu (Konfigurationen unten). Kein Installationsschritt nötig — `npx` lädt ihn beim ersten Ausführen.

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

`~/.cursor/mcp.json` (oder `.cursor/mcp.json` in einem Projekt):

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

## Werkzeuge

| Tool | Was es macht |
|------|--------------|
| `convert_file` | Konvertiert/verarbeitet eine lokale Datei (oder URL). Übergib eine Eingabe und ein Zielformat (`pdf`, `png`, `docx`…) oder einen Tool-Slug (`compress-pdf`, `merge-pdf`…). Speichert das Ergebnis auf der Festplatte. |
| `get_status` | Prüft einen Konvertierungsauftrag anhand der id und lädt das Ergebnis herunter, wenn es bereit ist (für lange Jobs wie Video). |
| `list_conversions` | Listet unterstützte Konvertierungen/Tools auf, optional gefiltert nach einem Eingabeformat. |
| `check_credits` | Zeigt verbleibende Credits und wie du mehr bekommst. |

### Beispiele

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

## Kostenloses Kontingent & Credits

Jedes Tool kostet ein paar Credits. Kostenlose Konten erhalten **tägliche Credits** (werden jeden Tag aktualisiert) sowie **2 Konvertierungen/Minute, 10/Tag**. Wenn sie aufgebraucht sind, sagt dir der Assistent Bescheid — du kannst auf die tägliche Aktualisierung warten oder [Credits aufladen / upgraden](https://gurupdf.com/pricing). Konvertierungen laufen auf den Servern von GuruPDF; Dateien werden innerhalb einer Stunde automatisch gelöscht.

## Konfiguration

| Env var | Standard | Hinweise |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Erforderlich.** Dein API-Token aus [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | Nur für Self-Hosted / Staging überschreiben. |

## Links

- Website: [gurupdf.com](https://gurupdf.com)
- API-Dokumentation: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Preise: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## Lizenz

MIT
