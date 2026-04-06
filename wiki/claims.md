---
layout: wiki-page
title: Land Claims
description: "How to protect your builds and manage your territory using GriefPrevention."
permalink: /wiki/claims/
toc: true
categories: [Gameplay, Guides]
prev_page:
  title: Rules
  url: /wiki/rules/
next_page:
  title: Crafting & Items
  url: /wiki/crafting/
see_also:
  - title: Commands & Plugins
    url: /wiki/commands/
  - title: Rules
    url: /wiki/rules/
  - title: Getting Started
    url: /wiki/getting-started/
---

## Overview

WitchCraftMC uses **GriefPrevention** to let players protect their land. A claimed area prevents other players from breaking blocks, opening containers, or interacting with your builds — even if you're offline.

<div class="wiki-callout tip">
  <span class="callout-icon"><i class="fas fa-lightbulb"></i></span>
  <div>Claim your land <strong>before</strong> you start building, not after. Anything you build on unclaimed land is at risk — see the <a href="/wiki/rules/#griefing--theft">Rules on Griefing</a>.</div>
</div>

## Earning Claim Blocks

Every new player starts with **100 claim blocks**. You earn more over time just by playing:

- **+100 blocks** per hour of active playtime (approx.)
- Purchased via the store
- Earned through server events and [votes](/wiki/commands/#server-misc)

One claim block = one block of surface area in your claim.

## Creating a Claim

### With the Golden Shovel *(default method)*

1. Hold a **Golden Shovel** (craft or use `/kit claim` if available).
2. **Right-click one corner** of the area you want to claim.
3. Walk to the **opposite corner** and **right-click** again.
4. A golden border appears — your land is now protected!

<div class="wiki-callout info">
  <span class="callout-icon"><i class="fas fa-cube"></i></span>
  <div>Claims extend from <strong>bedrock to sky limit</strong> automatically. You don't need to claim every Y-level separately.</div>
</div>

### With Commands

| Command | Description |
|---|---|
| `/claim` | Create a claim at your feet (20×20 default) |
| `/abandonclaim` | Remove the claim you're standing in |
| `/abandonallclaims` | Remove **all** your claims (cannot be undone) |
| `/claimlist` | See all your claims and remaining block count |

See the complete land claim command reference on the [Commands page](/wiki/commands/#land-claims).

## Trusting Other Players

You can grant other players access to your claim at different levels:

| Command | Access Level |
|---|---|
| `/accesstrust <player>` | Open doors, buttons, pressure plates |
| `/containertrust <player>` | Open chests, furnaces, dispensers |
| `/trust <player>` | Build and break within the claim |
| `/permissiontrust <player>` | Grant trust to others (full manager) |
| `/untrust <player>` | Remove a player's trust |
| `/untrust all` | Remove everyone's trust |

## Subdividing a Claim

You can divide a large claim into sub-claims with different trust settings — useful for shared towns or shops.

1. Stand inside your main claim with the Golden Shovel.
2. Run `/subdivideclaims` to enter subdivision mode.
3. Right-click two corners to create a sub-claim.
4. Use `/trust` commands inside the sub-claim to manage it independently.
5. Return to normal mode with `/basicclaims`.

## Claim Flags & Settings

Run `/claiminfo` while standing in your claim to see its details. Some useful flags (if ClaimManager is installed):

- `pvp` — enable/disable PvP inside your claim *(see [PvP rules](/wiki/rules/#pvp))*
- `mob-spawning` — control whether mobs spawn in your claim
- `fire-spread` — prevent fire from spreading inside your claim

## Common Questions

**Q: Someone griefed my unclaimed build. Can staff help?**
Yes — staff have rollback tools and will investigate. But always claim your builds to prevent it in the first place.

**Q: Can I trust someone with only a specific chest?**
Yes. Place a sign on the chest with `[Trust]` and their name, or use a sub-claim around it.

**Q: My claim blocks ran out, what do I do?**
[Vote](/wiki/commands/#server-misc) for the server (+50 blocks per vote), play more (+100/hr), or check the store for a top-up.

**Q: Can I check how many claim blocks I have?**
Yes — `/claimlist` shows your total block count and all active claims.
