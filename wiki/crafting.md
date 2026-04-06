---
layout: wiki-page
title: Crafting & Items
description: "Custom recipes, unique drops, and special items exclusive to WitchCraftMC."
permalink: /wiki/crafting/
toc: true
categories: [Gameplay, Economy]
prev_page:
  title: Land Claims
  url: /wiki/claims/
next_page:
  title: World & Lore
  url: /wiki/world-lore/
see_also:
  - title: Commands & Plugins
    url: /wiki/commands/
  - title: Getting Started
    url: /wiki/getting-started/
  - title: Staff & Ranks
    url: /wiki/staff-ranks/
---

## Overview

WitchCraftMC keeps vanilla crafting intact but adds a handful of **custom recipes and special items** to enrich the survival experience. This page documents everything server-specific.

<div class="wiki-callout info">
  <span class="callout-icon"><i class="fas fa-info-circle"></i></span>
  <div>View all custom recipes in-game with <code>/recipes</code> or by checking the server's crafting book in your inventory.</div>
</div>

## Custom Recipes

### Backpack

<div class="infobox">
  <div class="infobox-title">Backpack</div>
  <div class="infobox-img"><i class="fas fa-bag-shopping mc-icon" style="color:var(--gold)"></i></div>
  <div class="infobox-section">Item Info</div>
  <div class="infobox-row"><span class="label">Type</span><span class="value">Custom Item</span></div>
  <div class="infobox-row"><span class="label">Rarity</span><span class="value r-uncommon">Uncommon</span></div>
  <div class="infobox-row"><span class="label">Stackable</span><span class="value">No</span></div>
  <div class="infobox-section">Craft</div>
  <div class="infobox-row"><span class="label">Leather (L)</span><span class="value">× 8</span></div>
  <div class="infobox-row"><span class="label">Chest (C)</span><span class="value">× 1 (centre)</span></div>
  <div class="infobox-section">Usage</div>
  <div class="infobox-row"><span class="label">Activate</span><span class="value">Right-click</span></div>
  <div class="infobox-row"><span class="label">Off-hand</span><span class="value r-special">✘ Not supported</span></div>
</div>

Store extra items without returning to base. Craft it with leather surrounding a chest:

```
[ L ] [ L ] [ L ]
[ L ] [ C ] [ L ]
[ L ] [ L ] [ L ]
```
*(L = Leather, C = Chest)*

**Usage:** Right-click while holding the backpack to open it. Does not work in the off-hand slot.

---

### Repair Kit

<div class="infobox">
  <div class="infobox-title">Repair Kit</div>
  <div class="infobox-img"><i class="fas fa-screwdriver-wrench mc-icon" style="color:var(--teal)"></i></div>
  <div class="infobox-section">Item Info</div>
  <div class="infobox-row"><span class="label">Type</span><span class="value">Consumable</span></div>
  <div class="infobox-row"><span class="label">Rarity</span><span class="value r-uncommon">Uncommon</span></div>
  <div class="infobox-row"><span class="label">Charges</span><span class="value">1 use</span></div>
  <div class="infobox-section">Craft</div>
  <div class="infobox-row"><span class="label">Iron Ingot (I)</span><span class="value">× 8</span></div>
  <div class="infobox-row"><span class="label">String (S)</span><span class="value">× 1 (centre)</span></div>
  <div class="infobox-section">Effect</div>
  <div class="infobox-row"><span class="label">Durability</span><span class="value r-uncommon">+50% restored</span></div>
  <div class="infobox-row"><span class="label">XP required</span><span class="value r-uncommon">None</span></div>
</div>

Repair tools and weapons without an anvil or XP — especially useful early-game.

```
[ I ] [ I ] [ I ]
[ I ] [ S ] [ I ]
[ I ] [ I ] [ I ]
```
*(I = Iron Ingot, S = String)*

**Usage:** Right-click the item you want to repair while holding the Repair Kit. Restores **50% durability**.

---

### *(Add your custom recipes here)*

This section is a template — fill in any custom crafting recipes your server adds via plugins like CustomCrafting, Nexo, ItemsAdder, or similar.

## Special Items

### Server Crate Keys

Keys can be obtained through voting, events, and the store. There are three tiers:

<div class="infobox">
  <div class="infobox-title">Arcane Key</div>
  <div class="infobox-img"><i class="fas fa-key mc-icon" style="color:var(--rarity-legendary)"></i></div>
  <div class="infobox-section">Key Info</div>
  <div class="infobox-row"><span class="label">Rarity</span><span class="value r-legendary">Legendary</span></div>
  <div class="infobox-row"><span class="label">Source</span><span class="value">Special Events</span></div>
  <div class="infobox-section">Rewards</div>
  <div class="infobox-row"><span class="label">Custom items</span><span class="value"><span class="r-uncommon">✔</span></span></div>
  <div class="infobox-row"><span class="label">Cosmetics</span><span class="value"><span class="r-uncommon">✔</span></span></div>
  <div class="infobox-row"><span class="label">Large cash</span><span class="value"><span class="r-uncommon">✔</span></span></div>
</div>

| Key | How to Get | Notable Rewards |
|---|---|---|
| **Novice Key** | [Voting](/wiki/commands/#server-misc) | XP bottles, tools, food |
| **Adept Key** | Store / Events | Enchanted gear, rare materials |
| **Arcane Key** | Special Events | Custom items, cosmetics, large cash |

Use a key at the crates near spawn. See [World & Lore → Spawn Town](/wiki/world-lore/#spawn-town) for the crate plaza location.

### Vote Rewards

Vote for WitchCraftMC on any of our listed sites to receive:

- **$500 in-game currency**
- **1 Vote Crate Key**
- **+50 [claim blocks](/wiki/claims/#earning-claim-blocks)**

Vote at `/vote` in-game for a list of links, or use `/vote` from the [Commands page](/wiki/commands/#server-misc).

## Economy & Shops

WitchCraftMC runs a **player-driven economy** with a server shop as a price anchor. See the full command reference on the [Commands page](/wiki/commands/#economy).

- `/shop` — server buy/sell shop for common items
- `/market` — player auction house
- `/ah` — alternative auction command (same as `/market`)
- `/trade <player>` — safe face-to-face trade with another player

<div class="wiki-callout tip">
  <span class="callout-icon"><i class="fas fa-coins"></i></span>
  <div>Set up a player shop by placing a chest, then a sign with your price on top. Check with staff or Discord for the current sign format used by your shop plugin.</div>
</div>
