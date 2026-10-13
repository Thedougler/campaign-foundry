---
title: Derro Savant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Aberration
size: Small
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Derro Savant
size: Small
type: aberration
subtype: sorcerer
alignment: Typically Chaotic Evil
ac: 13
ac_class: leather armour
hp: 36
hit_dice: 8d6 + 8
modifier: 2
speed: 30 ft.
stats: [ 9, 14, 12, 11, 5, 14 ]
skillsaves:
  - stealth: 4
gear:
  - quarterstaff
senses: darkvision 120 ft., passive Perception 7
languages: Dwarvish, Undercommon
cr: "3"
traits:
  - name: Magic Resistance
    desc: The derro has advantage on saving throws against spells and other magical effects.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the derro has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Quarterstaff
    desc: "*Melee Weapon Attack:* +1 to hit, reach 5 ft., one target. *Hit:* 2 (1d6 - 1) bludgeoning damage."
  - name: Chromatic Beam
    desc: The derro launches a brilliant beam of magical energy in a 5-foot-wide line that is 60 feet long. Each creature in the line must make a DC 12 Dexterity saving throw, taking 21 (6d6) radiant damage on a failed save, or half as much damage on a successful one.
  - name: Spellcasting
    desc: |-
      The derro casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 12):

      **At will:** *mage hand*, *message*, *prestidigitation*

      **1/day each:** *invisibility*, *sleep*, *spider climb*
```
