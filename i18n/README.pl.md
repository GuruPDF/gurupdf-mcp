# GuruPDF MCP — konwertuj PDF i ponad 100 formatów plików ze swojego agenta AI

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![npm downloads](https://img.shields.io/npm/dm/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![license: MIT](https://img.shields.io/npm/l/gurupdf-mcp.svg)](./LICENSE)

Darmowy **serwer [Model Context Protocol](https://modelcontextprotocol.io) (MCP)**, który pozwala Claude, Cursor, VS Code, Windsurf i innym agentom AI **konwertować, kompresować, scalać, dzielić i edytować PDF — a także konwertować między ponad 100 formatami plików** (Word, Excel, PowerPoint, JPG, PNG, HEIC, ebooki i inne), bezpośrednio na Twoim własnym komputerze. Oparty na [GuruPDF](https://gurupdf.com).

**Languages:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [中文](README.zh.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · **Polski** · [Nederlands](README.nl.md) · [Türkçe](README.tr.md) · [Čeština](README.cs.md) · [Ελληνικά](README.el.md) · [العربية](README.ar.md)

> Poproś swojego asystenta: *„skompresuj ten PDF”*, *„zamień invoice.docx na PDF”* albo *„scal te trzy pliki”* — a on przekonwertuje pliki bezpośrednio na Twoim komputerze.

- 🗂️ **126 narzędzi** — PDF ⇄ Word/Excel/PowerPoint, obrazy, ebooki, OCR, kompresja, scalanie, dzielenie, obracanie, ochrona, znak wodny i nie tylko.
- 💻 **Działa na Twoich lokalnych plikach** — odczytuje i zapisuje pliki na dysku, bez ręcznego przesyłania/pobierania.
- 🆓 **Za darmo na start** — każde konto otrzymuje dzienne kredyty. Karta kredytowa nie jest wymagana.

## Instalacja

Potrzebujesz **Node.js 18+** i darmowego **klucza API GuruPDF**:

1. Zarejestruj się na **[gurupdf.com](https://gurupdf.com)**.
2. Otwórz **[Profile → API tokens](https://gurupdf.com/profile)** i utwórz token.
3. Dodaj serwer do swojego agenta za pomocą tego klucza (konfiguracje poniżej). Brak kroku instalacji — `npx` pobierze go przy pierwszym uruchomieniu.

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

`~/.cursor/mcp.json` (lub `.cursor/mcp.json` w projekcie):

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

## Narzędzia

| Tool | What it does |
|------|--------------|
| `convert_file` | Konwertuje/przetwarza lokalny plik (lub URL). Podaj dane wejściowe i format docelowy (`pdf`, `png`, `docx`…) albo slug narzędzia (`compress-pdf`, `merge-pdf`…). Zapisuje wynik na dysku. |
| `get_status` | Sprawdza zadanie konwersji po id i pobiera wynik, gdy jest gotowy (dla dłuższych zadań, takich jak wideo). |
| `list_conversions` | Wyświetla obsługiwane konwersje/narzędzia, opcjonalnie przefiltrowane według formatu wejściowego. |
| `check_credits` | Pokazuje pozostałe kredyty i sposób uzyskania większej liczby. |

### Przykłady

> **„Skompresuj `~/Documents/report.pdf`.”**
> → `convert_file(input: "~/Documents/report.pdf", to: "compress-pdf")`

> **„Konwertuj `invoice.docx` do PDF.”**
> → `convert_file(input: "invoice.docx", to: "pdf")`

> **„Scal `a.pdf` i `b.pdf` w jeden plik.”**
> → `convert_file(input: ["a.pdf", "b.pdf"], to: "merge-pdf")`

> **„Zabezpiecz ten PDF hasłem `hunter2`.”**
> → `convert_file(input: "secret.pdf", to: "protect-pdf", options: { password: "hunter2" })`

> **„Zapisz tę stronę internetową jako PDF: https://example.com”**
> → `convert_file(input: "https://example.com", to: "url-to-pdf")`

## Darmowy plan i kredyty

Każde narzędzie kosztuje kilka kredytów. Darmowe konta otrzymują **dzienne kredyty** (odświeżane każdego dnia) oraz **2 konwersje/minutę, 10/dzień**. Gdy je wykorzystasz, asystent Cię o tym poinformuje — możesz poczekać na dzienne odświeżenie albo [doładować / przejść na wyższy plan](https://gurupdf.com/pricing). Konwersje są wykonywane na serwerach GuruPDF; pliki są automatycznie usuwane w ciągu godziny.

## Konfiguracja

| Env var | Default | Notes |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Wymagane.** Twój token API z [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | Zastąp tylko w przypadku self-hosted / staging. |

## Linki

- Strona internetowa: [gurupdf.com](https://gurupdf.com)
- Dokumentacja API: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Cennik: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## Licencja

MIT
