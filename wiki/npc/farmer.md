---
layout: wiki-page
title: Farmer
description: "Sell crops for money!"
permalink: /wiki/npc/farmer
categories: [NPCs, Spawn, Economy]
see_also:
  - title: NPCs
    url: /wiki/npc/
  - title: Economy
    url: /wiki/economy/
history:
  - version: "Survival Release"
    date: "2026-01-01"
    changes: "Farmer added to Spawn."

Infobox:
  Enabled: true
  title: "Farmer"
  image: "/img/icons/npc/Body/farmer.png"
  Sections:
    - heading: "NPC"
      rows:
        - label: "<strong>Type"
          value: "Merchant"
    - heading: "Location"
      rows:
        - label: "<strong>Area"
          value: "The Farm"
        - label: "<strong>Coordinates"
          value: "<strong>XYZ:</strong> <code>-151 68 -61</code>"
---

The Farmer is an NPC located in the [Farm](/wiki/spawn#the-farm) that players can sell their harvested crops to.

## Interface
{% include shop-gui.html id="farmer" %}

## Dialogue

| Condition | Dialogue |
|:---:|:---|
| First interaction | <span class="minefont"><span class="format-3">[NPC] Farmer</span> » Hey <span class="format-7">\<player\></span>!</span>|
| | <span class="minefont"><span class="format-3">[NPC] Farmer</span> » I am the Farmer.</span> | 
| | <span class="minefont"><span class="format-3">[NPC] Farmer</span> » You can sell your crops to me!</span> |
