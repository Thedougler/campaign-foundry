---
title: Bloodfray Giant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bloodfray Giant
size: Huge
type: giant
alignment: Chaotic Evil
ac: 14
ac_class: natural armour
hp: 103
hit_dice: 9d12 + 45
modifier: -1
speed: 40 ft.
stats: [ 23, 9, 20, 7, 8, 9 ]
saves:
  - str: 9
  - con: 8
  - wis: 2
skillsaves:
  - athletics: 9
  - perception: 2
senses: passive Perception 12
languages: Giant
cr: "6"
actions:
  - name: Chain
    desc: "*Melee Weapon Attack:* +9 to hit, reach 20 ft., one target. *Hit:* 16 (3d6 + 6) bludgeoning damage. If the target is a creature, it is grappled (escape DC 17). Until the grapple ends, the target is restrained, and the giant can't use this attack on anyone else."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +9 to hit, range 60/240 ft., one target. *Hit:* 16 (3d6 + 6) bludgeoning damage."
reactions:
  - name: Furious Defense
    desc: After a creature the giant can see is dealt damage by a foe within 20 feet of the giant, the giant makes a chain attack against that foe.
```
