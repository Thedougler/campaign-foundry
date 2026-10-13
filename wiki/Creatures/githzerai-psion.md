---
title: Githzerai Psion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Aberration
size: Medium
habitat:
  - Planar (Limbo)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githzerai Psion
size: Medium
type: aberration
subtype: gith
alignment: Lawful Neutral
ac: 18
hp: 169
hit_dice: 26d8 + 52
modifier: 8
speed: 40 ft., fly 40 ft. (hover)
stats: [ 12, 18, 15, 19, 18, 14 ]
saves:
  - str: 5
  - dex: 8
  - int: 8
  - wis: 8
skillsaves:
  - arcana: 8
  - insight: 8
  - perception: 8
senses: passive Perception 18
languages: Common, Gith
cr: "12"
actions:
  - name: Multiattack
    desc: The githzerai makes three Psychic Warp attacks.
  - name: Psychic Warp
    desc: "*Melee or Ranged Attack Roll:* +8, reach 5 ft. or range 120 ft. *Hit:* 26 (4d10 + 4) Psychic damage, and the target has the githzerai's choice of (A) the Charmed condition until the start of the githzerai's next turn or (B) the Prone condition, provided the target is a Large or smaller creature."
  - name: Spellcasting
    desc: |-
      The githzerai casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *Mage Hand* (the hand is Invisible)

      **1/day each:** *Plane Shift*, *See Invisibility*
reactions:
  - name: Psionic Defense
    desc: |
      The githzerai casts *Feather Fall* or *Shield* in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting.
```
