---
title: Inquisitor of the Sword
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Inquisitor of the Sword
size: Small or Medium
type: humanoid
alignment: Lawful Neutral
ac: 16
hp: 120
hit_dice: 16d8 + 48
modifier: 2
speed: 30 ft.
stats: [ 12, 14, 17, 15, 18, 16 ]
saves:
  - int: 5
  - wis: 7
  - cha: 6
skillsaves:
  - acrobatics: 5
  - insight: 7
  - perception: 7
condition_immunities: charmed, frightened
gear:
  - breastplate
  - silvered longsword
senses: Truesight 30 ft., passive Perception 17
languages: Common plus two other languages
cr: "8"
traits:
  - name: Metabolic Control
    desc: At the start of each of its turns, if the inquisitor has at least 1 Hit Point, it regains 10 Hit Points and can end one condition on itself.
actions:
  - name: Multiattack
    desc: The inquisitor makes three Silvered Longsword attacks.
  - name: Silvered Longsword
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 13 (2d8 + 4) Slashing damage plus 4 (1d8) Psychic damage. Critical *Hit:* If the target is a shape-shifted creature, it takes an additional 4 (1d8) Slashing damage. *Hit or Miss:* The inquisitor can teleport up to 60 feet to an unoccupied space it can see."
  - name: Spellcasting
    desc: |-
      The inquisitor casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 15):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Dispel Magic*, *Mage Hand* (the hand is Invisible), *Sending*

      **1/day each:** *Dimension Door*, *Fly*, *Greater Invisibility*
```
