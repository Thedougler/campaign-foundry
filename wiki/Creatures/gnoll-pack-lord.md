---
title: Gnoll Pack Lord
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Fiend
size: Medium
habitat:
  - Desert
  - Forest
  - Grassland
  - Hill
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gnoll Pack Lord
size: Medium
type: fiend
alignment: Chaotic Evil
ac: 15
hp: 49
hit_dice: 9d8 + 9
modifier: 4
speed: 30 ft.
stats: [ 16, 14, 13, 8, 11, 9 ]
senses: Darkvision 60 ft., passive Perception 10
languages: Gnoll
cr: "2"
actions:
  - name: Multiattack
    desc: The gnoll makes two attacks, using Bone Whip or Bone Javelin in any combination, and it uses Incite Rampage if available.
  - name: Bone Whip
    desc: "*Melee Attack Roll:* +5, reach 10 ft. *Hit:* 8 (2d4 + 3) Slashing damage."
  - name: Bone Javelin
    desc: "*Ranged Attack Roll:* +5, range 30/120 ft. *Hit:* 7 (1d8 + 3) Piercing damage."
  - name: Incite Rampage (Recharge 5–6)
    desc: The gnoll targets another creature it can see within 60 feet of itself that has the Rampage Bonus Action. The target can take a Reaction to make one melee attack.
bonus_actions:
  - name: Rampage (2/Day)
    desc: Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Bone Whip attack.
```
