---
title: Giant Hyena
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Beast
size: Large
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
name: Giant Hyena
size: Large
type: beast
alignment: Unaligned
ac: 12
hp: 45
hit_dice: 6d10 + 12
modifier: 2
speed: 50 ft.
stats: [ 16, 14, 14, 2, 12, 7 ]
skillsaves:
  - perception: 3
senses: Darkvision 60 ft., passive Perception 13
cr: "1"
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Piercing damage."
bonus_actions:
  - name: Rampage (1/Day)
    desc: Immediately after dealing damage to a creature that was already Bloodied, the hyena can move up to half its Speed, and it makes one Bite attack.
```
