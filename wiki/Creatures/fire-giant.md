---
title: Fire Giant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Giant
size: Huge
habitat:
  - Mountain
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fire Giant
size: Huge
type: giant
alignment: Lawful Evil
ac: 18
hp: 162
hit_dice: 13d12 + 78
modifier: 3
speed: 30 ft.
stats: [ 25, 9, 23, 10, 14, 13 ]
saves:
  - dex: 3
  - con: 10
  - cha: 5
skillsaves:
  - athletics: 11
  - perception: 6
damage_immunities: fire
senses: passive Perception 16
languages: Giant
cr: "9"
actions:
  - name: Multiattack
    desc: The giant makes two attacks, using Flame Sword or Hammer Throw in any combination.
  - name: Flame Sword
    desc: "*Melee Attack Roll:* +11, reach 10 ft. *Hit:* 21 (4d6 + 7) Slashing damage plus 10 (3d6) Fire damage."
  - name: Hammer Throw
    desc: "*Ranged Attack Roll:* +11, range 60/240 ft. *Hit:* 23 (3d10 + 7) Bludgeoning damage plus 4 (1d8) Fire damage, and the target is pushed up to 15 feet straight away from the giant and has Disadvantage on the next attack roll it makes before the end of its next turn."
```
