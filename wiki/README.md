# WitchCraftMC Wiki — Editor Guide

This document covers everything you need for day-to-day wiki editing: adding pages, adding NPCs, naming files, and using every available feature.

---

## File structure

```
wiki/
  index.md              ← /wiki/ landing page
  changelog.md
  <page>.md
  ...
  npc/
    _template.md        ← COPY THIS when making a new NPC page (not rendered by Jekyll)
    <npc>.md
    ...

_layouts/
  wiki-page.html        ← layout for all wiki pages; sidebar + infobox are defined here

img/icons/npc/
  Heads/                ← 24×24 head icons used in spawn.md infobox and NPC link lists
  Body/                 ← full body renders used as the main image on NPC pages
```

---

## Adding a new NPC page

**1. Add the images**

| Image | Folder | Naming rule |
|-------|--------|-------------|
| Head icon (24×24 px) | `img/icons/npc/Heads/` | `NPC_Name.png` |
| Body render | `img/icons/npc/Body/` | `NPC_Name.png` |

Naming rule: **PascalCase with underscores for spaces.**
Examples: `Fish_Merchant.png`, `Agent_LemLem.png`, `Rex_T.png`

All head icons in the same infobox section must be the **same pixel dimensions** — 24×24 is the standard. Resize the PNG itself if needed; do not use `icon_size` overrides on individual items.

**2. Create the wiki page**

Copy `wiki/npc/_template.md` and rename it `npc-name.md` (lowercase, hyphens).

```
wiki/npc/fish-merchant.md   ← file name (lowercase-hyphens)
permalink: /wiki/npc/Fish Merchant   ← exact display name, spaces are fine
```

Fill in every field in the template. The comments explain each one.

**3. Register the NPC in spawn.md**

Open `wiki/spawn.md` and add an entry to the infobox NPCs list:

```yaml
- text: "NPC Name"
  link: "/wiki/npc/NPC Name"
  icon: "/img/icons/npc/Heads/NPC_Name.png"
```

**4. Add the NPC to the index and sidebar**

- Add a row to the table in `wiki/npc/index.md`
- Add a `<li>` entry to the NPCs section in `_layouts/wiki-page.html` (search for `All NPCs` to find the right place)

---

## Adding a general wiki page

1. Create `wiki/your-page.md`
2. Use this front matter:

```yaml
---
layout: wiki-page
title: "Page Title"
description: "One-line description shown under the title."
permalink: /wiki/your-page/
toc: true
categories: [Category]
see_also:
  - title: Related Page
    url: /wiki/related-page/
history:
  - version: "v1.0"
    date: "2026-01-01"
    changes: "Page created."
---
```

3. Add it to the sidebar in `_layouts/wiki-page.html` under the Navigation section.

---

## Infobox reference

The infobox is defined in front matter, not in the page body. It supports three element types:

**Main image**
```yaml
Infobox:
  title: "Page Title"
  image: "/img/icons/npc/Body/NPC_Name.png"
  # image_size: "icon"   ← add this for small pixel icons instead of full renders
```

**Key/value rows**
```yaml
- heading: "Details"
  rows:
    - label: "Location"
      value: "Spawn"
    - label: "Rarity"
      value: "Rare"
      rarity: "rare"   # colours the value text
```

Available rarity colours: `common` · `uncommon` · `rare` · `epic` · `legendary` · `mythic` · `divine` · `special`

**NPC link list with head icons**
```yaml
- heading: "Related NPCs"
  icon_size: 24
  links:
    - text: "Enchanter"
      link: "/wiki/npc/Enchanter"
      icon: "/img/icons/npc/Heads/Enchanter.png"
```

All icons in a section render at `icon_size` px. Do not set `icon_size` on individual items — resize the PNG file itself if one icon looks wrong.

---

## Callout boxes

Paste any of these blocks into a page body:

```html
<div class="wiki-callout tip">
  <span class="callout-icon"><i class="fas fa-lightbulb"></i></span>
  <div>Tip text here.</div>
</div>

<div class="wiki-callout info">
  <span class="callout-icon"><i class="fas fa-circle-info"></i></span>
  <div>Info text here.</div>
</div>

<div class="wiki-callout warning">
  <span class="callout-icon"><i class="fas fa-triangle-exclamation"></i></span>
  <div>Warning text here.</div>
</div>

<div class="wiki-callout danger">
  <span class="callout-icon"><i class="fas fa-skull"></i></span>
  <div>Danger text here.</div>
</div>
```

---

## Tables

Standard markdown tables are styled automatically:

```markdown
| Column A | Column B |
|----------|----------|
| Row 1    | Value    |
```

Put commands in backticks in the first column for automatic teal monospace styling:

```markdown
| Command | Description |
|---------|-------------|
| `/spawn` | Teleport to Spawn |
```

---

## History & See Also

Both are defined in front matter, not the page body.

**History** renders as a collapsible table at the bottom of the page:
```yaml
history:
  - version: "Survival Release"
    date: "2026-01-01"
    changes: "Page created."
  - version: "v1.1"
    date: "2026-03-15"
    changes: "Added shop section."
```

**See Also** renders as a link box below the article:
```yaml
see_also:
  - title: Spawn
    url: /wiki/spawn/
  - title: Crafting & Items
    url: /wiki/crafting/
```

---

## Agent LemLem page

`wiki/npc/agent-lemlem.md` is a live feature showcase — it demonstrates every infobox feature, callout style, table type, and formatting option on a real rendered page. If you want to see what something looks like before using it, check there first.

---

## Layouts

```
_layouts/wiki-page.html     ← used by all wiki pages (sidebar + article + infobox)
_layouts/wiki.html          ← used only by wiki/index.md (the landing page grid)
css/wiki-base.css           ← CSS variables, fonts, global wiki styles
css/wiki-article.css        ← article layout, infobox, callouts, tables, sidebar
```

To change colours, edit the CSS custom properties in `css/wiki-base.css`.
