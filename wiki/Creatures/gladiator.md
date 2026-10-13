---
title: Gladiator
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
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
name: Gladiator
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 16
hp: 112
hit_dice: 15d8 + 45
modifier: 5
speed: 30 ft.
stats: [ 18, 15, 16, 10, 12, 15 ]
saves:
  - str: 7
  - dex: 5
  - con: 6
  - wis: 4
skillsaves:
  - athletics: 10
  - performance: 5
gear:
  - shield
  - three spears
  - studded leather armour
senses: passive Perception 11
languages: Common
cr: "5"
actions:
  - name: Multiattack
    desc: The gladiator makes three Spear attacks. It can replace one attack with a use of Shield Bash.
  - name: Spear
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 20/60 ft. *Hit:* 11 (2d6 + 4) Piercing damage."
  - name: Shield Bash
    desc: "*Strength Saving Throw:* DC 15, one creature within 5 feet that the gladiator can see. *Failure:* 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition."
reactions:
  - name: Parry
    desc: "Trigger: The gladiator is hit by a melee attack roll while holding a weapon. _Response:_ The gladiator adds 3 to its AC against that attack, possibly causing it to miss."
```
