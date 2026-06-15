# GuruPDF MCP — 通过你的 AI 代理转换 PDF 和 100+ 种文件格式

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![npm downloads](https://img.shields.io/npm/dm/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![license: MIT](https://img.shields.io/npm/l/gurupdf-mcp.svg)](./LICENSE)

一个免费的 **[Model Context Protocol](https://modelcontextprotocol.io) (MCP) 服务器**，让 Claude、Cursor、VS Code、Windsurf 和其他 AI 代理能够**转换、压缩、合并、拆分和编辑 PDF —— 以及在 100+ 种文件格式之间进行转换**（Word、Excel、PowerPoint、JPG、PNG、HEIC、电子书等），全部直接在你自己的机器上完成。由 [GuruPDF](https://gurupdf.com) 提供支持。

**Languages:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · **中文** · [Русский](README.ru.md) · [Українська](README.uk.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Türkçe](README.tr.md) · [Čeština](README.cs.md) · [Ελληνικά](README.el.md) · [العربية](README.ar.md)

> 告诉你的助手：*"压缩这个 PDF"*、*"把 invoice.docx 转成 PDF"*，或者 *"合并这三个文件"* —— 它会直接在你的机器上转换这些文件。

- 🗂️ **126 个工具** —— PDF ⇄ Word/Excel/PowerPoint、图片、电子书、OCR、压缩、合并、拆分、旋转、保护、水印等。
- 💻 **适用于你的本地文件** —— 直接读取和写入磁盘上的文件，无需手动上传/下载。
- 🆓 **可免费开始使用** —— 每个账户每天都会获得额度。无需信用卡。

## 安装

你需要 **Node.js 18+** 和一个免费的 **GuruPDF API key**：

1. 在 **[gurupdf.com](https://gurupdf.com)** 注册。
2. 打开 **[Profile → API tokens](https://gurupdf.com/profile)** 并创建一个 token。
3. 使用该 key 将服务器添加到你的代理中（配置见下方）。无需安装步骤——`npx` 会在首次运行时获取它。

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

`~/.cursor/mcp.json`（或项目中的 `.cursor/mcp.json`）：

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

`.vscode/mcp.json`：

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

`~/.codeium/windsurf/mcp_config.json`：

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

## 工具

| Tool | 功能说明 |
|------|--------------|
| `convert_file` | 转换/处理本地文件（或 URL）。为其提供输入和目标格式（`pdf`、`png`、`docx`…）或工具 slug（`compress-pdf`、`merge-pdf`…）。结果会保存到磁盘。 |
| `get_status` | 通过 id 检查转换任务状态，并在结果就绪时下载结果（适用于视频等耗时较长的任务）。 |
| `list_conversions` | 列出支持的转换/工具，可按输入格式进行筛选。 |
| `check_credits` | 显示剩余额度以及如何获取更多额度。 |

### 示例

> **“压缩 `~/Documents/report.pdf`。”**
> → `convert_file(input: "~/Documents/report.pdf", to: "compress-pdf")`

> **“将 `invoice.docx` 转换为 PDF。”**
> → `convert_file(input: "invoice.docx", to: "pdf")`

> **“将 `a.pdf` 和 `b.pdf` 合并成一个。”**
> → `convert_file(input: ["a.pdf", "b.pdf"], to: "merge-pdf")`

> **“用 `hunter2` 为这个 PDF 设置密码保护。”**
> → `convert_file(input: "secret.pdf", to: "protect-pdf", options: { password: "hunter2" })`

> **“将此网页保存为 PDF：https://example.com”**
> → `convert_file(input: "https://example.com", to: "url-to-pdf")`

## 免费层级与额度

每个工具都会消耗少量额度。免费账户可获得**每日额度**（每天刷新），并且限制为**每分钟 2 次转换，每天 10 次**。当你用完额度时，助手会告诉你——你可以等待次日刷新，或[充值 / 升级](https://gurupdf.com/pricing)。转换在 GuruPDF 的服务器上运行；文件会在一小时内自动删除。

## 配置

| Env var | Default | 说明 |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **必需。** 你的 API token，来自 [Profile → API tokens](https://gurupdf.com/profile)。 |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | 仅用于自托管 / staging 时覆盖。 |

## 链接

- 网站: [gurupdf.com](https://gurupdf.com)
- API 文档: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- 价格: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## 许可证

MIT
