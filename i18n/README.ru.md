# GuruPDF MCP — конвертируйте PDF и 100+ форматов файлов из вашего AI-агента

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/GuruPDF/gurupdf-mcp/blob/main/LICENSE)

Бесплатный **[Model Context Protocol](https://modelcontextprotocol.io) (MCP) сервер**, который позволяет Claude, Cursor, VS Code, Windsurf и другим AI-агентам **конвертировать, сжимать, объединять, разделять и редактировать PDF — а также конвертировать между 100+ форматами файлов** (Word, Excel, PowerPoint, JPG, PNG, HEIC, электронные книги и другие) прямо на вашем компьютере. Работает на базе [GuruPDF](https://gurupdf.com).

**Languages:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [中文](README.zh.md) · **Русский** · [Українська](README.uk.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Türkçe](README.tr.md) · [Čeština](README.cs.md) · [Ελληνικά](README.el.md) · [العربية](README.ar.md)

> Попросите вашего ассистента: *"сожми этот PDF"*, *"преврати invoice.docx в PDF"* или *"объедини эти три файла"* — и он конвертирует файлы прямо на вашем компьютере.

- 🗂️ **126 инструментов** — PDF ⇄ Word/Excel/PowerPoint, изображения, электронные книги, OCR, сжатие, объединение, разделение, поворот, защита, водяные знаки и многое другое.
- 💻 **Работает с вашими локальными файлами** — читает и записывает файлы на диск, без ручной загрузки и скачивания.
- 🆓 **Бесплатно для старта** — каждый аккаунт получает ежедневные кредиты. Кредитная карта не требуется.

## Установка

Вам нужны **Node.js 18+** и бесплатный **GuruPDF API key**:

1. Зарегистрируйтесь на **[gurupdf.com](https://gurupdf.com)**.
2. Откройте **[Profile → API tokens](https://gurupdf.com/profile)** и создайте токен.
3. Добавьте сервер в вашего агента с этим ключом (конфигурации ниже). Шаг установки не требуется — `npx` загрузит всё при первом запуске.

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

`~/.cursor/mcp.json` (или `.cursor/mcp.json` в проекте):

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

## Инструменты

| Tool | What it does |
|------|--------------|
| `convert_file` | Конвертирует/обрабатывает локальный файл (или URL). Передайте входной файл и целевой формат (`pdf`, `png`, `docx`…) или slug инструмента (`compress-pdf`, `merge-pdf`…). Сохраняет результат на диск. |
| `get_status` | Проверяет задачу конвертации по id и загружает результат, когда он будет готов (для долгих задач, например видео). |
| `list_conversions` | Показывает список поддерживаемых конвертаций/инструментов, при необходимости с фильтрацией по входному формату. |
| `check_credits` | Показывает оставшиеся кредиты и как получить больше. |

### Примеры

> **"Сожми `~/Documents/report.pdf`."**
> → `convert_file(input: "~/Documents/report.pdf", to: "compress-pdf")`

> **"Конвертируй `invoice.docx` в PDF."**
> → `convert_file(input: "invoice.docx", to: "pdf")`

> **"Объедини `a.pdf` и `b.pdf` в один файл."**
> → `convert_file(input: ["a.pdf", "b.pdf"], to: "merge-pdf")`

> **"Защити этот PDF паролем `hunter2`."**
> → `convert_file(input: "secret.pdf", to: "protect-pdf", options: { password: "hunter2" })`

> **"Сохрани эту веб-страницу как PDF: https://example.com"**
> → `convert_file(input: "https://example.com", to: "url-to-pdf")`

## Бесплатный тариф и кредиты

Каждый инструмент стоит несколько кредитов. Бесплатные аккаунты получают **ежедневные кредиты** (обновляются каждый день), а также **2 конвертации в минуту и 10 в день**. Когда они закончатся, ассистент сообщит вам об этом — вы можете подождать ежедневного обновления или [пополнить баланс / перейти на платный тариф](https://gurupdf.com/pricing). Конвертации выполняются на серверах GuruPDF; файлы автоматически удаляются в течение часа.

## Конфигурация

| Env var | Default | Notes |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Обязательно.** Ваш API token из [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | Переопределяйте только для self-hosted / staging. |

## Ссылки

- Сайт: [gurupdf.com](https://gurupdf.com)
- Документация API: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Тарифы: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## Лицензия

MIT
