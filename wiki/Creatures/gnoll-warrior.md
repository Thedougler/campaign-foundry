---
title: Gnoll Warrior
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
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
name: Gnoll Warrior
size: Medium
type: fiend
alignment: Chaotic Evil
ac: 15
hp: 27
hit_dice: 6d8
modifier: 1
speed: 30 ft.
stats: [ 14, 12, 11, 6, 10, 7 ]
senses: Darkvision 60 ft., passive Perception 10
languages: Gnoll
cr: 1/2
actions:
  - name: Rend
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Piercing damage."
  - name: Bone Bow
    desc: "*Ranged Attack Roll:* +3, range 150/600 ft. *Hit:* 6 (1d10 + 1) Piercing damage."
bonus_actions:
  - name: Rampage (1/Day)
    desc: Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Rend attack.
```
