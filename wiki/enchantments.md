---
layout: wiki-page
title: Enchantments
description: "A complete reference of every custom enchantment."
permalink: /wiki/enchantments/
toc: true
categories: [Reference]
prev_page:
  title: Staff & Ranks
  url: /wiki/staff-ranks/
see_also:
  - title: Land Claims
    url: /wiki/claims/
  - title: Getting Started
    url: /wiki/getting-started/
  - title: Crafting & Items
    url: /wiki/crafting/
  - title: Staff & Ranks
    url: /wiki/staff-ranks/
---

## Overview

This page lists every command available to players on WitchCraftMC. Commands marked with a ⭐ are available only to certain ranks — see [Staff & Ranks](/wiki/staff-ranks/) for details.

<div class="wiki-callout info">
  <span class="callout-icon"><i class="fas fa-keyboard"></i></span>
  <div>Arguments in <code>&lt;angled brackets&gt;</code> are required. Arguments in <code>[square brackets]</code> are optional.</div>
</div>

---

## Essentials — General

<table class="cmd-table">
  <thead><tr><th>Command</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td>/help [page]</td><td>List all available commands</td></tr>
    <tr><td>/spawn</td><td>Teleport to server spawn</td></tr>
    <tr><td>/playtime</td><td>Check your total time on the server (used for <a href="/wiki/staff-ranks/#player-ranks">rank progression</a>)</td></tr>
    <tr><td>/msg &lt;player&gt; &lt;message&gt;</td><td>Send a private message</td></tr>
    <tr><td>/reply &lt;message&gt;</td><td>Reply to the last private message</td></tr>
    <tr><td>/ignore &lt;player&gt;</td><td>Block messages from a player</td></tr>
    <tr><td>/afk</td><td>Mark yourself as AFK</td></tr>
    <tr><td>/nick [name]</td><td>Set a display nickname ⭐ (<a href="/wiki/staff-ranks/#settler">Settler</a>+)</td></tr>
    <tr><td>/hat</td><td>Wear the item in your hand as a hat ⭐ (<a href="/wiki/staff-ranks/#patron">Patron</a>+)</td></tr>
  </tbody>
</table>

---

## Essentials — Teleportation

<table class="cmd-table">
  <thead><tr><th>Command</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td>/sethome [name]</td><td>Save your current location as a home (home limit depends on <a href="/wiki/staff-ranks/#player-ranks">rank</a>)</td></tr>
    <tr><td>/home [name]</td><td>Teleport to a saved home</td></tr>
    <tr><td>/delhome &lt;name&gt;</td><td>Delete a saved home</td></tr>
    <tr><td>/homes</td><td>List all your saved homes</td></tr>
    <tr><td>/rtp</td><td>Random teleport to wilderness (30-min cooldown)</td></tr>
    <tr><td>/tpa &lt;player&gt;</td><td>Request to teleport to a player</td></tr>
    <tr><td>/tpahere &lt;player&gt;</td><td>Request a player teleport to you</td></tr>
    <tr><td>/tpaccept</td><td>Accept a teleport request</td></tr>
    <tr><td>/tpdeny</td><td>Deny a teleport request</td></tr>
    <tr><td>/back</td><td>Return to your last location (e.g., after death)</td></tr>
    <tr><td>/warp &lt;name&gt;</td><td>Teleport to a server warp point</td></tr>
    <tr><td>/warps</td><td>List all available warps</td></tr>
  </tbody>
</table>

---

## Economy

<table class="cmd-table">
  <thead><tr><th>Command</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td>/money</td><td>Check your balance</td></tr>
    <tr><td>/pay &lt;player&gt; &lt;amount&gt;</td><td>Send money to another player</td></tr>
    <tr><td>/baltop</td><td>View the richest players on the server</td></tr>
    <tr><td>/shop</td><td>Open the server buy/sell shop (at <a href="/wiki/worlds/#spawn-town">Spawn Town</a>)</td></tr>
    <tr><td>/market</td><td>Open the player auction house</td></tr>
    <tr><td>/ah sell &lt;price&gt;</td><td>List the item in hand on the auction house</td></tr>
    <tr><td>/trade &lt;player&gt;</td><td>Initiate a safe face-to-face trade</td></tr>
  </tbody>
</table>

See also [Crafting & Items](/wiki/crafting/#economy--shops) for more on the player economy.

---

## Land Claims

<table class="cmd-table">
  <thead><tr><th>Command</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td>/claim</td><td>Create a basic claim at your feet</td></tr>
    <tr><td>/abandonclaim</td><td>Remove the claim you're standing in</td></tr>
    <tr><td>/claimlist</td><td>View all your claims and block count</td></tr>
    <tr><td>/claiminfo</td><td>View details about the claim you're in</td></tr>
    <tr><td>/trust &lt;player&gt;</td><td>Grant build access in your claim</td></tr>
    <tr><td>/containertrust &lt;player&gt;</td><td>Grant container access in your claim</td></tr>
    <tr><td>/accesstrust &lt;player&gt;</td><td>Grant door/button access in your claim</td></tr>
    <tr><td>/untrust &lt;player&gt;</td><td>Remove a player's access</td></tr>
  </tbody>
</table>

For the full claiming guide (earning blocks, subdivisions, flags), see [Land Claims](/wiki/claims/).

---

## Server Misc

<table class="cmd-table">
  <thead><tr><th>Command</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td>/vote</td><td>Get links to vote for the server (earn $500 + 1 key + 50 <a href="/wiki/claims/#earning-claim-blocks">claim blocks</a> per vote)</td></tr>
    <tr><td>/kit &lt;name&gt;</td><td>Claim an available kit</td></tr>
    <tr><td>/kits</td><td>List all kits available to you</td></tr>
    <tr><td>/rules</td><td>Read the <a href="/wiki/rules/">server rules</a> in-game</td></tr>
    <tr><td>/discord</td><td>Get the Discord invite link</td></tr>
    <tr><td>/report &lt;player&gt; &lt;reason&gt;</td><td>Silently report a player to <a href="/wiki/staff-ranks/#staff-ranks">staff</a></td></tr>
    <tr><td>/helpme &lt;message&gt;</td><td>Request staff assistance</td></tr>
  </tbody>
</table>
