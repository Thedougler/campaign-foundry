---
title: Ferrumach Rilmani
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ferrumach Rilmani
size: Medium
type: celestial
alignment: typically Neutral
ac: 18
ac_class: natural armour
hp: 136
hit_dice: 16d8 + 64
modifier: 2
speed: 30 ft.
stats: [ 19, 14, 18, 15, 14, 10 ]
saves:
  - str: 8
  - con: 8
skillsaves:
  - athletics: 8
  - perception: 6
damage_resistances: psychic
senses: truesight 120 ft., passive Perception 16
languages: telepathy 120 ft., any two languages
cr: "9"
traits:
  - name: Bladed Edges
    desc: A creature takes 10 (3d6) slashing damage if it starts its turn grappling or being grappled by the ferrumach.
  - name: Skewering Charge
    desc: If the ferrumach moves at least 20 feet in a straight line toward a Large or smaller creature and ends within 5 feet of it, that creature must succeed on a DC 16 Strength saving throw or have the grappled condition (escape DC 18) and take 10 (3d6) piercing damage.
actions:
  - name: Multiattack
    desc: The ferrumach makes three Sharpened Limb or Bolt attacks.
  - name: Sharpened Limb
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 9 (1d10 + 4) slashing damage plus 11 (2d10) psychic damage."
  - name: Bolt
    desc: "*Ranged Weapon Attack:* +8 to hit, range 20/60 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage plus 11 (2d10) psychic damage."
  - name: Spellcasting
    desc: |-
      The ferrumach casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 14):

      **At will:** *detect magic*

      **1/day each:** *dispel magic*, *ice storm*
```
