# GuruPDF MCP — AI ajanınızdan PDF'leri ve 100+ dosya formatını dönüştürün

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/GuruPDF/gurupdf-mcp/blob/main/LICENSE)

Claude, Cursor, VS Code, Windsurf ve diğer AI ajanlarının **PDF'leri dönüştürmesini, sıkıştırmasını, birleştirmesini, bölmesini ve düzenlemesini — ayrıca 100+ dosya formatı arasında dönüştürme yapmasını** (Word, Excel, PowerPoint, JPG, PNG, HEIC, e-kitaplar ve daha fazlası) doğrudan kendi makinenizde sağlayan ücretsiz bir **[Model Context Protocol](https://modelcontextprotocol.io) (MCP) sunucusu**. Altyapısı [GuruPDF](https://gurupdf.com) tarafından sağlanır.

**Languages:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [中文](README.zh.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · **Türkçe** · [Čeština](README.cs.md) · [Ελληνικά](README.el.md) · [العربية](README.ar.md)

> Asistanınıza şunu sorun: *"bu PDF'yi sıkıştır"*, *"invoice.docx dosyasını PDF'ye çevir"*, veya *"bu üç dosyayı birleştir"* — ve dosyaları doğrudan kendi makinenizde dönüştürsün.

- 🗂️ **126 araç** — PDF ⇄ Word/Excel/PowerPoint, görseller, e-kitaplar, OCR, sıkıştırma, birleştirme, bölme, döndürme, koruma, filigran ve daha fazlası.
- 💻 **Yerel dosyalarınızda çalışır** — diskteki dosyaları okur ve yazar, manuel yükleme/indirme gerekmez.
- 🆓 **Başlamak ücretsiz** — her hesap günlük krediler alır. Kredi kartı gerekmez.

## Kurulum

**Node.js 18+** ve ücretsiz bir **GuruPDF API anahtarı** gerekir:

1. **[gurupdf.com](https://gurupdf.com)** üzerinden kaydolun.
2. **[Profile → API tokens](https://gurupdf.com/profile)** bölümünü açın ve bir token oluşturun.
3. Sunucuyu bu anahtarla ajanınıza ekleyin (aşağıdaki yapılandırmalar). Kurulum adımı yok — `npx` ilk çalıştırmada paketi getirir.

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

`~/.cursor/mcp.json` (veya bir projede `.cursor/mcp.json`):

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

## Araçlar

| Tool | Ne yapar |
|------|--------------|
| `convert_file` | Yerel bir dosyayı (veya URL'yi) dönüştürür/işler. Bir girdi ve hedef format (`pdf`, `png`, `docx`…) veya bir araç slug'ı (`compress-pdf`, `merge-pdf`…) verin. Sonucu diske kaydeder. |
| `get_status` | Bir dönüştürme işini kimliğine göre kontrol eder ve hazır olduğunda sonucu indirir (video gibi uzun süren işler için). |
| `list_conversions` | Desteklenen dönüştürmeleri/araçları listeler; isteğe bağlı olarak bir giriş formatına göre filtrelenebilir. |
| `check_credits` | Kalan kredileri ve daha fazlasını nasıl alacağınızı gösterir. |

### Örnekler

> **"`~/Documents/report.pdf` dosyasını sıkıştır."**
> → `convert_file(input: "~/Documents/report.pdf", to: "compress-pdf")`

> **"`invoice.docx` dosyasını PDF'ye dönüştür."**
> → `convert_file(input: "invoice.docx", to: "pdf")`

> **"`a.pdf` ve `b.pdf` dosyalarını tek bir dosyada birleştir."**
> → `convert_file(input: ["a.pdf", "b.pdf"], to: "merge-pdf")`

> **"Bu PDF'yi `hunter2` ile parola korumalı yap."**
> → `convert_file(input: "secret.pdf", to: "protect-pdf", options: { password: "hunter2" })`

> **"Şu web sayfasını PDF olarak kaydet: https://example.com"**
> → `convert_file(input: "https://example.com", to: "url-to-pdf")`

## Ücretsiz katman ve krediler

Her araç birkaç krediye mal olur. Ücretsiz hesaplar **günlük krediler** alır (her gün yenilenir) ve **dakikada 2 dönüştürme, günde 10 dönüştürme** hakkına sahiptir. Krediniz bittiğinde asistan size bunu söyler — günlük yenilenmeyi bekleyebilir veya [bakiye yükleyebilir / yükseltebilirsiniz](https://gurupdf.com/pricing). Dönüştürmeler GuruPDF sunucularında çalışır; dosyalar bir saat içinde otomatik olarak silinir.

## Yapılandırma

| Env var | Varsayılan | Notlar |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **Gerekli.** [Profile → API tokens](https://gurupdf.com/profile) bölümündeki API token'ınız. |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | Yalnızca self-hosted / staging için geçersiz kılın. |

## Bağlantılar

- Web sitesi: [gurupdf.com](https://gurupdf.com)
- API dokümantasyonu: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- Fiyatlandırma: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## Lisans

MIT
