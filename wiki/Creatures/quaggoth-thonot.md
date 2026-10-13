---
title: Quaggoth Thonot
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Quaggoth Thonot
size: Medium
type: monstrosity
alignment: Chaotic Neutral
ac: 15
hp: 67
hit_dice: 9d8 + 27
modifier: 1
speed: 30 ft., climb 30 ft.
stats: [ 17, 12, 16, 6, 14, 7 ]
skillsaves:
  - athletics: 5
damage_immunities: poison
condition_immunities: poisoned
senses: Darkvision 120 ft., passive Perception 12
languages: Undercommon
cr: "3"
traits:
  - name: Bloodied Fury
    desc: While Bloodied, the quaggoth has Advantage on attack rolls.
actions:
  - name: Multiattack
    desc: The quaggoth makes two Claw attacks.
  - name: Claw
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Slashing damage plus 5 (2d4) Psychic damage."
  - name: Spellcasting
    desc: |-
      The quaggoth casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 12):

      **At will:** *Mage Hand* (the hand is Invisible), *Minor Illusion*

      **2/day:** *Mind Spike*
reactions:
  - name: Psionic Defense (3/Day)
    desc: |
      The quaggoth casts *Feather Fall* or *Shield* in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting.
```
