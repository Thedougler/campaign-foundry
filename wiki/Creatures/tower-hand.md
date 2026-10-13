---
title: Tower Hand
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tower Hand
size: Medium
type: humanoid
alignment: Any alignment
ac: 14
ac_class: Unarmored Defense
hp: 22
hit_dice: 4d8 + 4
modifier: 2
speed: 40 ft.
stats: [ 10, 14, 12, 12, 14, 9 ]
skillsaves:
  - insight: 4
gear:
  - dart
senses: passive Perception 12
languages: Common
cr: 1/2
traits:
  - name: Unarmored Defense
    desc: While the tower hand is wearing no armour and wielding no shield, its AC includes its Wisdom modifier.
actions:
  - name: Multiattack
    desc: The tower hand makes two Unarmed Strike attacks, two Dart attacks, or one of each.
  - name: Unarmed Strike
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) bludgeoning damage."
  - name: Dart
    desc: "*Ranged Weapon Attack:* +4 to hit, range 20/60 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."
reactions:
  - name: Deflect Missile
    desc: In response to being hit by a ranged weapon attack, the tower hand deflects the missile. The damage it takes from the attack is reduced by 7 (1d10 + 2).
```
