---
title: Gnoll Fang of Yeenoghu
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
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
name: Gnoll Fang of Yeenoghu
size: Medium
type: fiend
alignment: Chaotic Evil
ac: 14
hp: 71
hit_dice: 11d8 + 22
modifier: 4
speed: 30 ft.
stats: [ 17, 15, 15, 10, 11, 13 ]
saves:
  - con: 4
  - wis: 2
  - cha: 3
senses: Darkvision 60 ft., passive Perception 10
languages: Abyssal, Gnoll
cr: "4"
actions:
  - name: Multiattack
    desc: The gnoll makes one Bite attack and two Bone Flail attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Piercing damage plus 7 (2d6) Poison damage, and the target has the Poisoned condition until the start of the gnoll's next turn."
  - name: Bone Flail
    desc: "*Melee Attack Roll:* +5, reach 10 ft. *Hit:* 7 (1d8 + 3) Piercing damage."
bonus_actions:
  - name: Rampage (2/Day)
    desc: Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Bite attack.
```
