---
title: Berserker Commander
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
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
name: Berserker Commander
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 16
hp: 136
hit_dice: 16d8 + 64
modifier: 5
speed: 40 ft.
stats: [ 19, 14, 19, 10, 14, 9 ]
saves:
  - str: 7
  - con: 7
skillsaves:
  - athletics: 7
  - perception: 5
condition_immunities: charmed, frightened
gear:
  - greataxe
  - six javelins
senses: passive Perception 15
languages: Common
cr: "8"
traits:
  - name: Bloodied Frenzy
    desc: While Bloodied, the berserker has Advantage on attack rolls and saving throws.
actions:
  - name: Multiattack
    desc: The berserker makes three attacks, using Greataxe or Javelin in any combination.
  - name: Greataxe
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 10 (1d12 + 4) Slashing damage, plus 10 (3d6) Thunder damage to the target or another creature within 5 feet of the target."
  - name: Javelin
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 30/120 ft. *Hit:* 18 (4d6 + 4) Piercing damage, and the target's Speed decreases by 5 feet until the start of the berserker's next turn."
bonus_actions:
  - name: Frenzied Rush
    desc: Each ally within 30 feet of the berserker can take a Reaction to move up to half the ally's Speed without provoking Opportunity Attacks. The berserker can also move up to half its Speed without provoking Opportunity Attacks.
```
