---
title: Cambion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Fiend
size: Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cambion
size: Medium
type: fiend
alignment: Neutral Evil
ac: 19
hp: 105
hit_dice: 14d8 + 42
modifier: 4
speed: 30 ft., fly 60 ft.
stats: [ 18, 18, 16, 14, 12, 16 ]
saves:
  - str: 7
  - con: 6
  - int: 5
  - cha: 6
skillsaves:
  - deception: 6
  - perception: 4
  - stealth: 7
damage_resistances: cold, fire, lightning, poison
condition_immunities: poisoned
senses: Darkvision 120 ft., passive Perception 14
languages: Abyssal, Common, Infernal
cr: "5"
actions:
  - name: Multiattack
    desc: The cambion makes two attacks, using Claw or Fire Ray in any combination.
  - name: Claw
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 8 (1d8 + 4) Slashing damage plus 7 (2d6) Fire damage."
  - name: Fire Ray
    desc: "*Ranged Attack Roll:* +7, range 120 ft. *Hit:* 13 (3d6 + 3) Fire damage."
  - name: Spellcasting
    desc: |-
      The cambion casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14):

      **2/day each:** *Alter Self*, *Command* (level 3 version), *Detect Magic*

      **1/day each:** *Dominate Person* (level 8 version), *Plane Shift* (self only)
```
