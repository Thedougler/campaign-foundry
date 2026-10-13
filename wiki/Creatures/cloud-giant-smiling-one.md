---
title: Cloud Giant Smiling One
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Giant
size: Huge
habitat:
  - Mountain
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cloud Giant Smiling One
size: Huge
type: giant
alignment: Typically Chaotic Neutral
ac: 15
ac_class: natural armour
hp: 250
hit_dice: 20d12 + 120
modifier: 1
speed: 40 ft., fly 40 ft. (hover)
stats: [ 26, 12, 22, 15, 16, 17 ]
saves:
  - con: 10
  - int: 6
  - cha: 7
skillsaves:
  - deception: 11
  - insight: 7
  - perception: 11
  - sleight of hand: 9
senses: passive Perception 21
languages: Common, Giant
cr: "11"
traits:
  - name: Control Weather (8th-level Spell)
    desc: The giant can cast the *control weather* spell, requiring no material components and using Charisma as the spellcasting ability.
actions:
  - name: Multiattack
    desc: The giant makes two Slam attacks or two Telekinetic Strike attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 21 (3d8 + 8) bludgeoning damage plus 5 (1d10) psychic damage."
  - name: Telekinetic Strike
    desc: "*Ranged Spell Attack:* +7 to hit, range 240 ft., one target. *Hit:* 25 (4d10 + 3) force damage."
  - name: Change Shape
    desc: The giant magically transforms to look and feel like a Beast or a Humanoid it has seen or to return to its true form. Any equipment the giant is wearing or carrying is absorbed by the new form. Its statistics, other than its size, don't change. It reverts to its true form if it dies.
  - name: Spellcasting
    desc: |-
      The giant casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 15):

      **At will:** *detect magic*, *fog cloud*, *light*, *minor illusion*

      **3/day each:** *invisibility*, *silent image*, *suggestion*, *tongues*

      **1/day each:** *gaseous form*, *major image*
bonus_actions:
  - name: Cloud Step (Recharge 4–6)
    desc: The giant teleports, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see.
```
