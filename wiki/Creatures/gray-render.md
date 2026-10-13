---
title: Gray Render
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Monstrosity
size: Large
habitat:
  - Forest
  - Hill
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gray Render
size: Large
type: monstrosity
alignment: Typically Chaotic Neutral
ac: 19
ac_class: natural armour
hp: 189
hit_dice: 18d10 + 90
modifier: 1
speed: 30 ft.
stats: [ 19, 13, 20, 3, 6, 8 ]
saves:
  - str: 8
  - con: 9
skillsaves:
  - perception: 2
senses: darkvision 60 ft., passive Perception 12
cr: "12"
actions:
  - name: Multiattack
    desc: The gray render makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 17 (2d12 + 4) piercing damage. If the target is Medium or smaller, the target must succeed on a DC 16 Strength saving throw or be knocked prone."
  - name: Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 13 (2d8 + 4) slashing damage, plus 10 (3d6) bludgeoning damage if the target is prone."
reactions:
  - name: Bloody Rampage
    desc: When the gray render takes damage, it makes one Claw attack against a random creature within its reach, other than its master.
```
