---
layout: wiki-page
title: Commands
description: "A complete reference of every player command available on WitchCraftMC."
permalink: /wiki/commands/
toc: true
categories: [Reference, Guides]
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

This page lists every command available to players.

<div class="wiki-callout info">
  <span class="callout-icon"><i class="fas fa-circle-info"></i></span>
  <div>Arguments in <code>&lt;angled brackets&gt;</code> are required. Arguments in <code>[square brackets]</code> are optional.</div>
</div>

---

## General

| Command | Description | Requirement |
| --- | --- | :---: |
| `/afk`| Mark yourself as AFK|
| `/profile [username]`| Check a player's profile and see information about them.|
| `/report <username>`| Report the given player to staff. |
| `/helpop <help message>`| Request staff assistance. |
| `/togglescoreboard`| Toggles scoreboard visibility. |
| `/scoreboard`| Opens GUI to set active scoreboard. |
| `/pv [number]`| Opens your playervaults. |
| `/craft`| Opens a virtual crafting table. |
| `/trash`| Open a virtual container to instantly dispose of items. |
| `/ec`| Opens your enderchest |
| `/ptime <time>`| Sets the time for your client. This does not affect any mechanics on the server. |
| `/pweather <weather>`| Sets the weather for your client. This does not affect any mechanics on the server. |
| `/nv`| Toggles permanent nightvision |
| `/condense`| Condenses items in your inventory (Ingots become blocks). |
| `/invisframe`| Sets the itemframe you're looking at to be invisible. |

## Cosmetics

| Command | Description | Requirement |
| --- | --- | :---: |
| `/tags`| Opens the [Tags](/wiki/tags) menu. |
| `/cosmetics`| Opens the Cosmetics Menu. |
| `/cosmetics hide`| Hides your applied cosmetics. |
| `/cosmetics show`| Reenables your hidden cosmetics. |
| `/cosmetics unapply <slot>`| Unapplies the cosmetics from the given slot. |
| `/sit`| Makes your character sit on the block you're standing on. |
| `/spin`| Makes you spin in place. |
| `/bellyflop`| Makes your character lie down on their stomach. |
| `/lay`| Makes your character lie down on their back. |
| `/crawl`| Makes your character crawl on the floor. |
| `/nick [nickname]`| Sets your Nickname.| [Jade](/wiki/store-ranks#jade), [Topaz](/wiki/store-ranks#Topaz), [Diamond](/wiki/store-ranks#Diamond)|
| `/hat`| Puts your current held item on your head slot.| [Topaz](/wiki/store-ranks#topaz)|

## Talents

| Command | Description | Requirement |
| --- | --- | :---: |
| `/talents`| Opens the Talents GUI to check your progress. |
| `/archery`| Check your archery talent progress. |
| `/fighting`| Check your fighting talent progress. |
| `/defense`| Check your defense talent progress. |
| `/farming`| Check your farming talent progress. |
| `/foraging`| Check your foraging talent progress. |
| `/mining`| Check your mining talent progress. |
| `/fishing`| Check your fishing talent progress. |
| `/excavation`| Check your excavation talent progress. |
| `/agility`| Check your agility talent progress. |
| `/alchemy`| Check your alchemy talent progress. |
| `/enchanting`| Check your enchanting talent progress. |
| `/talents rank`| Check your talents ranking. |
| `/talents stats [player]`| View the stats of the given player. |
| `/talents top [talent]`| Check the leaderboard for the given talent. If no name is given, checks global leaderboard. |

---

## Chat

| Command | Description | Requirement |
| --- | --- | :---: |
| `/msg <player> <message>`| Send a private message to the given player.|
| `/reply <message>`| Reply to the last private message.|
| `/ignore <player>`| You will no longer see messages from the given player.|
| `/ignorelist`| See all players you are currently ignoring.|
| `/g [message]` | Toggles the chat channel to Global Chat. If a message is written afterwards, sends a message into global chat without toggling channel. |
| `/lc [message]` | Toggles the chat channel to Local Chat. If a message is written afterwards, sends a message into local chat without toggling channel. |
| `/pc` | Toggles the chat channel to Party Chat. If a message is written afterwards, sends a message into party chat without toggling channel. |
| `/party create <name>` | Creates a party with the given name |
| `/party invite <player>` | Invites the given player to your party |
| `/party disband` | Disbands your party |
| `/party accept` | Accept a received party invite |
| `/party leave` | Leave your party |
| `/party` | Shows the list of players in your party. |
| `/mail send <username> <message>` | Sends a message to a player's inbox. Helpful for offline players.|
| `/mail read` | Read your inbox of received mail. |
| `/mail clear` | Clear your inbox for mail. |


## Teleportation

| Command | Description | Requirement |
| --- | --- | :---: |
| `/spawn`| Teleport to [Spawn](/wiki/spawn/). |
| `/warp <warp>`| Teleport to the given warp. |
| `/warps`| Lists all available warps. |
| `/crates`| Teleport to the crates area. |
| `/hub`| Teleport to the Hub. |
| `/sethome [name]`| Saves the current location as a home. |
| `/home [name]`| Teleports to the given home. |
| `/delhome [name]`| Deletes the given home. |
| `/homes`| Lists all your saved homes. |
| `/rtp [world]`| If a world is given, teleport to a random location in that world. If no world is given, opens the RTP Menu. |
| `/tpa <player>`| Sends a teleport request to the given player. |
| `/tpahere <player>`| Sends a teleport request for the given player to teleport to you. |
| `/tpaccept`| Accepts a teleport request. |
| `/tpdeny`| Denies a teleport request. |
| `/tptoggle`| Toggles whether you can receive teleport requests.|
| `/back`| Teleports to the last teleport location. | [Jade](/wiki/store-ranks#jade) |

---

## Claims

<div class="wiki-callout warning">
  <span class="callout-icon"><i class="fas fa-triangle-exclamation"></i></span>
  <div><i>SCS will likely be removed, this section might change.</i></div>
</div>

| Command | Description | Requirement |
| --- | --- | :---: |
| `/claim [radius]`| Claims the current chunk or a radius around you. |
| `/claim autoclaim`| Automatically claim chunks as you walk into them. |
| `/unclaim`| Unclaims the current chunk|
| `/claim autounclaim`| Automatically unclaim chunks as you move.|
| `/claim addchunk`| Add your current chunk to a claim. |
| `/claim autoaddchunk`| Auto add chunks to the claim as you move. |
| `/claim delchunk`| remove the current chunk from a claim. |
| `/claim autodelchunk`| Auto deletes chunks from the claim as you move. |
| `/claim main <name>`| Opens the main claims menu for the given claim. |
| `/claim list`| View all your claims|
| `/claim tp <name>`| Teleports to the given claim. |
| `/claim setspawn`| Sets the spawnpoint for your claim. |
| `/claim setname`| Sets the name of your claim. |
| `/claim setdesc <description>`| Sets a description for the given claim. |
| `/claim settings`| Opens the settings GUI for the given claim, allowing you to change permissions.|
| `/claim chunks`| See a list of the claimed chunks for your claim.|
| `/claim see`| See the borders for your claim in particles. |
| `/claim map`| View nearby claims in a chat-based map. |
| `/claim automap`| View nearby claims in a scoreboard map. |
| `/claim add <player>`| Adds the given player to your claim. |
| `/claim remove <player>`| Remove the given player from your claim. |
| `/claim accept <player>`| Accept a claim invitation from a player. |
| `/claim deny <player>`| Denies a claim invitation from a player. |
| `/claim cancelinv <player>`| Cancels an invitation given to a player. |
| `/claim members`| See all members of your claim. |
| `/claim bans`| Open the bans GUI for your claim. |
| `/claim kick <player>`| Forcefully removes a player from your claim's territory. |
| `/claim ban <player>`| Bans the player from your claim. |
| `/claim unban <player>`| Unbans the given player from your claim. |
| `/claim merge <name-1> <name-2>`| Merges two claims you currently own. |
| `/claim owner <player>`| Transfers ownership of a claim to another player. |

---

## Economy

| Command | Description | Requirement |
| --- | --- | :---: |
| `/bal [username]`| Check your current balance. |
| `/baltop [page]`| Check the top balances on the server. |
| `/pay <player> <amount>`| Pay the given player money. |
| `/paytoggle`| Toggle wheter you receive payments or not. |
| `/ah`| Opens the Auction House. |
| `/ah sell <price> [amount]`| Lists the held item for auction, for the given price. |
| `/ah bid <price> [amount]`| Lists the held item for bidding, for the given price. |
| `/ah view <player>`| Views the given player's active listings. |
| `/ah expired`| Views items you've listed that expired from the auction house. |
| `/ah listed`| View all items you are currently selling. |

---

## Information

| Command | Description | Requirement |
| --- | --- | :---: |
| `/rules`| Get the link to the [Rules](/wiki/rules). |
| `/vote`| Get the links to [Vote](/wiki/voting) for the server.|
| `/website`| Get the link to the Website. |
| `/store`| Get the link to the Store. |
| `/wiki`| Get the link to the Wiki. |
| `/discord`| Get the link to the Discord Server. |
| `/serverip`| Get the ip for the server. |
| `/help`| Opens the in-game commands list.|
| `/playtime`| Shows your current playtime.|
| `/colors`| Shows a quick guide for colour codes.|