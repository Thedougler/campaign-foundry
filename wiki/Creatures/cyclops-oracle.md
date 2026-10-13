---
title: Cyclops Oracle
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Giant
size: Huge
habitat:
  - Coastal
  - Desert
  - Grassland
  - Hill
  - Mountain
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cyclops Oracle
size: Huge
type: giant
alignment: Chaotic Neutral
ac: 16
hp: 207
hit_dice: 18d12 + 90
modifier: 8
speed: 40 ft.
stats: [ 22, 11, 20, 16, 18, 10 ]
saves:
  - con: 9
  - wis: 8
skillsaves:
  - history: 11
  - perception: 12
senses: Truesight 30 ft., passive Perception 22
languages: Giant
cr: "10"
actions:
  - name: Multiattack
    desc: The cyclops makes three attacks, using Radiant Strike or Flash of Light in any combination.
  - name: Radiant Strike
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 22 (3d10 + 6) Radiant damage."
  - name: Flash of Light
    desc: "*Ranged Attack Roll:* +10, range 120 ft. *Hit:* 17 (2d10 + 6) Radiant damage, and the target has Disadvantage on attack rolls until the end of the cyclops's next turn."
  - name: Spellcasting
    desc: |-
      The cyclops casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 16):

      **2/day each:** *Arcane Eye*, *Detect Magic*, *Locate Object*

      **1/day:** *Legend Lore*
reactions:
  - name: Portent (Recharge 4–6)
    desc: "Trigger: The cyclops or an ally it can see makes a D20 Test. _Response:_ The cyclops rolls 1d20 and chooses whether to use that roll in place of the d20 rolled for the D20 Test."
```
