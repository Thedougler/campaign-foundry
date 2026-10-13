---
title: Initiate of the Comet
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Initiate of the Comet
size: Medium
type: humanoid
subtype: warlock
alignment: Any alignment
ac: 12
hp: 75
hit_dice: 10d8 + 30
modifier: 2
speed: 30 ft.
stats: [ 12, 14, 16, 11, 13, 17 ]
saves:
  - wis: 3
  - cha: 5
skillsaves:
  - arcana: 2
senses: passive Perception 11
languages: Common plus any one language
cr: "4"
traits:
  - name: Magic Resistance
    desc: The initiate has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The initiate makes two Comet Strike attacks.
  - name: Comet Strike
    desc: "*Melee or Ranged Spell Attack:* +5 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 14 (2d10 + 3) force damage."
  - name: Spellcasting
    desc: |-
      The initiate casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *Mage Hand*, *Thaumaturgy*

      **1/day each:** *Dimension Door*, *Divination*, *Enthral*
reactions:
  - name: Moment of Foresight (1/Day)
    desc: When hit by an attack roll, the initiate can force the attacker to reroll it and use the new roll, possibly causing the attack to miss.
```
