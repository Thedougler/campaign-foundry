---
title: Giff Shock Trooper
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giff Shock Trooper
size: Medium
type: humanoid
alignment: Any alignment
ac: 18
ac_class: plate
hp: 93
hit_dice: 11d8 + 44
modifier: 2
speed: 30 ft., swim 30 ft.
stats: [ 20, 14, 18, 11, 12, 13 ]
saves:
  - str: 8
  - con: 7
  - wis: 4
skillsaves:
  - athletics: 8
  - intimidation: 7
  - perception: 4
gear:
  - greatsword
  - musket
senses: passive Perception 14
languages: Common
cr: "6"
traits:
  - name: Firearms Knowledge
    desc: The giff's mastery of its weapons enables it to ignore the loading property of any firearm.
  - name: Headfirst Charge
    desc: If the giff moves at least 20 feet in a straight line and ends within 5 feet of a Large or smaller creature, that creature must succeed on a DC 16 Strength saving throw or take 7 (2d6) bludgeoning damage and be knocked prone.
  - name: Siege Monster
    desc: The giff deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The giff makes two Greatsword or Musket attacks.
  - name: Greatsword
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 15 (3d6 + 5) slashing damage."
  - name: Musket
    desc: "*Ranged Weapon Attack:* +5 to hit, range 40/120 ft., one target. *Hit:* 15 (2d12 + 2) piercing damage."
  - name: Thunder Bomb
    desc: The giff lights a grapefruit-sized bomb and throws it at a point up to 60 feet away, where it explodes. Each creature within a 10-foot-radius sphere centred on that point must make a DC 15 Dexterity saving throw, taking 18 (4d8) thunder damage on a failed save, or half as much damage on a successful one. After the giff throws the bomb, roll a d6; on a roll of 4 or lower, the giff has no more bombs to throw.
```
