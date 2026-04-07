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
  # - title: Crafting & Items
  #   url: /wiki/crafting/

# ── Edit history — add a new entry each time the page changes ──
history:
  - version: "Survival Release"
    date: "2026-01-01"
    changes: "NPC Name added to Spawn."
  # - version: "v1.1"
  #   date: "2026-MM-DD"
  #   changes: "Description of what changed."

# ═══════════════════════════════════════════════════════════════
#  INFOBOX
#  Floats to the right of the article body.
# ═══════════════════════════════════════════════════════════════
Infobox:
  Enabled: true
  title: "NPC Name"                            # ← usually same as page title

  # Body render image. Path pattern: /img/icons/npc/Body/Name.png
  # File naming: PascalCase with underscores — "Fish_Merchant.png", "Agent_LemLem.png"
  # If no body image exists yet, delete this line entirely.
  image: "/img/icons/npc/Body/NPC_Name.png"   # ←

  # Uncomment if the image is a tiny icon rather than a full body render:
  # image_size: "icon"

  Sections:

    # ── Key/value rows ─────────────────────────────────────────
    # Standard rows for NPC pages. Add, remove, or reorder freely.
    - heading: "Details"
      rows:
        - label: "Location"
          value: "Spawn"

        - label: "Type"
          value: "Merchant"      # ← Merchant / Service / Special Merchant / Guard / Quest Giver

        # Merchants that accept in-game currency:
        - label: "Currency"
          value: "Coins"         # ← Coins / XP / Coins & XP / Tokens / etc.

        # If the NPC has a command shortcut:
        # - label: "Command"
        #   value: "/command"

        # Rarity colouring on any value field — add  rarity: "X"  to colour the text.
        # Options: common · uncommon · rare · epic · legendary · mythic · divine · special
        # Example:
        # - label: "Status"
        #   value: "Active"
        #   rarity: "uncommon"

    # ── Related NPCs link list ──────────────────────────────────
    # Shows other NPCs with their head icons. All icons must be the
    # same size; set icon_size at the section level.
    # Head image path: /img/icons/npc/Heads/Name.png
    # (same naming rules as Body — PascalCase_Underscores)
    #
    # - heading: "Related NPCs"
    #   icon_size: 24
    #   links:
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

### Sub-section if needed

*(Use H3 for sub-categories within a section — e.g. "Weapons" and "Armour" under Shop.)*

## Notes

*(Tips, requirements, unlock conditions, lore, restock timers — anything that doesn't fit above.)*

---

<!-- ═══════════════════════════════════════════════════════════
     QUICK REFERENCE — CALLOUT BOXES
     Copy the block you need into the page body above.

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
