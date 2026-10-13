---
title: Pech
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Elemental
size: Small
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Pech
size: Small
type: elemental
alignment: typically Neutral Good
ac: 17
ac_class: natural armour
hp: 82
hit_dice: 11d6 + 44
modifier: 0
speed: 30 ft., burrow 20 ft.
stats: [ 19, 11, 18, 11, 14, 10 ]
saves:
  - con: 6
  - wis: 4
skillsaves:
  - athletics: 6
  - perception: 4
  - survival: 4
condition_immunities: petrified
senses: darkvision 120 ft., tremorsense 120 ft., passive Perception 14
languages: Common, Terran
cr: "4"
traits:
  - name: Magic Resistance
    desc: The pech has advantage on saving throws against spells and other magical effects.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the pech has disadvantage on attack rolls.
actions:
  - name: Multiattack
    desc: The pech makes two Fortified Pickaxe attacks. If it hits a Large or smaller creature with both attacks, the target must succeed on a DC 14 Strength saving throw or have the prone condition.
  - name: Fortified Pickaxe
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) force damage. If the target is a Construct or an object, the attack is automatically a critical hit."
  - name: Stone Shape (3/Day)
    desc: The pech casts *Stone Shape*, requiring no spell components and using Wisdom as the spellcasting ability.
  - name: Communal Spellcasting (2/Day)
    desc: |
      The pech works with three or more pechs to cast spells, requiring no spell components and using Wisdom as the spellcasting ability (save DC 12). If at least three other pechs are within 30 feet of it, the pech can cast *Wall of Stone*. If at least seven other pechs are within 30 feet of it, it can cast *Greater Restoration*. Each other pech involved in casting the spell can't have the incapacitated condition and must have at least one use of Communal Spellcasting remaining, which it must immediately expend to participate (no action required).
```
