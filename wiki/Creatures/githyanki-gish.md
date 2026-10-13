---
title: Githyanki Gish
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Humanoid
size: Medium
habitat:
  - Desert
  - Mountain
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githyanki Gish
size: Medium
type: humanoid
subtype: gith, wizard
alignment: Any alignment
ac: 17
ac_class: half plate
hp: 130
hit_dice: 20d8 + 40
modifier: 2
speed: 30 ft.
stats: [ 17, 15, 14, 16, 15, 16 ]
saves:
  - con: 6
  - int: 7
  - wis: 6
skillsaves:
  - insight: 6
  - perception: 6
  - stealth: 6
gear:
  - longsword
senses: passive Perception 16
languages: Gith
cr: "10"
actions:
  - name: Multiattack
    desc: The githyanki makes three Longsword or Telekinetic Bolt attacks, or it makes one of those attacks and uses Spellcasting.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands, plus 22 (5d8) psychic damage."
  - name: Telekinetic Bolt
    desc: "*Ranged Spell Attack:* +7 to hit, range 120 ft., one target. *Hit:* 28 (8d6) force damage."
  - name: Spellcasting (Psionics)
    desc: |-
      The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *light*, *mage hand* (the hand is invisible), *message*

      **3/day each:** *fireball*, *invisibility*, *nondetection* (self only)

      **1/day each:** *dimension door*, *plane shift*, *telekinesis*
bonus_actions:
  - name: Astral Step (Recharge 4–6)
    desc: The githyanki teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see.
```
