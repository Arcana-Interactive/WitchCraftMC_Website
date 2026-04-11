---
layout: wiki-page
title: Preview
description: "A wiki feature showcase."
permalink: /wiki/preview/
toc: true
categories: [meta]
see_also:
  - title: Spawn
    url: /wiki/spawn/
  - title: Getting Started
    url: /wiki/getting-started/
  - title: Commands
    url: /wiki/commands/
history:
  - version: "Survival Release"
    date: "2026-01-01"
    changes: "Agent LemLem stationed at Spawn."
  - version: "v1.1"
    date: "2026-02-15"
    changes: "Added a second assignment for LemLem — details classified."

# ─────────────────────────────────────────────
# INFOBOX
# The infobox floats to the right of the article.
# It supports a main image, key-value rows, and link lists.
# ─────────────────────────────────────────────
Infobox:
  Enabled: true
  title: "Agent LemLem"
  image: "/img/icons/npc/Body/Agent_LemLem.png"
  Sections:

    # ── Key-value rows ──
    # Use rows to show quick facts. "rarity" colours the value:
    # common, uncommon, rare, epic, legendary, mythic, divine, special
    - heading: "Details"
      rows:
        - label: "Location"
          value: "Spawn"
        - label: "Type"
          value: "Special"
        - label: "Status"
          value: "Active"
          rarity: "uncommon"
        - label: "Clearance"
          value: "Classified"
          rarity: "rare"

    # ── Link list ──
    # Use links to list related NPCs or pages with their head icons.
    # Icons go in /img/icons/npc/Heads/  — all same size per section.
    - heading: "Related NPCs"
      icon_size: 24
      links:
        - text: "Archwizard"
          link: "/wiki/npc/Archwizard"
          icon: "/img/icons/npc/Heads/Archwizard.png"
        - text: "Enchanter"
          link: "/wiki/npc/Enchanter"
          icon: "/img/icons/npc/Heads/Enchanter.png"
---

## Overview

Agent LemLem is a figure of unclear allegiance who has taken up a post at Spawn. No one knows exactly who they work for, but they seem to know quite a lot about everyone who passes through.

*This page also serves as a reference for wiki authors — scroll down to see examples of every available feature.*

---

## Callout Boxes

Callout boxes are written in raw HTML inside the markdown. Four styles are available: `tip`, `info`, `warning`, and `danger`.

<div class="wiki-callout tip">
  <span class="callout-icon"><i class="fas fa-lightbulb"></i></span>
  <div><strong>Tip</strong> — Use this for helpful hints or shortcuts. Great for pointing players toward an easier way to do something.</div>
</div>

<div class="wiki-callout info">
  <span class="callout-icon"><i class="fas fa-circle-info"></i></span>
  <div><strong>Info</strong> — Use this for neutral context or background information that's useful but not urgent.</div>
</div>

<div class="wiki-callout warning">
  <span class="callout-icon"><i class="fas fa-triangle-exclamation"></i></span>
  <div><strong>Warning</strong> — Use this when something could go wrong. Loss of items, dangerous areas, irreversible actions.</div>
</div>

<div class="wiki-callout danger">
  <span class="callout-icon"><i class="fas fa-skull"></i></span>
  <div><strong>Danger</strong> — Reserved for serious risks: death, permanent bans, item destruction with no recovery.</div>
</div>

---

## Tables

Tables follow standard markdown syntax and are styled automatically.

| Column A | Column B | Column C |
|----------|----------|----------|
| Row 1    | Value    | Detail   |
| Row 2    | Value    | Detail   |
| Row 3    | Value    | Detail   |

For tables with a code-style first column (like commands), put the command in backticks and it will render in teal monospace automatically:

| Command | Description |
|---------|-------------|
| `/spawn` | Teleport to Spawn |
| `/ah` | Open the Auction House |
| `/kit starter` | Claim your starter kit |

---

## Inline Code & Commands

Wrap anything in single backticks for inline code: `/spawn`, `1.20.x`, `play.witchcraftmc.gg`.

For a larger block of commands or config, use a fenced code block:

```
/kit starter
/sethome base
/tpa PlayerName
```

---

## Text Formatting

Regular paragraph text sits on `var(--text)` and line-height `1.75` for readability.

**Bold** is used for emphasis on important terms or item names. *Italic* is used for lore, quotes, or soft emphasis. You can combine them: ***bold italic***.

### Sub-headings (H3)

H3s appear in gold and are used for sections within a larger H2 topic — like this one. They also appear in the **On This Page** sidebar automatically when there are more than two headings on the page.

#### Smaller headings

H4 and below render as plain bold text. Use sparingly.

---

## Links

Internal wiki links look like this: [Spawn](/wiki/spawn/), [Getting Started](/wiki/getting-started/).

External links automatically get a small ↗ arrow: [WitchCraftMC Discord](http://discord.gg/5gHJtxrMZS).

To suppress the arrow on an external link, add `class="no-arrow"` in HTML: <a href="https://example.com" class="no-arrow">example</a>.

---

## Infobox Reference

The infobox is defined in the page's **front matter** (the `---` block at the top of the file), not in the body. Key fields:

- `title` — displayed in the infobox header bar
- `image` — full path to the image; use body images for NPC pages (`/img/icons/npc/Body/Name.png`)
- `image_size: "icon"` — add this if the image is a small icon rather than a full portrait; renders it pixelated at a fixed small size
- **Sections** can be `rows` (label/value pairs) or `links` (NPC list with head icons)
- On `rows`, add `rarity: "uncommon"` (or rare, epic, etc.) to colour the value

See the front matter at the top of this file for a working example with both rows and links.

---

## History & See Also

The **History** table and **See Also** links at the bottom of this page are also defined in front matter — check the top of this file's `---` block. The history table collapses by default; the See Also box is always visible.
