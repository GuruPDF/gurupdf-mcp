# GuruPDF MCP — μετατρέψτε PDF και 100+ μορφές αρχείων από τον AI agent σας

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/GuruPDF/gurupdf-mcp/blob/main/LICENSE)

Ένας δωρεάν **[Model Context Protocol](https://modelcontextprotocol.io) (MCP) server** που επιτρέπει στα Claude, Cursor, VS Code, Windsurf και άλλους AI agents να **μετατρέπουν, συμπιέζουν, συγχωνεύουν, διαχωρίζουν και επεξεργάζονται PDF — και να μετατρέπουν μεταξύ 100+ μορφών αρχείων** (Word, Excel, PowerPoint, JPG, PNG, HEIC, ebooks και άλλα), απευθείας στο δικό σας μηχάνημα. Με την υποστήριξη του [GuruPDF](https://gurupdf.com).

**Languages:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [中文](README.zh.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Türkçe](README.tr.md) · [Čeština](README.cs.md) · **Ελληνικά** · [العربية](README.ar.md)

> Ζητήστε από τον βοηθό σας: *"συμπίεσε αυτό το PDF"*, *"μετέτρεψε το invoice.docx σε PDF"*, ή *"συγχώνευσε αυτά τα τρία αρχεία"* — και μετατρέπει τα αρχεία απευθείας στο μηχάνημά σας.

- 🗂️ **126 εργαλεία** — PDF ⇄ Word/Excel/PowerPoint, εικόνες, ebooks, OCR, συμπίεση, συγχώνευση, διαχωρισμός, περιστροφή, προστασία, υδατογράφημα και άλλα.
- 💻 **Λειτουργεί στα τοπικά σας αρχεία** — διαβάζει και γράφει αρχεία στον δίσκο, χωρίς χειροκίνητο ανέβασμα/κατέβασμα.
- 🆓 **Δωρεάν για να ξεκινήσετε** — κάθε λογαριασμός λαμβάνει ημερήσιες πιστώσεις. Δεν απαιτείται πιστωτική κάρτα.

## Εγκατάσταση

Χρειάζεστε **Node.js 18+** και ένα δωρεάν **GuruPDF API key**:

1. Εγγραφείτε στο **[gurupdf.com](https://gurupdf.com)**.
2. Ανοίξτε το **[Profile → API tokens](https://gurupdf.com/profile)** και δημιουργήστε ένα token.
3. Προσθέστε τον server στον agent σας με αυτό το κλειδί (ρυθμίσεις παρακάτω). Δεν υπάρχει βήμα εγκατάστασης — το `npx` θα το κατεβάσει στην πρώτη εκτέλεση.

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

`~/.cursor/mcp.json` (ή `.cursor/mcp.json` σε ένα project):

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

## Εργαλεία

| Tool | Τι κάνει |
|------|--------------|
| `convert_file` | Μετατρέπει/επεξεργάζεται ένα τοπικό αρχείο (ή URL). Δώστε του μια είσοδο και μια μορφή προορισμού (`pdf`, `png`, `docx`…) ή ένα slug εργαλείου (`compress-pdf`, `merge-pdf`…). Αποθηκεύει το αποτέλεσμα στον δίσκο. |
| `get_status` | Ελέγχει μια εργασία μετατροπής βάσει id και κατεβάζει το αποτέλεσμα όταν είναι έτοιμο (για μεγάλες εργασίες όπως video). |
| `list_conversions` | Παραθέτει τις υποστηριζόμενες μετατροπές/εργαλεία, προαιρετικά φιλτραρισμένες ανά μορφή εισόδου. |
| `check_credits` | Εμφανίζει τις εναπομένουσες πιστώσεις και πώς να αποκτήσετε περισσότερες. |

### Παραδείγματα

> **"Συμπίεσε το `~/Documents/report.pdf`."**
> → `convert_file(input: "~/Documents/report.pdf", to: "compress-pdf")`

> **"Μετέτρεψε το `invoice.docx` σε PDF."**
> → `convert_file(input: "invoice.docx", to: "pdf")`

> **"Συγχώνευσε τα `a.pdf` και `b.pdf` σε ένα."**
> → `convert_file(input: ["a.pdf", "b.pdf"], to: "merge-pdf")`

> **"Προστάτευσε αυτό το PDF με κωδικό `hunter2`."**
> → `convert_file(input: "secret.pdf", to: "protect-pdf", options: { password: "hunter2" })`

> **"Αποθήκευσε αυτή την ιστοσελίδα ως PDF: https://example.com"**
> → `convert_file(input: "https://example.com", to: "url-to-pdf")`

## Δωρεάν πακέτο & πιστώσεις

Κάθε εργαλείο κοστίζει λίγες πιστώσεις. Οι δωρεάν λογαριασμοί λαμβάνουν **ημερήσιες πιστώσεις** (ανανεώνονται κάθε μέρα) και **2 μετατροπές/λεπτό, 10/ημέρα**. Όταν τις εξαντλήσετε, ο βοηθός θα σας ενημερώσει — μπορείτε να περιμένετε την ημερήσια ανανέωση ή να κάνετε [top up / upgrade](https://gurupdf.com/pricing). Οι μετατροπές εκτελούνται στους servers του GuruPDF· τα αρχεία διαγράφονται αυτόματα μέσα σε μία ώρα.

## Ρυθμίσεις

| Env var | Προεπιλογή | Σημειώσεις |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Απαιτείται.** Το API token σας από το [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | Αλλάξτε το μόνο για self-hosted / staging. |

## Σύνδεσμοι

- Website: [gurupdf.com](https://gurupdf.com)
- API docs: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Pricing: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## Άδεια

MIT
