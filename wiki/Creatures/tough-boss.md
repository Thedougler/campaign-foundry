---
title: Tough Boss
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
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
name: Tough Boss
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 16
hp: 82
hit_dice: 11d8 + 33
modifier: 2
speed: 30 ft.
stats: [ 17, 14, 16, 11, 10, 11 ]
saves:
  - str: 5
  - con: 5
  - cha: 2
gear:
  - chain mail
  - heavy crossbow
  - warhammer
senses: passive Perception 10
languages: Common plus one other language
cr: "4"
traits:
  - name: Pack Tactics
    desc: The tough has Advantage on an attack roll against a creature if at least one of the tough's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The tough makes two attacks, using Warhammer or Heavy Crossbow in any combination.
  - name: Warhammer
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 12 (2d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, the tough pushes the target up to 10 feet straight away from itself."
  - name: Heavy Crossbow
    desc: "*Ranged Attack Roll:* +4, range 100/400 ft. *Hit:* 13 (2d10 + 2) Piercing damage."
```
