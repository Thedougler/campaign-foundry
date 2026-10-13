---
title: Wyvern
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Dragon
size: Large
habitat:
  - Hill
  - Mountain
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Wyvern
size: Large
type: dragon
alignment: Unaligned
ac: 14
hp: 127
hit_dice: 15d10 + 45
modifier: 0
speed: 30 ft., fly 80 ft.
stats: [ 19, 10, 16, 5, 12, 6 ]
skillsaves:
  - perception: 4
senses: Darkvision 120 ft., passive Perception 14
cr: "6"
actions:
  - name: Multiattack
    desc: The wyvern makes one Bite attack and one Sting attack.
  - name: Bite
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 13 (2d8 + 4) Piercing damage."
  - name: Sting
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 11 (2d6 + 4) Piercing damage plus 24 (7d6) Poison damage, and the target has the Poisoned condition until the start of the wyvern's next turn."
```
