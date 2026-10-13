---
title: Crocodile
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Beast
size: Large
habitat:
  - Coastal
  - Swamp
  - Urban
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Crocodile
size: Large
type: beast
alignment: Unaligned
ac: 12
hp: 13
hit_dice: 2d10 + 2
modifier: 0
speed: 20 ft., swim 30 ft.
stats: [ 15, 10, 13, 2, 10, 5 ]
saves:
  - con: 3
skillsaves:
  - stealth: 2
senses: passive Perception 10
cr: 1/2
traits:
  - name: Hold Breath
    desc: The crocodile can hold its breath for 1 hour.
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 6 (1d8 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition."
```
