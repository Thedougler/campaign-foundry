---
title: Cloud Giant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Giant
size: Huge
habitat:
  - Mountain
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cloud Giant
size: Huge
type: giant
alignment: Neutral
ac: 14
hp: 200
hit_dice: 16d12 + 96
modifier: 4
speed: 40 ft., fly 20 ft. (hover)
stats: [ 27, 10, 22, 12, 16, 16 ]
saves:
  - con: 10
  - wis: 7
skillsaves:
  - insight: 7
  - perception: 11
senses: passive Perception 21
languages: Common, Giant
cr: "9"
actions:
  - name: Multiattack
    desc: The giant makes two attacks, using Thunderous Mace or Thundercloud in any combination. It can replace one attack with a use of Spellcasting to cast *Fog Cloud*.
  - name: Thunderous Mace
    desc: "*Melee Attack Roll:* +12, reach 10 ft. *Hit:* 21 (3d8 + 8) Bludgeoning damage plus 7 (2d6) Thunder damage."
  - name: Thundercloud
    desc: "*Ranged Attack Roll:* +12, range 240 ft. *Hit:* 18 (3d6 + 8) Thunder damage, and the target has the Incapacitated condition until the end of its next turn."
  - name: Spellcasting
    desc: |-
      The giant casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):

      **At will:** *Detect Magic*, *Fog Cloud*, *Light*

      **1/day each:** *Control Weather*, *Gaseous Form*, *Telekinesis*
bonus_actions:
  - name: Misty Step
    desc: |
      The giant casts the *Misty Step* spell, using the same spellcasting ability as Spellcasting.
```
