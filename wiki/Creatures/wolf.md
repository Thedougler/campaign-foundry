---
title: Wolf
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Beast
size: Medium
habitat:
  - Forest
  - Grassland
  - Hill
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Wolf
size: Medium
type: beast
alignment: Unaligned
ac: 12
hp: 11
hit_dice: 2d8 + 2
modifier: 2
speed: 40 ft.
stats: [ 14, 15, 12, 3, 12, 6 ]
skillsaves:
  - perception: 5
  - stealth: 4
senses: Darkvision 60 ft., passive Perception 15
cr: 1/4
traits:
  - name: Pack Tactics
    desc: The wolf has Advantage on attack rolls against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Prone condition."
```
