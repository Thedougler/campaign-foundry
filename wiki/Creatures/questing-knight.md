---
title: Questing Knight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Questing Knight
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 18
hp: 202
hit_dice: 27d8 + 81
modifier: 7
speed: 30 ft.
stats: [ 20, 16, 16, 11, 12, 18 ]
saves:
  - str: 9
  - con: 7
  - wis: 5
  - cha: 8
skillsaves:
  - athletics: 9
  - perception: 5
  - persuasion: 8
condition_immunities: charmed, frightened
gear:
  - greatsword
  - longbow
  - plate armour
senses: passive Perception 15
languages: Common plus one other language
cr: "12"
traits:
  - name: Aura of Bravery
    desc: Creatures of the knight's choice in a 30-foot Emanation originating from it have Immunity to the Charmed and Frightened conditions while there.
actions:
  - name: Multiattack
    desc: The knight makes three attacks, using Greatsword or Longbow in any combination.
  - name: Greatsword
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 12 (2d6 + 5) Slashing damage plus 22 (5d8) Radiant damage."
  - name: Longbow
    desc: "*Ranged Attack Roll:* +7, range 150/600 ft. *Hit:* 12 (2d8 + 3) Piercing damage plus 22 (5d8) Radiant damage."
  - name: Spellcasting
    desc: |-
      The knight casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 16):

      **1/day each:** *Daylight*, *Dispel Evil and Good*, *Greater Restoration*, *Phantom Steed*
```
