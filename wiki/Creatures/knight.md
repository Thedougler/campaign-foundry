---
title: Knight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Knight
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 18
hp: 52
hit_dice: 8d8 + 16
modifier: 0
speed: 30 ft.
stats: [ 16, 11, 14, 11, 11, 15 ]
saves:
  - con: 4
  - wis: 2
condition_immunities: frightened
gear:
  - greatsword
  - heavy crossbow
  - plate armour
senses: passive Perception 10
languages: Common plus one other language
cr: "3"
actions:
  - name: Multiattack
    desc: The knight makes two attacks, using Greatsword or Heavy Crossbow in any combination.
  - name: Greatsword
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Slashing damage plus 4 (1d8) Radiant damage."
  - name: Heavy Crossbow
    desc: "*Ranged Attack Roll:* +2, range 100/400 ft. *Hit:* 11 (2d10) Piercing damage plus 4 (1d8) Radiant damage."
reactions:
  - name: Parry
    desc: "Trigger: The knight is hit by a melee attack roll while holding a weapon. _Response:_ The knight adds 2 to its AC against that attack, possibly causing it to miss."
```
