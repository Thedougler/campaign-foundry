---
title: Tiger
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Beast
size: Large
habitat:
  - Forest
  - Grassland
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tiger
size: Large
type: beast
alignment: Unaligned
ac: 13
hp: 30
hit_dice: 4d10 + 8
modifier: 3
speed: 40 ft.
stats: [ 17, 16, 14, 3, 12, 8 ]
skillsaves:
  - perception: 3
  - stealth: 7
senses: Darkvision 60 ft., passive Perception 13
cr: "1"
actions:
  - name: Rend
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Prone condition."
bonus_actions:
  - name: Nimble Escape
    desc: The tiger takes the Disengage or Hide action.
```
