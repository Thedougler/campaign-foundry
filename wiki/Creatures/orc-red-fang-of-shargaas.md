---
title: Orc Red Fang of Shargaas
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
  - Mountain
  - Forest
  - Hill
  - Urban
sourcebooks:
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Orc Red Fang of Shargaas
size: Medium
type: humanoid
subtype: orc
alignment: Chaotic Evil
ac: 15
ac_class: studded leather
hp: 52
hit_dice: 8d8 + 16
modifier: 3
speed: 30 ft.
stats: [ 11, 16, 15, 9, 11, 9 ]
skillsaves:
  - intimidation: 1
  - perception: 2
  - stealth: 5
gear:
  - dart
  - scimitar
senses: darkvision 60 ft., passive Perception 12
languages: Common, Orc
cr: "3"
traits:
  - name: Cunning Action
    desc: On each of its turns, the orc can use a bonus action to take the Dash, Disengage, or Hide action.
  - name: Hand of Shargaas
    desc: The orc deals 2 extra dice of damage when it hits a target with a weapon attack (included in its attacks).
  - name: Shargaas's Sight
    desc: Magical darkness doesn't impede the orc's darkvision.
  - name: Slayer
    desc: In the first round of a combat, the orc has advantage on attack rolls against any creature that hasn't taken a turn yet. If the orc hits a creature that round who was surprised, the hit is automatically a critical hit.
actions:
  - name: Multiattack
    desc: The orc makes two scimitar or dart attacks.
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 13 (3d6 + 3) slashing damage."
  - name: Dart
    desc: "*Ranged Weapon Attack:* +5 to hit, range 20/60 ft., one target. *Hit:* 10 (3d4 + 3) piercing damage."
  - name: Veil of Shargaas (Recharges after a Short or Long Rest)
    desc: The orc casts *darkness* without any components. Wisdom is its spellcasting ability.
```
