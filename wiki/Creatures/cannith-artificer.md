---
title: Cannith Artificer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cannith Artificer
size: Small or Medium
type: humanoid
subtype: human
alignment: Neutral
ac: 16
hp: 71
hit_dice: 11d8 + 22
modifier: 1
speed: 30 ft.
stats: [ 13, 13, 14, 18, 14, 11 ]
saves:
  - con: 4
  - int: 6
skillsaves:
  - arcana: 6
  - perception: 4
  - sleight of hand: 3
gear:
  - chain mail
  - mace
  - tinker's tools
senses: passive Perception 14
languages: Common plus two other languages
cr: "4"
actions:
  - name: Multiattack
    desc: The artificer makes two attacks, using Battering Mace or Artillery Strike in any combination.
  - name: Battering Mace
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 14 (3d6 + 4) Bludgeoning damage, and if the target is a Large or smaller creature, it has the Prone condition."
  - name: Artillery Strike
    desc: "*Ranged Attack Roll:* +6, range 120 ft. *Hit:* 22 (4d8 + 4) Force damage."
  - name: Spellcasting
    desc: |-
      The artificer casts one of the following spells, using its Tinker's Tools as an Arcane Focus and using Intelligence as the spellcasting ability (spell save DC 14):

      **At will:** *Burning Hands* (level 3 version), *Mending*, *Thunderwave* (level 3 version)

      **1/day each:** *Cure Wounds*, *Invisibility*
```
