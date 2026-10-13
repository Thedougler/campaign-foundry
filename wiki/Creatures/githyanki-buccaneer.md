---
title: Githyanki Buccaneer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githyanki Buccaneer
size: Medium
type: humanoid
subtype: gith
alignment: Any alignment
ac: 16
ac_class: breastplate
hp: 58
hit_dice: 9d8 + 18
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 14, 16, 13, 13 ]
saves:
  - con: 4
  - int: 5
  - wis: 3
skillsaves:
  - athletics: 5
  - deception: 3
  - perception: 3
  - survival: 3
gear:
  - greatsword
senses: passive Perception 13
languages: Common, Gith
cr: "3"
actions:
  - name: Multiattack
    desc: The githyanki makes two Greatsword or Telekinetic Bolt attacks.
  - name: Greatsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) slashing damage plus 3 (1d6) psychic damage."
  - name: Telekinetic Bolt
    desc: "*Ranged Spell Attack:* +5 to hit, range 60 ft., one target. *Hit:* 13 (3d6 + 3) force damage."
  - name: Spellcasting (Psionics)
    desc: |-
      The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *light*, *mage hand* (the hand is invisible)

      **1/day each:** *plane shift*, *telekinesis*
bonus_actions:
  - name: Astral Step (Recharge 4–6)
    desc: The githyanki teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see.
```
