# GuruPDF MCP — حوّل ملفات PDF وأكثر من 100 تنسيق ملفات من وكيل الذكاء الاصطناعي الخاص بك

[![npm version](https://img.shields.io/npm/v/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![npm downloads](https://img.shields.io/npm/dm/gurupdf-mcp.svg)](https://www.npmjs.com/package/gurupdf-mcp)
[![license: MIT](https://img.shields.io/npm/l/gurupdf-mcp.svg)](./LICENSE)

خادم **[Model Context Protocol](https://modelcontextprotocol.io) (MCP)** مجاني يتيح لـ Claude وCursor وVS Code وWindsurf وغيرهم من وكلاء الذكاء الاصطناعي **تحويل ملفات PDF وضغطها ودمجها وتقسيمها وتحريرها — وكذلك التحويل بين أكثر من 100 تنسيق ملفات** (Word وExcel وPowerPoint وJPG وPNG وHEIC والكتب الإلكترونية وغير ذلك)، مباشرة على جهازك. يعمل بواسطة [GuruPDF](https://gurupdf.com).

**Languages:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [中文](README.zh.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Polski](README.pl.md) · [Nederlands](README.nl.md) · [Türkçe](README.tr.md) · [Čeština](README.cs.md) · [Ελληνικά](README.el.md) · **العربية**

> اطلب من مساعدك: *"اضغط هذا الـ PDF"*، أو *"حوّل invoice.docx إلى PDF"*، أو *"ادمج هذه الملفات الثلاثة"* — وسيحوّل الملفات مباشرة على جهازك.

- 🗂️ **126 أداة** — PDF ⇄ Word/Excel/PowerPoint، الصور، الكتب الإلكترونية، OCR، الضغط، الدمج، التقسيم، التدوير، الحماية، العلامات المائية، والمزيد.
- 💻 **يعمل على ملفاتك المحلية** — يقرأ الملفات ويكتبها على القرص، من دون رفع/تنزيل يدوي.
- 🆓 **مجاني للبدء** — يحصل كل حساب على أرصدة يومية. لا حاجة إلى بطاقة ائتمان.

## التثبيت

تحتاج إلى **Node.js 18+** ومفتاح **GuruPDF API** مجاني:

1. سجّل في **[gurupdf.com](https://gurupdf.com)**.
2. افتح **[Profile → API tokens](https://gurupdf.com/profile)** وأنشئ رمزًا مميزًا.
3. أضف الخادم إلى وكيلك باستخدام هذا المفتاح (الإعدادات أدناه). لا توجد خطوة تثبيت — يقوم `npx` بجلبه عند أول تشغيل.

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

`~/.cursor/mcp.json` (أو `.cursor/mcp.json` داخل مشروع):

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

## الأدوات

| Tool | ما الذي تفعله |
|------|--------------|
| `convert_file` | يحوّل/يعالج ملفًا محليًا (أو URL). أعطه مُدخلًا وتنسيقًا هدفًا (`pdf` أو `png` أو `docx`…) أو اسم أداة (`compress-pdf` أو `merge-pdf`…). ويحفظ النتيجة على القرص. |
| `get_status` | يتحقق من مهمة تحويل باستخدام المعرّف ويُنزّل النتيجة عندما تصبح جاهزة (للمهام الطويلة مثل الفيديو). |
| `list_conversions` | يسرد التحويلات/الأدوات المدعومة، مع إمكانية التصفية حسب تنسيق الإدخال. |
| `check_credits` | يعرض الأرصدة المتبقية وكيفية الحصول على المزيد. |

### أمثلة

> **"اضغط `~/Documents/report.pdf`."**
> → `convert_file(input: "~/Documents/report.pdf", to: "compress-pdf")`

> **"حوّل `invoice.docx` إلى PDF."**
> → `convert_file(input: "invoice.docx", to: "pdf")`

> **"ادمج `a.pdf` و`b.pdf` في ملف واحد."**
> → `convert_file(input: ["a.pdf", "b.pdf"], to: "merge-pdf")`

> **"احمِ ملف PDF هذا بكلمة المرور `hunter2`."**
> → `convert_file(input: "secret.pdf", to: "protect-pdf", options: { password: "hunter2" })`

> **"احفظ صفحة الويب هذه كملف PDF: https://example.com"**
> → `convert_file(input: "https://example.com", to: "url-to-pdf")`

## الفئة المجانية والأرصدة

تكلّف كل أداة عددًا قليلًا من الأرصدة. تحصل الحسابات المجانية على **أرصدة يومية** (تتجدد كل يوم) و**تحويلين/دقيقة، و10/يوم**. عندما تنفد الأرصدة، سيخبرك المساعد بذلك — يمكنك انتظار التجديد اليومي أو [إعادة الشحن / الترقية](https://gurupdf.com/pricing). تعمل عمليات التحويل على خوادم GuruPDF؛ وتُحذف الملفات تلقائيًا خلال ساعة.

## الإعداد

| Env var | Default | Notes |
|---------|---------|-------|
| `GURUPDF_API_KEY` | — | **مطلوب.** رمز API الخاص بك من [Profile → API tokens](https://gurupdf.com/profile). |
| `GURUPDF_API_URL` | `https://gurupdf.com/api/v1` | غيّره فقط في حالات self-hosted / staging. |

## الروابط

- الموقع الإلكتروني: [gurupdf.com](https://gurupdf.com)
- توثيق API: [gurupdf.com/api/docs](https://gurupdf.com/api/docs)
- الأسعار: [gurupdf.com/pricing](https://gurupdf.com/pricing)

## الترخيص

MIT
