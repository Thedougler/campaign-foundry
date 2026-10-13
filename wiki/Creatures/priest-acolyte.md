---
title: Priest Acolyte
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
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
name: Priest Acolyte
size: Small or Medium
type: humanoid
subtype: cleric
alignment: Neutral
ac: 13
hp: 11
hit_dice: 2d8 + 2
modifier: 0
speed: 30 ft.
stats: [ 14, 10, 12, 10, 14, 11 ]
skillsaves:
  - medicine: 4
  - religion: 2
gear:
  - chain shirt
  - holy symbol
  - mace
senses: passive Perception 12
languages: Common
cr: 1/4
actions:
  - name: Mace
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Bludgeoning damage plus 2 (1d4) Radiant damage."
  - name: Radiant Flame
    desc: "*Ranged Attack Roll:* +4, range 60 ft. *Hit:* 7 (2d6) Radiant damage."
  - name: Spellcasting
    desc: |-
      The priest casts one of the following spells, using Wisdom as the spellcasting ability:

      **At will:** *Light*, *Thaumaturgy*
bonus_actions:
  - name: Divine Aid (1/Day)
    desc: |
      The priest casts *Bless*, *Healing Word*, or *Sanctuary*, using the same spellcasting ability as Spellcasting.
```
