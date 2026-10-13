---
title: Tanarukk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Fiend
size: Medium
habitat:
  - Hill
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tanarukk
size: Medium
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 14
ac_class: natural armour
hp: 95
hit_dice: 10d8 + 50
modifier: 1
speed: 30 ft.
stats: [ 18, 13, 20, 9, 9, 9 ]
skillsaves:
  - intimidation: 2
  - perception: 2
damage_resistances: fire, poison
gear:
  - greatsword
senses: darkvision 60 ft., passive Perception 12
languages: Abyssal, Common, plus any one language
cr: "5"
traits:
  - name: Magic Resistance
    desc: The tanarukk has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The tanarukk makes one Bite attack and one Greatsword attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage."
  - name: Greatsword
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage."
bonus_actions:
  - name: Aggressive
    desc: The tanarukk moves up to its speed toward an enemy that it can see.
reactions:
  - name: Unbridled Fury
    desc: In response to being hit by a melee attack, the tanarukk can make one Bite or Greatsword attack with advantage against the attacker.
```
