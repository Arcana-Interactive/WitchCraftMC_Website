---
# ═══════════════════════════════════════════════════════════════
#  NPC PAGE TEMPLATE
#  Copy this file, rename it (lowercase-with-hyphens.md),
#  fill in every field marked with  ← , delete comments you
#  don't need, and you're done.
#
#  File naming rule:  wiki/npc/npc-name.md
#  URL naming rule:   permalink uses the NPC's exact display name
#                     with spaces kept as-is (Jekyll handles them).
#                     e.g.  /wiki/npc/Fish Merchant
# ═══════════════════════════════════════════════════════════════

layout: wiki-page
title: "NPC Name"                              # ← exact display name
description: "One-line summary of what they do."  # ← shown under the page title

permalink: /wiki/npc/NPC Name                  # ← match title exactly, spaces are fine

categories: [NPCs, Spawn]                      # keep both; used for the sidebar category list

toc: true                                      # shows "On This Page" sidebar if page has
                                               # more than 2 headings. Safe to leave on always.

# ── Related pages shown in the "See Also" box at the bottom ──
see_also:
  - title: Spawn
    url: /wiki/spawn/
  # - title: Another NPC
  #   url: /wiki/npc/Another NPC

# ── Edit history — add a new entry each time the page changes ──
history:
  - version: "Survival Release"
    date: "Jan 1, 2026"
    changes: "NPC Name added to Spawn."

# ═══════════════════════════════════════════════════════════════
#  INFOBOX
#  Floats to the right of the article body.
#  All sections use "rows:" with three row types:
#
#  1. Label + Value (key-value pair):
#       - label: "Type"
#         value: "Merchant"
#         rarity: "uncommon"     # optional — colours the value
#         link: "/wiki/page"     # optional — makes the row clickable
#         icon: "/img/icon.png"  # optional — icon next to value
#
#  2. Text link (icon + name, like NPC lists):
#       - text: "Auctioneer"
#         link: "/wiki/npc/auctioneer"
#         icon: "/img/icons/npc/Heads/auctioneer.png"
#
#  3. Inline image (appears mid-infobox, not just at top):
#       - image: "/img/icons/npc/Body/npc_name.png"
#         image_size: "icon"     # optional — "icon" for pixelated 48px
#
#  Section-level "icon_size: 24" sets the px size for all icons
#  in that section (text rows and linked label+value rows).
# ═══════════════════════════════════════════════════════════════
Infobox:
  Enabled: true
  title: "NPC Name"                            # ← usually same as page title

  # Body render image. Path pattern: /img/icons/npc/Body/Name.png
  image: "/img/icons/npc/Body/NPC_Name.png"   # ←

  Sections:

    # ── Key/value rows ─────────────────────────────────────────
    - heading: "Details"
      rows:
        - label: "Location"
          value: "Spawn"
        - label: "Type"
          value: "Merchant"

    # ── Location with linked icon row ──────────────────────────
    - heading: "Location"
      icon_size: 24                            # ← sets icon size for all rows in this section
      rows:
        - label: "<strong>Area"
          value: "The Town"
          link: "/wiki/spawn"
          icon: "/img/icons/npc/Heads/npc_name.png"
        - label: "<strong>Coordinates"
          value: "<code>x:0 y:70 z:0</code>"

    # ── Mid-infobox image example ──────────────────────────────
    # You can insert an image at any position in any section:
    #
    # - heading: "Gallery"
    #   rows:
    #     - label: "Status"
    #       value: "Active"
    #     - image: "/img/resources/npc_shop.png"
    #     - label: "Items Sold"
    #       value: "12"

    # ── NPC link list ──────────────────────────────────────────
    # - heading: "Related NPCs"
    #   icon_size: 24
    #   rows:
    #     - text: "Enchanter"
    #       link: "/wiki/npc/Enchanter"
    #       icon: "/img/icons/npc/Heads/Enchanter.png"
    #     - text: "Archwizard"
    #       link: "/wiki/npc/Archwizard"
    #       icon: "/img/icons/npc/Heads/Archwizard.png"
---

## Overview

*(Who is this NPC, where exactly are they at Spawn, and what do they do in one short paragraph?)*

## Shop / Services

*(What can players buy, sell, or do here? List items, commands, costs.)*

<!-- ═══════════════════════════════════════════════════════════
     SHOP GUI — render a Minecraft-style chest interface
     Define your shop in _data/shops.yml first, then include:

     {% include shop-gui.html id="my_shop" %}

     For custom UI textures, add to shops.yml:
       my_shop:
         title: "My Custom Shop"
         rows: 3
         texture: "/img/ui/my_custom_gui.png"
         title_color: "#4a412a"
         slots:
           - slot: 10
             item: iron_ingot
             price: "25 Coins"

     ═══════════════════════════════════════════════════════════ -->

## Notes

*(Tips, requirements, unlock conditions, lore, restock timers — anything that doesn't fit above.)*

---

<!-- ═══════════════════════════════════════════════════════════
     QUICK REFERENCE — CALLOUT BOXES

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

     ═══════════════════════════════════════════════════════════ -->

<!-- ═══════════════════════════════════════════════════════════
     TAG IMAGES — inline tag icons in article content

     Define tags in _data/tags.yml:
       novice: /img/icons/tags/novice.png

     Use in article body as HTML:
       <img src="/img/icons/tags/novice.png" alt="Novice" class="wiki-tag-icon"> Novice

     Use in item tooltips (items.yml):
       tags:
         - "{tag_novice} &7Novice Gear"

     ═══════════════════════════════════════════════════════════ -->
