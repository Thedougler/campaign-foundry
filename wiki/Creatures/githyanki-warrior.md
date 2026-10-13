---
title: Githyanki Warrior
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Aberration
size: Medium
habitat:
  - Planar (Astral)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githyanki Warrior
size: Medium
type: aberration
subtype: gith
alignment: Lawful Evil
ac: 17
hp: 49
hit_dice: 9d8 + 9
modifier: 4
speed: 30 ft.
stats: [ 15, 14, 12, 13, 13, 10 ]
saves:
  - con: 3
  - int: 3
  - wis: 3
gear:
  - half plate armour
senses: passive Perception 11
languages: Common, Gith
cr: "3"
actions:
  - name: Multiattack
    desc: The githyanki makes two Psi Blade attacks.
  - name: Psi Blade
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 9 (2d6 + 2) Slashing damage plus 7 (2d6) Psychic damage."
  - name: Spellcasting
    desc: |-
      The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability:

      **At will:** *Mage Hand* (the hand is Invisible)

      **2/day:** *Nondetection* (self only)
bonus_actions:
  - name: Misty Step (2/Day)
    desc: |
      The githyanki casts *Misty Step*, requiring no spell components and using the same spellcasting ability as Spellcasting.
```
