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

<div class="wiki-callout warning">
  <span class="callout-icon"><i class="fas fa-triangle-exclamation"></i></span>
  <div><i>SCS will likely be removed, this page might change.</i></div>
</div>
<div class="wiki-callout tip">
  <span class="callout-icon"><i class="fas fa-lightbulb"></i></span>
  <div>Claim your land <strong>before</strong> you start building, not after. Anything you build on unclaimed land is at risk — see the <a href="/wiki/rules/#griefing--theft">Rules on Griefing</a>.</div>
</div>

A claimed area prevents other players from breaking blocks, opening containers, or interacting with your builds, even if you're offline.

## Creating a Claim

| Command | Description |
|---|---|
| `/claim [radius]`| Claims the current chunk or a radius around you. |
| `/unclaim`| Unclaims the current chunk|
| `/claim addchunk`| Add your current chunk to a claim. |
| `/claim delchunk`| remove the current chunk from a claim. |
| `/claim tp <name>`| Teleports to the given claim. |
| `/claim settings`| Opens the settings GUI for the given claim, allowing you to change permissions.|

See the complete land claim command list on the [Commands page](/wiki/commands/#land-claims).

## Adding other Players

You can grant other players access to your claim:

| Command | Access Level |
|---|---|
| `/claim add <player>`| Adds the given player to your claim. |
| `/claim remove <player>`| Remove the given player from your claim. |
| `/claim accept <player>`| Accept a claim invitation from a player. |
| `/claim deny <player>`| Denies a claim invitation from a player. |
| `/claim cancelinv <player>`| Cancels an invitation given to a player. |
| `/claim members`| See all members of your claim. |

## Claim Settings

Run `/claim settings` while standing in your claim to see its settings. Some useful toggles:

* `Explosions` - Toggles if explosives can affect the claim.
* `Liquids` - Toggles if external liquids can flow into the claim.
* `Redstone` - Toggles if external redstone, such as pistons, can influence the claim.
* `Fire Spread` - Toggles if fire can spread in the claim.
* `Monsters` - Toggles if monsters can spawn within the claim.
