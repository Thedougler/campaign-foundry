---
title: Githzerai Monk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
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
name: Githzerai Monk
size: Medium
type: aberration
subtype: gith
alignment: Lawful Neutral
ac: 14
hp: 38
hit_dice: 7d8 + 7
modifier: 4
speed: 40 ft.
stats: [ 12, 15, 12, 13, 14, 10 ]
saves:
  - str: 3
  - dex: 4
  - int: 3
  - wis: 4
skillsaves:
  - insight: 4
  - perception: 4
senses: passive Perception 14
languages: Common, Gith
cr: "2"
actions:
  - name: Multiattack
    desc: The githzerai makes two Psi Strike attacks.
  - name: Psi Strike
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 6 (1d8 + 2) Bludgeoning damage plus 9 (2d8) Psychic damage."
  - name: Spellcasting
    desc: |-
      The githzerai casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability:

      **At will:** *Mage Hand* (the hand is Invisible)

      **1/day:** *See Invisibility*
bonus_actions:
  - name: Psi-Powered Leap (2/Day)
    desc: |
      The githzerai casts *Jump*, requiring no spell components and using the same spellcasting ability as Spellcasting.
reactions:
  - name: Psionic Defense (2/Day)
    desc: |
      The githzerai casts *Feather Fall* or *Shield* in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting.
```
