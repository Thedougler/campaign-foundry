---
title: Kobold Scale Sorcerer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Humanoid
size: Small
habitat:
  - Forest
  - Hill
  - Mountain
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kobold Scale Sorcerer
size: Small
type: humanoid
alignment: Any alignment
ac: 15
ac_class: natural armour
hp: 27
hit_dice: 5d6 + 10
modifier: 2
speed: 30 ft.
stats: [ 7, 15, 14, 10, 9, 14 ]
skillsaves:
  - arcana: 2
  - medicine: 1
gear:
  - dagger
senses: darkvision 60 ft., passive Perception 9
languages: Common, Draconic
cr: "1"
traits:
  - name: Pack Tactics
    desc: The kobold has advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally isn't incapacitated.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the kobold has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The kobold makes two Dagger or Chromatic Bolt attacks. It can replace one attack with a use of Spellcasting.
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."
  - name: Chromatic Bolt
    desc: "*Ranged Spell Attack:* +4 to hit, range 60 feet, one target. *Hit:* 9 (2d6 + 2) of a type of the kobold's choice: acid, cold, fire, lightning, poison, or thunder."
  - name: Spellcasting
    desc: |-
      The kobold casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 12):

      **At will:** *mage hand*, *prestidigitation*

      **2/day each:** *charm person*, *fog cloud*, *levitate*
```
