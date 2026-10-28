---
layout: wiki-page
title: Commands
description: "A complete reference of every player command available on WitchCraftMC."
permalink: /wiki/commands/
toc: true
categories: [Reference]
see_also:
  - title: Land Claims
    url: /wiki/claims/
  - title: Getting Started
    url: /wiki/getting-started/
  - title: Crafting & Items
    url: /wiki/crafting/
  - title: Staff & Ranks
    url: /wiki/staff-ranks/
history:
  - version: "Alpha"
    date: "Oct 16, 2026"
    changes: "<code>/profile</code> now shows Kernel and Scales balance, as well as talent levels."
  - version: "Alpha"
    date: "Oct 26, 2026"
    changes: "Added <code>/settings</code> which allows players to toggle personal settings."
  - version: "Alpha"
    date: "Oct 27, 2026"
    changes: "<code>/playtime</code>Now shows current session's and weekly playtime."
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
| `/ranks`| View your rank progress.|
| `/settings` | Toggle personal settings for yourself.|
| `/afk`| Mark yourself as AFK|
| `/profile [username]`| Check a player's profile and see information about them.|
| `/report <username>`| Report the given player to staff. |
| `/helpop <help message>`| Request staff assistance. |
| `/togglescoreboard`| Toggles scoreboard visibility. |
| `/scoreboard`| Opens GUI to set active scoreboard. |
| `/pv [number]`| Opens your playervaults. | [Novice](/wiki/ranks#novice), [Quartz](/wiki/store-ranks#quartz) |
| `/craft`| Opens a virtual crafting table. | [Acolyte](/wiki/ranks#acolyte), [Quartz](/wiki/store-ranks#quartz) |
| `/trash`| Open a virtual container to instantly dispose of items. | [Adept](/wiki/ranks#adept), [Quartz](/wiki/store-ranks#quartz) |
| `/ec`| Opens your enderchest | [Sorcerer](/wiki/ranks#sorcerer), [Jade](/wiki/store-ranks#jade) |
| `/ptime <time>`| Sets the time for your client. This does not affect any mechanics on the server. | [Jade](/wiki/store-ranks#jade) |
| `/pweather <weather>`| Sets the weather for your client. This does not affect any mechanics on the server. | [Quartz](/wiki/store-ranks#quartz) |
| `/nv`| Toggles permanent nightvision | [Quartz](/wiki/store-ranks#quartz) |
| `/condense`| Condenses items in your inventory (Ingots become blocks). | [Jade](/wiki/store-ranks#jade) |
| `/pantpocket`| Opens your Pant Pockets, an extra playervault. | [Pant Pockets](/wiki/enchantments/#epic) on your leggings |
| `/salvage` | Opens the salvage menu to recycle unwanted enchantments. |
| `/dustforge` | Opens the dustforge menu to craft enchantment shards or upgrading enchantment dust. |
| `/vp claim` | Claims vote shards gained if a player voted while offline. |
| `/settings` | Opens a gui where you can access personal settings for yourself.|

## Cosmetics

| Command | Description | Requirement |
| --- | --- | :---: |
| `/tags`| Opens the Tag menu. |
| `/cosmetics`| Opens the Cosmetics Menu. |
| `/cosmetics hide`| Hides your applied cosmetics. |
| `/cosmetics show`| Reenables your hidden cosmetics. |
| `/cosmetics unapply <slot>`| Unapplies the cosmetics from the given slot. |
| `/sit`| Makes your character sit on the block you're standing on. | [Quartz](/wiki/store-ranks#quartz) |
| `/spin`| Makes you spin in place. | [Quartz](/wiki/store-ranks#quartz) |
| `/bellyflop`| Makes your character lie down on their stomach. | [Topaz](/wiki/store-ranks#topaz) |
| `/lay`| Makes your character lie down on their back. | [Topaz](/wiki/store-ranks#topaz) |
| `/crawl`| Makes your character crawl on the floor. | [Ruby](/wiki/store-ranks#ruby) |
| `/nickname [nickname]`| Sets your Nickname.| [Jade](/wiki/store-ranks#jade), [Topaz](/wiki/store-ranks#topaz), [Diamond](/wiki/store-ranks#diamond)|
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
| `/r <message>`| Reply to the last private message.|
| `/ignore <player>`| You will no longer see messages or mail from the given player.|
| `/unignore <player>`| Stop ignoring the given player.|
| `/ignorelist`| See all players you are currently ignoring.|
| `/chat`| Opens a menu to turn Global and Local Chat on or off.|
| `/togglechat [global/local]`| Mutes or unmutes the given chat channel. If no channel is given, mutes or unmutes both.|
| `/g [message]` | Toggles the chat channel to Global Chat. If a message is written afterwards, sends a message into Global Chat without toggling channel. |
| `/tc [message]` | Toggles the chat channel to Town Chat. If a message is written afterwards, sends a message into Town Chat without toggling channel. |
| `/lc [message]` | Toggles the chat channel to Local Chat. If a message is written afterwards, sends a message into Local Chat without toggling channel. |
| `/mail send <username> <message>` | Sends a message to a player's inbox. Helpful for offline players.|
| `/mail read` | Read your inbox of received mail. |
| `/mail clear` | Clear your inbox for mail. |

<!--
| `/pc [message]` | Toggles the chat channel to Party Chat. If a message is written afterwards, sends a message into party chat without toggling channel. |
| `/party create <name>` | Creates a party with the given name |
| `/party invite <player>` | Invites the given player to your party |
| `/party disband` | Disbands your party |
| `/party accept` | Accept a received party invite |
| `/party leave` | Leave your party |
| `/party` | Shows the list of players in your party. |-->


## Teleportation

| Command | Description | Requirement |
| --- | --- | :---: |
| `/spawn`| Teleport to [Spawn](/wiki/spawn/). |
| `/warp <warp>`| Teleport to the given warp. |
| `/warps`| Lists all available warps. |
| `/hub`| Teleport to the Hub. |
| `/sethome [name]`| Saves the current location as a home. How many homes you can have depends on your [rank](/wiki/ranks/). |
| `/home [name]`| Teleports to the given home. |
| `/delhome [name]`| Deletes the given home. |
| `/homes`| Lists all your saved homes. |
| `/rtp [world]`| If a world is given, teleport to a random location in that world. If no world is given, opens the RTP Menu. |
| `/rankup`| Teleport to the [Archwizard](/wiki/npc/archwizard) so you can rank up to the next [rank](/wiki/ranks/). |
| `/tpa <player>`| Sends a teleport request to the given player. |
| `/tpahere <player>`| Sends a teleport request for the given player to teleport to you. |
| `/tpaccept`| Accepts a teleport request. |
| `/tpdeny`| Denies a teleport request. |
| `/tptoggle`| Toggles whether you can receive teleport requests.|
| `/back`| Teleports to the last teleport location. | [Jade](/wiki/store-ranks#jade) |

---

## Land Claims

Land is claimed through towns. `/t` and `/town` are the same command. See [Land Claims](/wiki/claims/) for a guide.

| Command | Description | Requirement |
| --- | --- | :---: |
| `/t create <name>`| Create and select a new town. Then use `/claim` to protect land. |
| `/t set <town>`| Select the town you want to manage. Most town commands affect this selection. |
| `/t`| Open the main town menu, where you can view towns you own or have joined. |
| `/t menu`| Open your selected town's management menu. |
| `/claim`| Claim your current chunk for your town. An active tool selection claims its area. |
| `/claim radius <radius>`| Claim an area around your current chunk. Radius 1-10, radius 1 is one chunk. |
| `/unclaim`| Remove protection from your current chunk. |
| `/t auto`| Toggle claiming chunks as you walk. Run again to turn automatic claiming off. |
| `/t claimlist gui`| Open your selected town's claimed chunks. Use `/t claimlist` for the chunk count. |
| `/t borders`| Show claim borders with particles. Use `/t borders stop` to hide them. |
| `/t home`| Teleport to your selected town's spawn. |
| `/t visit <town>`| Visit another town's spawn. The town must allow you to teleport. |
| `/t setspawn`| Set your selected town's spawn here. Stand inside your town first. |
| `/t rename <name>`| Change your selected town's name. |
| `/t setdisplayname <text>`| Set a separate display name for your selected town. |
| `/t setdescription <text>`| Write a description for your selected town. |
| `/t flags`| Open your town's protection settings. Manage visitor, member and world flags. |
| `/t info [town]`| View details about a town. Leave out the name for the town you stand in. |
| `/t trust <player>`| Invite a player to your selected town. |
| `/t untrust <player>`| Remove a member or revoke their invitation. |
| `/t accept <town>`| Accept an invitation to a town. Enter the town name, not the inviter. |
| `/t deny <town>`| Decline an invitation to a town. |
| `/t members`| Open your selected town's member list. |
| `/t kick <player>`| Remove a player currently inside your town. This does not stop them returning. |
| `/t ban <player> [reason]`| Prevent a player from entering your town. |
| `/t unban <player>`| Remove a player's entry ban. |
| `/t banlist`| View and manage your town's banned players. |
| `/t leave confirm`| Leave your selected town as a trusted member. |
| `/t chat <message>`| Send a private message to your town. |
| `/t mail <town> <message>`| Send mail to another town. The owner does not need to be online. |
| `/t logs`| Review your selected town's activity and mail. |
| `/t storage`| Open your selected town's shared storage. |
| `/t levels`| View your selected town's level and XP. |
| `/t rewards`| Check your town's reward progress. |
| `/t subareas`| Manage smaller areas inside your town. Get the selection tool with `/t subareas tool`, select two corners, then create the area with `/t subareas create <name>`. |
| `/t rent [subarea]`| Open rental settings for your town. Add a subarea name to configure that area. |
| `/t balance [town]`| Check a town bank. Leave out the name for yours. |
| `/t deposit <amount>`| Put money into your selected town. Use `all` to put in everything. |
| `/t withdraw <amount>`| Take money out of your selected town. Use `all` to take out everything. |
| `/t setmembertax <amount>`| Set the tax paid by your town's members. Use 0 to disable member tax. |
| `/t player <player>`| View a player's town information. |
| `/t top`| View the town leaderboard. |
| `/t rate <town>`| Rate a town. |
| `/t merge <town>`| Request a merge with another town. The other owner must be online. |
| `/t mergeaccept`| Accept a merge request. Select your own town first. |
| `/t settime <time>`| Change the time shown inside your town. This changes the appearance for players. |
| `/t setweather <weather>`| Change the weather shown inside your town. This changes the appearance for players. |
| `/t delete confirm`| Permanently delete your selected town. Removes all its claims and member access. |

---

## Economy

| Command | Description | Requirement |
| --- | --- | :---: |
| `/bal [username]`| Check your current balance. |
| `/baltop [page]`| Check the top balances on the server. |
| `/pay <player> <amount>`| Pay the given player money. |
| `/paytoggle`| Toggle whether you receive payments or not. |
| `/wallet`| Opens your wallet, showing all your currencies. |
| `/scales`| Shows how many [Scales](/wiki/scales) you have. |
| `/kernels`| Shows how many [Kernels](/wiki/kernels) you have. |
| `/ah`| Opens the Auction House. | [Novice](/wiki/ranks#novice) |
| `/ah sell <price> [amount]`| Lists the held item for auction, for the given price. | [Novice](/wiki/ranks#novice) |
| `/ah bid <price> [amount]`| Lists the held item for bidding, for the given price. | [Novice](/wiki/ranks#novice) |
| `/ah view <player>`| Views the given player's active listings. | [Novice](/wiki/ranks#novice) |
| `/ah expired`| Views items you've listed that expired from the auction house. | [Novice](/wiki/ranks#novice) |
| `/ah listed`| View all items you are currently selling. | [Novice](/wiki/ranks#novice) |
| `/fish shop`| Opens [Old Man Eyebrows](/wiki/npc/old-man-eyebrows)' shop to sell fish remotely. | [Fishing](/wiki/talents#fishing) Level 5 |
| `/fish sellall`| Instantly sells all fish in your inventory. | [Ruby](/wiki/store-ranks#ruby) |

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
| `/colorsmini`| Shows a quick guide for MiniMessage colours, used in nicknames.|
| `/journal`| View all your journals.|
| `/enchantjournal`| A journal of every [enchantment](/wiki/enchantments/) you've discovered.|
| `/fishjournal`| A journal of every fish you've caught.|