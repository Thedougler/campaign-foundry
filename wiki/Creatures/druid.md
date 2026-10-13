---
title: Druid
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
name: Druid
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 13
hp: 44
hit_dice: 8d8 + 8
modifier: 1
speed: 30 ft.
stats: [ 10, 12, 13, 12, 16, 11 ]
skillsaves:
  - medicine: 5
  - nature: 3
  - perception: 5
gear:
  - studded leather armour
senses: passive Perception 15
languages: Common, Druidic, Sylvan
cr: "2"
actions:
  - name: Multiattack
    desc: The druid makes two attacks, using Vine Staff or Verdant Wisp in any combination.
  - name: Vine Staff
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Bludgeoning damage plus 2 (1d4) Poison damage."
  - name: Verdant Wisp
    desc: "*Ranged Attack Roll:* +5, range 90 ft. *Hit:* 10 (3d6) Radiant damage."
  - name: Spellcasting
    desc: |-
      The druid casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *Druidcraft*, *Speak with Animals*

      **2/day each:** *Entangle*, *Thunderwave*

      **1/day each:** *Animal Messenger*, *Longstrider*, *Moonbeam*
```
