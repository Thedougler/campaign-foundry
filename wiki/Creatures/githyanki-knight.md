---
title: Githyanki Knight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
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
name: Githyanki Knight
size: Medium
type: aberration
subtype: gith
alignment: Lawful Evil
ac: 18
hp: 117
hit_dice: 18d8 + 36
modifier: 5
speed: 30 ft.
stats: [ 16, 14, 15, 14, 14, 15 ]
saves:
  - con: 5
  - int: 5
  - wis: 5
gear:
  - plate armour
senses: passive Perception 12
languages: Common, Gith
cr: "8"
actions:
  - name: Multiattack
    desc: The githyanki makes three Silver Sword attacks. It can replace one attack with a use of Spellcasting to cast *Telekinesis* if available.
  - name: Silver Sword
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 10 (2d6 + 3) Slashing damage plus 14 (4d6) Psychic damage. Critical *Hit:* If the target is in an astral body (as with the *Astral Projection* spell), the githyanki can cut the silvery cord that tethers the target to its material body instead of dealing damage."
  - name: Spellcasting
    desc: |-
      The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *Mage Hand* (the hand is Invisible)

      **2/day each:** *Nondetection* (self only), *Tongues*

      **1/day each:** *Plane Shift*, *Telekinesis*
bonus_actions:
  - name: Misty Step (2/Day)
    desc: |
      The githyanki casts *Misty Step*, requiring no spell components and using the same spellcasting ability as Spellcasting.
```
