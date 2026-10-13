---
title: Frost Giant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Giant
size: Huge
habitat:
  - Arctic
  - Mountain
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Frost Giant
size: Huge
type: giant
alignment: Neutral Evil
ac: 15
hp: 149
hit_dice: 13d12 + 65
modifier: 2
speed: 40 ft.
stats: [ 23, 9, 21, 9, 10, 12 ]
saves:
  - con: 8
  - wis: 3
  - cha: 4
skillsaves:
  - athletics: 9
  - perception: 3
damage_immunities: cold
senses: passive Perception 13
languages: Giant
cr: "8"
actions:
  - name: Multiattack
    desc: The giant makes two attacks, using Frost Axe or Great Bow in any combination.
  - name: Frost Axe
    desc: "*Melee Attack Roll:* +9, reach 10 ft. *Hit:* 19 (2d12 + 6) Slashing damage plus 9 (2d8) Cold damage."
  - name: Great Bow
    desc: "*Ranged Attack Roll:* +9, range 150/600 ft. *Hit:* 17 (2d10 + 6) Piercing damage plus 7 (2d6) Cold damage, and the target's Speed decreases by 10 feet until the end of its next turn."
bonus_actions:
  - name: War Cry (Recharge 5–6)
    desc: The giant or one creature of its choice that can see or hear it gains 16 (2d10 + 5) Temporary Hit Points and has Advantage on attack rolls until the start of the giant's next turn.
```
