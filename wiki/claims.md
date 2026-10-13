---
layout: wiki-page
title: Land Claims
description: "Protecting your builds and managing your territory."
permalink: /wiki/claims/
toc: true
categories: [Gameplay]
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
  <div>Claims will likely have some changes, be prepared for command changes.</div>
</div>

<div class="wiki-callout tip">
  <span class="callout-icon"><i class="fas fa-lightbulb"></i></span>
  <div>Claim your land <strong>before</strong> you start building, not after. Anything you build on unclaimed land is at risk — see the <a href="/wiki/rules/#griefing--theft">Rules on Griefing</a>.</div>
</div>

A claimed area prevents other players from breaking blocks, opening containers, or interacting with your builds, even if you're offline.

## Creating a Claim

| Command | Description |
|---|---|
| `/t create <name>`| Creates a *town*.|
| `/claim`| Claims the current chunk you're in for your *town*. |
| `/unclaim`| Unclaims the current chunk|
| `/t borders`| See your current *town* borders. |
| `/t visit <town>`| Visit another player's *town*.|

See the complete land claim command list on the [Commands page](/wiki/commands/#land-claims).

## Adding other Players

You can grant other players access to your claim:

| Command | Access Level |
|---|---|
| `/t trust <player>`| Invites the player to your *town*. |
| `/t untrust <player>`| Remove the player from your *town*. |
| `/t accept <town>`| Accept a *town* invitation from a town. |
| `/t deny <town>`| Denies a *town* invitation from a town. |
| `/t kick <player>`| Kicks the player from your *town borders*. |
| `/t ban <player>`| Ban the player from your **town**. |

## Claim Settings

You can use `/t menu` to open your claim's main gui. To edit your claim's properties, either click the third button labeled "**Manage Flags** or use:
- **/t flags global** to edit permissions within your claim.
- **/t flags world** to edit mechanics within your claim.