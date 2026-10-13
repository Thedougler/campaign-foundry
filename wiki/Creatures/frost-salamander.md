---
title: Frost Salamander
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Elemental
size: Huge
habitat:
  - Arctic
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Frost Salamander
size: Huge
type: elemental
alignment: Unaligned
ac: 17
ac_class: natural armour
hp: 168
hit_dice: 16d12 + 64
modifier: 1
speed: 60 ft., burrow 40 ft., climb 40 ft.
stats: [ 20, 12, 18, 7, 11, 7 ]
saves:
  - con: 8
  - wis: 4
skillsaves:
  - perception: 4
damage_vulnerabilities: fire
damage_immunities: cold
senses: darkvision 60 ft., tremorsense 60 ft., passive Perception 14
languages: Primordial
cr: "9"
traits:
  - name: Burning Fury
    desc: When the salamander takes fire damage, its Freezing Breath automatically recharges.
actions:
  - name: Multiattack
    desc: The salamander makes one Bite attack and four Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +9 to hit, reach 15 ft., one target. *Hit:* 9 (1d8 + 5) piercing damage plus 5 (1d10) cold damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 8 (1d6 + 5) piercing damage."
  - name: Freezing Breath (Recharge 6)
    desc: The salamander exhales chill wind in a 60-foot cone. Each creature in that area must make a DC 17 Constitution saving throw, taking 44 (8d10) cold damage on a failed save, or half as much damage on a successful one.
```
