# GuruPDF MCP — convertissez des PDF et plus de 100 formats de fichiers depuis votre agent IA

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/GuruPDF/gurupdf-mcp/blob/main/LICENSE)

Un **serveur [Model Context Protocol](https://modelcontextprotocol.io) (MCP) gratuit** qui permet à Claude, Cursor, VS Code, Windsurf et à d’autres agents IA de **convertir, compresser, fusionner, scinder et modifier des PDF — ainsi que de convertir entre plus de 100 formats de fichiers** (Word, Excel, PowerPoint, JPG, PNG, HEIC, ebooks, et plus encore), directement sur votre propre machine. Propulsé par [GuruPDF](https://gurupdf.com).

**Languages:** [English](../README.md) · [Español](README.es.md) · **Français** · [Deutsch](README.de.md) · [中文](README.zh.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Türkçe](README.tr.md) · [Čeština](README.cs.md) · [Ελληνικά](README.el.md) · [العربية](README.ar.md)

> Demandez à votre assistant : *"compress this PDF"*, *"turn invoice.docx into a PDF"*, ou *"merge these three files"* — et il convertira les fichiers directement sur votre machine.

- 🗂️ **126 outils** — PDF ⇄ Word/Excel/PowerPoint, images, ebooks, OCR, compression, fusion, scission, rotation, protection, filigrane, et plus encore.
- 💻 **Fonctionne sur vos fichiers locaux** — lit et écrit les fichiers sur le disque, sans téléversement/téléchargement manuel.
- 🆓 **Gratuit pour commencer** — chaque compte reçoit des crédits quotidiens. Aucune carte bancaire requise.

## Installation

Vous avez besoin de **Node.js 18+** et d’une **clé API GuruPDF** gratuite :

1. Inscrivez-vous sur **[gurupdf.com](https://gurupdf.com)**.
2. Ouvrez **[Profile → API tokens](https://gurupdf.com/profile)** et créez un token.
3. Ajoutez le serveur à votre agent avec cette clé (configurations ci-dessous). Aucune étape d’installation — `npx` le récupère au premier lancement.

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

`~/.cursor/mcp.json` (ou `.cursor/mcp.json` dans un projet) :

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

## Outils

| Tool | What it does |
|------|--------------|
| `convert_file` | Convertit/traite un fichier local (ou une URL). Fournissez une entrée et un format cible (`pdf`, `png`, `docx`…) ou un slug d’outil (`compress-pdf`, `merge-pdf`…). Enregistre le résultat sur le disque. |
| `get_status` | Vérifie un job de conversion par id et télécharge le résultat lorsqu’il est prêt (pour les tâches longues comme la vidéo). |
| `list_conversions` | Liste les conversions/outils pris en charge, éventuellement filtrés par un format d’entrée. |
| `check_credits` | Affiche les crédits restants et comment en obtenir davantage. |

### Exemples

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

## Offre gratuite et crédits

Chaque outil coûte quelques crédits. Les comptes gratuits reçoivent des **crédits quotidiens** (réinitialisés chaque jour) et **2 conversions/minute, 10/jour**. Lorsque vous n’en avez plus, l’assistant vous l’indiquera — vous pouvez attendre la réinitialisation quotidienne ou [recharger / passer à une offre supérieure](https://gurupdf.com/pricing). Les conversions s’exécutent sur les serveurs de GuruPDF ; les fichiers sont automatiquement supprimés dans l’heure.

## Configuration

| Env var | Default | Notes |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Obligatoire.** Votre token API depuis [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | À remplacer uniquement pour du self-hosted / staging. |

## Liens

- Site web : [gurupdf.com](https://gurupdf.com)
- Documentation API : [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Tarifs : [gurupdf.com/pricing](https://gurupdf.com/pricing)

## Licence

MIT
