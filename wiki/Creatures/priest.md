---
title: Priest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
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
name: Priest
size: Small or Medium
type: humanoid
subtype: cleric
alignment: Neutral
ac: 13
hp: 38
hit_dice: 7d8 + 7
modifier: 0
speed: 30 ft.
stats: [ 16, 10, 12, 13, 16, 13 ]
skillsaves:
  - medicine: 7
  - perception: 5
  - religion: 5
gear:
  - chain shirt
  - holy symbol
  - mace
senses: passive Perception 15
languages: Common plus one other language
cr: "2"
actions:
  - name: Multiattack
    desc: The priest makes two attacks, using Mace or Radiant Flame in any combination.
  - name: Mace
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage."
  - name: Radiant Flame
    desc: "*Ranged Attack Roll:* +5, range 60 ft. *Hit:* 11 (2d10) Radiant damage."
  - name: Spellcasting
    desc: |-
      The priest casts one of the following spells, using Wisdom as the spellcasting ability:

      **At will:** *Light*, *Thaumaturgy*

      **1/day:** *Spirit Guardians*
bonus_actions:
  - name: Divine Aid (3/Day)
    desc: |
      The priest casts *Bless*, *Dispel Magic*, *Healing Word*, or *Lesser Restoration*, using the same spellcasting ability as Spellcasting.
```
