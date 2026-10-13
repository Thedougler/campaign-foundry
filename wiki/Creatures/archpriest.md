---
title: Archpriest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
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
name: Archpriest
size: Small or Medium
type: humanoid
subtype: cleric
alignment: Neutral
ac: 16
hp: 240
hit_dice: 32d8 + 96
modifier: 5
speed: 30 ft.
stats: [ 16, 12, 17, 14, 21, 14 ]
saves:
  - str: 7
  - con: 7
  - int: 6
  - wis: 9
skillsaves:
  - insight: 9
  - medicine: 9
  - perception: 9
  - religion: 10
gear:
  - chain mail
  - holy symbol
senses: passive Perception 19
languages: Common plus two other languages
cr: "12"
actions:
  - name: Multiattack
    desc: The archpriest makes three Radiant Burst attacks.
  - name: Radiant Burst
    desc: "*Melee or Ranged Attack Roll:* +9, reach 5 ft. or range 60 ft. *Hit:* 27 (4d10 + 5) Radiant damage."
  - name: Holy Word (Recharge 4–6)
    desc: "*Wisdom Saving Throw:* DC 17, each enemy in a 20-foot Emanation originating from the archpriest. *Failure:* 21 (6d6) Radiant damage, and the target has the Stunned condition until the end of the archpriest's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The archpriest casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 17):

      **At will:** *Light*, *Thaumaturgy*

      **1/day each:** *Flame Strike* (level 6 version), *Greater Restoration*, *Raise Dead*, *Zone of Truth*
bonus_actions:
  - name: Divine Aid (3/Day)
    desc: |
      The priest casts *Bless*, *Dispel Magic*, *Healing Word*, or *Lesser Restoration*, using the same spellcasting ability as Spellcasting.
```
