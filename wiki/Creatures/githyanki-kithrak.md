---
title: Githyanki Kith'rak
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
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
name: Githyanki Kith'rak
size: Medium
type: humanoid
subtype: gith
alignment: Any alignment
ac: 18
ac_class: plate
hp: 180
hit_dice: 24d8 + 72
modifier: 3
speed: 30 ft.
stats: [ 18, 16, 17, 16, 15, 17 ]
saves:
  - con: 7
  - int: 7
  - wis: 6
skillsaves:
  - intimidation: 7
  - perception: 6
gear:
  - greatsword
senses: passive Perception 16
languages: Gith
cr: "12"
actions:
  - name: Multiattack
    desc: The githyanki makes three Greatsword attacks.
  - name: Greatsword
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage plus 17 (5d6) psychic damage."
  - name: Spellcasting (Psionics)
    desc: |-
      The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *mage hand* (the hand is invisible)

      **3/day each:** *blur*, *nondetection* (self only)

      **1/day each:** *plane shift*, *telekinesis*
bonus_actions:
  - name: Astral Step (Recharge 4–6)
    desc: The githyanki teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see.
  - name: Rally the Troops
    desc: The githyanki magically ends the charmed and frightened conditions on itself and each creature of its choice that it can see within 30 feet of it.
reactions:
  - name: Parry
    desc: The githyanki adds 4 to its AC against one melee attack that would hit it. To do so, the githyanki must see the attacker and be wielding a melee weapon.
```
