---
title: Githzerai Zerth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
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
name: Githzerai Zerth
size: Medium
type: aberration
subtype: gith
alignment: Lawful Neutral
ac: 17
hp: 84
hit_dice: 13d8 + 26
modifier: 7
speed: 40 ft.
stats: [ 13, 18, 15, 16, 17, 12 ]
saves:
  - str: 4
  - dex: 7
  - int: 6
  - wis: 6
skillsaves:
  - arcana: 6
  - insight: 6
  - perception: 6
senses: passive Perception 16
languages: Common, Gith
cr: "6"
actions:
  - name: Multiattack
    desc: The githzerai makes two Psi Strike attacks.
  - name: Psi Strike
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 11 (2d6 + 4) Bludgeoning damage plus 13 (3d8) Psychic damage."
  - name: Spellcasting
    desc: |-
      The githzerai casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 14):

      **At will:** *Mage Hand* (the hand is Invisible)

      **1/day each:** *Phantasmal Killer* (level 6 version), *Plane Shift*, *See Invisibility*
bonus_actions:
  - name: Psi-Powered Leap (2/Day)
    desc: |
      The githzerai casts *Jump*, requiring no spell components and using the same spellcasting ability as Spellcasting.
reactions:
  - name: Psionic Defense (2/Day)
    desc: |
      The githzerai casts *Feather Fall* or *Shield* in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting.
```
