---
layout: wiki-page
title: NPCs
description: "All non-player characters at WitchCraftMC Spawn."
permalink: /wiki/npc/
categories: [NPCs]
see_also:
  - title: Spawn
    url: /wiki/spawn/
  - title: Getting Started
    url: /wiki/getting-started/
---

## Spawn NPCs

All of the following NPCs are located at **Spawn** (`0, 64, 0`). Click any name to visit their full wiki page.

| NPC | Type | What they do |
|-----|------|-------------|
| [Auctioneer](/wiki/npc/Auctioneer) | Merchant | Lists and bids on player auctions — use `/ah` |
| [Blacksmith](/wiki/npc/Blacksmith) | Service | Repairs and upgrades gear |
| [Furniture Merchant](/wiki/npc/Furniture Merchant) | Merchant | Sells decorative furniture and props for builds |
| [Cosmeticist](/wiki/npc/Cosmeticist) | Merchant | Sells cosmetic items — cloaks, hats, particle effects |
| [Farmer](/wiki/npc/Farmer) | Merchant | Buys and sells crops and seeds |
| [Mob Merchant](/wiki/npc/Mob Merchant) | Merchant | Buys and sells mob drops |
| [Lumberjack](/wiki/npc/Lumberjack) | Merchant | Buys and sells wood and forest materials |
| [Fish Merchant](/wiki/npc/Fish Merchant) | Merchant | Buys your catch and sells fishing supplies |
| [Rex Timberland](/wiki/npc/Rex Timberland) | Special Merchant | Rare and rotating stock |
| [Archwizard](/wiki/npc/Archwizard) | Service | High-level magical services and rare enchantments |
| [Enchanter](/wiki/npc/Enchanter) | Service | Applies and disenchants gear |
| [Agent LemLem](/wiki/npc/Agent LemLem) | Special | Classified |

## Adding a New NPC

When a new NPC is added to the server, here's the full checklist:

1. **Add their head icon** to `img/icons/npc/Heads/NPC_Name.png`
2. **Add their body render** to `img/icons/npc/Body/NPC_Name.png`
3. **Create their wiki page** — copy `wiki/npc/_template.md`, rename it `npc-name.md`, and fill it in
4. **Add them to this index table** above
5. **Add them to spawn.md** — add an entry under the NPCs section in the infobox

See `wiki/npc/_template.md` for a fully annotated copy-paste starter, and `wiki/README.md` for the full image naming conventions.
