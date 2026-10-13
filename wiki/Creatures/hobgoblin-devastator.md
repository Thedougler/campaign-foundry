---
title: Hobgoblin Devastator
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
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
name: Hobgoblin Devastator
size: Medium
type: fey
subtype: goblinoid
alignment: Typically Lawful Neutral
ac: 13
ac_class: studded leather
hp: 45
hit_dice: 7d8 + 14
modifier: 1
speed: 30 ft.
stats: [ 13, 12, 14, 16, 13, 11 ]
skillsaves:
  - arcana: 5
gear:
  - quarterstaff
senses: darkvision 60 ft., passive Perception 11
languages: Common, Goblin
cr: "4"
traits:
  - name: Army Arcana
    desc: When the hobgoblin casts a spell that causes damage or that forces other creatures to make a saving throw, it can choose itself and any number of allies to be immune to the damage caused by the spell and to succeed on the required saving throw.
actions:
  - name: Multiattack
    desc: The hobgoblin makes two Quarterstaff or Devastating Bolt attacks.
  - name: Quarterstaff
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d6 + 1) bludgeoning damage, or 5 (1d8 + 1) bludgeoning damage if used with two hands, plus 13 (3d8) force damage."
  - name: Devastating Bolt
    desc: "*Ranged Spell Attack:* +5 to hit, range 60 ft., one target. *Hit:* 21 (4d8 + 3) force damage, and the target is knocked prone."
  - name: Spellcasting
    desc: |-
      The hobgoblin casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *mage hand*, *prestidigitation*

      **2/day each:** *fireball*, *fly*, *fog cloud*, *gust of wind*, *lightning bolt*
```
