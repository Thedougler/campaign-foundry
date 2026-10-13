---
title: Fire Giant Dreadnought
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Giant
size: Huge
habitat:
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fire Giant Dreadnought
size: Huge
type: giant
alignment: Typically Lawful Evil
ac: 21
ac_class: plate, Dual Shields
hp: 187
hit_dice: 15d12 + 90
modifier: -1
speed: 30 ft.
stats: [ 27, 9, 23, 8, 10, 11 ]
saves:
  - dex: 4
  - con: 11
  - cha: 5
skillsaves:
  - athletics: 13
  - perception: 5
damage_immunities: fire
senses: passive Perception 15
languages: Giant
cr: "14"
traits:
  - name: Dual Shields
    desc: The giant carries two shields, which together give the giant +3 to its AC (accounted for above).
actions:
  - name: Multiattack
    desc: The giant makes two Fireshield or Rock attacks.
  - name: Fireshield
    desc: "*Melee Weapon Attack:* +13 to hit, reach 5 ft., one target. *Hit:* 22 (4d6 + 8) bludgeoning damage plus 7 (2d6) fire damage plus 7 (2d6) piercing damage."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +13 to hit, range 60/240 ft., one target. *Hit:* 30 (4d10 + 8) bludgeoning damage."
  - name: Shield Charge (Recharge 5–6)
    desc: The giant moves up to 30 feet in a straight line and can move through the space of any creature smaller than Huge. The first time it enters a creature's space during this move, that creature must succeed on a DC 21 Strength saving throw or take 36 (8d6 + 8) bludgeoning damage plus 14 (4d6) fire damage and be pushed up to 30 feet and knocked prone.
```
