---
title: Azer Pyromancer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Elemental
size: Medium
habitat:
  - Mountain
  - Planar (Fire)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Azer Pyromancer
size: Medium
type: elemental
alignment: Lawful Neutral
ac: 18
hp: 97
hit_dice: 13d8 + 39
modifier: 2
speed: 30 ft.
stats: [ 15, 14, 16, 12, 18, 13 ]
saves:
  - con: 6
  - wis: 7
skillsaves:
  - arcana: 4
  - perception: 7
damage_immunities: fire, poison
condition_immunities: poisoned
senses: passive Perception 17
languages: Primordial (Ignan)
cr: "6"
traits:
  - name: Fire Aura
    desc: At the end of each of the azer's turns, each creature of the azer's choice in a 5-foot Emanation originating from the azer takes 11 (2d10) Fire damage unless the azer has the Incapacitated condition.
  - name: Illumination
    desc: The azer sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.
actions:
  - name: Multiattack
    desc: The azer makes two Flame Burst attacks.
  - name: Flame Burst
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 120 ft. *Hit:* 15 (2d10 + 4) Fire damage."
  - name: Spellcasting
    desc: |-
      The azer casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 15):

      **At will:** *Elementalism*, *Mage Hand*

      **1/day:** *Fireball*
reactions:
  - name: Hellish Rebuke (2/Day)
    desc: |
      The azer casts *Hellish Rebuke* in response to that spell's trigger, using the same spellcasting ability as Spellcasting.
```
