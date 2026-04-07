# ============================================================
#  WitchCraftMC Wiki — README & Setup Guide
# ============================================================

## 📁 Files in this package

```
_layouts/
  wiki.html          ← Wiki index page layout
  wiki-page.html     ← Individual wiki article layout (with sidebar)

wiki/
  index.md           ← /wiki/ landing page
  getting-started.md ← /wiki/getting-started/
  rules.md           ← /wiki/rules/
  claims.md          ← /wiki/claims/
  crafting.md        ← /wiki/crafting/
  worlds.md      ← /wiki/worlds/
  staff-ranks.md     ← /wiki/staff-ranks/
  commands.md        ← /wiki/commands/
```

---

## ✅ Step 1 — Add files to your repo

Copy everything from this package into the **root of your existing Jekyll repo**.
The `_layouts/` folder will merge with your existing one.

---

## ✅ Step 2 — Update your `_config.yml`

Add the following block anywhere in your `_config.yml`:

```yaml
# ── Wiki settings ──────────────────────────────────────────
wiki:
  title: "WitchCraftMC Wiki"
  description: "The complete knowledge base for WitchCraftMC players."

defaults:
  - scope:
      path: "wiki"
      type: "pages"
    values:
      layout: "wiki-page"
```

> **Note:** If you already have a `defaults:` block in your _config.yml,
> add the new scope entry inside the existing array — don't create a second
> `defaults:` key.

---

## ✅ Step 3 — Add the Wiki link to your navbar

In your `_includes/nav.html` (or wherever your navbar lives), add:

```html
<li class="nav-item">
  <a class="nav-link" href="/wiki/">Wiki</a>
</li>
```

If your theme uses `_data/navigation.yml`, add:

```yaml
- title: Wiki
  url: /wiki/
```

---

## ✅ Step 4 — Check your Bootstrap & JS paths

The wiki layouts reference:

```
/css/bootstrap.min.css
/css/style.min.css
/js/bootstrap.bundle.min.js
```

If your repo uses different paths (e.g., `/assets/css/...`), do a find-and-replace in both layout files.

---

## ✅ Step 5 — Customize content

Fill in the placeholder sections in each page:

| File | What to fill in |
|---|---|
| `crafting.md` | Your actual custom recipes / server IP |
| `worlds.md` | Your server's landmarks, lore, map size |
| `staff-ranks.md` | Real rank names, perks, and staff names |
| `commands.md` | Verify each command works on your setup |
| `getting-started.md` | Replace `play.witchcraftmc.gg` with your real IP |
| `worlds.md` | Add your actual world border size |

---

## ➕ Adding new wiki pages

1. Create a new `.md` file in the `wiki/` folder.
2. Add this front matter at the top:

```yaml
---
layout: wiki-page
title: Your Page Title
description: "A short description shown under the title."
permalink: /wiki/your-page-slug/
toc: true
prev_page:
  title: Previous Page Name
  url: /wiki/previous-page/
next_page:
  title: Next Page Name
  url: /wiki/next-page/
---
```

3. Add a card for it in `_layouts/wiki.html` inside the `category-grid` div.

---

## 🎨 Customizing the theme

All colours are CSS custom properties at the top of each layout:

```css
:root {
  --ink:        #0d0b14;   /* page background */
  --parchment:  #f5edd8;   /* headings */
  --gold:       #c9a227;   /* accent / links */
  --violet-mid: #5c2d91;   /* secondary accent */
  --mist:       #1c1530;   /* card / sidebar bg */
}
```

Change these to match your server's brand colours.

---
