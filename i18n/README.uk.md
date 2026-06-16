# GuruPDF MCP — конвертуйте PDF і 100+ форматів файлів зі свого AI-агента

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/GuruPDF/gurupdf-mcp/blob/main/LICENSE)

Безкоштовний **[Model Context Protocol](https://modelcontextprotocol.io) (MCP) server**, який дає змогу Claude, Cursor, VS Code, Windsurf та іншим AI-агентам **конвертувати, стискати, об’єднувати, розділяти й редагувати PDF — а також конвертувати між 100+ форматами файлів** (Word, Excel, PowerPoint, JPG, PNG, HEIC, електронні книги та інші) прямо на вашій машині. Працює на базі [GuruPDF](https://gurupdf.com).

**Languages:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [中文](README.zh.md) · [Русский](README.ru.md) · **Українська** · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Türkçe](README.tr.md) · [Čeština](README.cs.md) · [Ελληνικά](README.el.md) · [العربية](README.ar.md)

> Попросіть свого помічника: *"стисни цей PDF"*, *"перетвори invoice.docx у PDF"* або *"об’єднай ці три файли"* — і він конвертує файли прямо на вашій машині.

- 🗂️ **126 tools** — PDF ⇄ Word/Excel/PowerPoint, зображення, електронні книги, OCR, стискання, об’єднання, розділення, поворот, захист, водяні знаки та інше.
- 💻 **Працює з вашими локальними файлами** — читає та записує файли на диску, без ручного завантаження й вивантаження.
- 🆓 **Безкоштовний старт** — кожен обліковий запис отримує щоденні кредити. Кредитна картка не потрібна.

## Встановлення

Вам потрібні **Node.js 18+** і безкоштовний **GuruPDF API key**:

1. Зареєструйтеся на **[gurupdf.com](https://gurupdf.com)**.
2. Відкрийте **[Profile → API tokens](https://gurupdf.com/profile)** і створіть токен.
3. Додайте server до свого агента з цим ключем (конфігурації нижче). Крок встановлення не потрібен — `npx` завантажить його під час першого запуску.

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

`~/.cursor/mcp.json` (або `.cursor/mcp.json` у проєкті):

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

## Інструменти

| Tool | What it does |
|------|--------------|
| `convert_file` | Конвертує/обробляє локальний файл (або URL). Передайте вхідні дані та цільовий формат (`pdf`, `png`, `docx`…) або slug інструмента (`compress-pdf`, `merge-pdf`…). Зберігає результат на диск. |
| `get_status` | Перевіряє завдання конвертації за id і завантажує результат, коли він готовий (для довгих завдань, як-от відео). |
| `list_conversions` | Показує список підтримуваних конвертацій/інструментів, за бажанням відфільтрований за вхідним форматом. |
| `check_credits` | Показує залишок кредитів і як отримати більше. |

### Приклади

> **"Стисни `~/Documents/report.pdf`."**
> → `convert_file(input: "~/Documents/report.pdf", to: "compress-pdf")`

> **"Конвертуй `invoice.docx` у PDF."**
> → `convert_file(input: "invoice.docx", to: "pdf")`

> **"Об’єднай `a.pdf` і `b.pdf` в один."**
> → `convert_file(input: ["a.pdf", "b.pdf"], to: "merge-pdf")`

> **"Захисти цей PDF паролем `hunter2`."**
> → `convert_file(input: "secret.pdf", to: "protect-pdf", options: { password: "hunter2" })`

> **"Збережи цю вебсторінку як PDF: https://example.com"**
> → `convert_file(input: "https://example.com", to: "url-to-pdf")`

## Безкоштовний тариф і кредити

Кожен інструмент коштує кілька кредитів. Безкоштовні облікові записи отримують **щоденні кредити** (оновлюються щодня) і **2 конвертації/хвилину, 10/день**. Коли вони закінчаться, помічник повідомить вам про це — ви можете дочекатися щоденного оновлення або [поповнити баланс / оновити тариф](https://gurupdf.com/pricing). Конвертації виконуються на серверах GuruPDF; файли автоматично видаляються протягом години.

## Конфігурація

| Env var | Default | Notes |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Обов’язково.** Ваш API token з [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | Перевизначайте лише для self-hosted / staging. |

## Посилання

- Website: [gurupdf.com](https://gurupdf.com)
- API docs: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Pricing: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## Ліцензія

MIT
