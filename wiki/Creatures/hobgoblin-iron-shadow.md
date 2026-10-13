---
title: Hobgoblin Iron Shadow
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Fey
size: Medium
habitat:
  - Forest
  - Grassland
  - Hill
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hobgoblin Iron Shadow
size: Medium
type: fey
subtype: goblinoid
alignment: Typically Lawful Neutral
ac: 15
ac_class: Unarmored Defense
hp: 32
hit_dice: 5d8 + 10
modifier: 3
speed: 40 ft.
stats: [ 14, 16, 15, 14, 15, 11 ]
skillsaves:
  - acrobatics: 5
  - athletics: 4
  - stealth: 5
gear:
  - dart
senses: darkvision 60 ft., passive Perception 12
languages: Common, Goblin
cr: "2"
traits:
  - name: Unarmored Defense
    desc: While the hobgoblin is wearing no armour and wielding no shield, its AC includes its Wisdom modifier.
actions:
  - name: Multiattack
    desc: |-
      The hobgoblin makes four attacks, each of which can be an Unarmed Strike or a Dart attack. It can also use

      Shadow Jaunt once, either before or after one of the attacks.
  - name: Unarmed Strike
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d4 + 3) bludgeoning damage."
  - name: Dart
    desc: "*Ranged Weapon Attack:* +5 to hit, range 20/60 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage."
  - name: Shadow Jaunt
    desc: The hobgoblin teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see. Both the space it leaves and its destination must be in dim light or darkness.
  - name: Spellcasting
    desc: |-
      The hobgoblin casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

      **At will:** *minor illusion*, *prestidigitation*

      **1/day each:** *charm person*, *disguise self*, *silent image*
```
