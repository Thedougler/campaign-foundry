---
title: Orzhov Giant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Giant
size: Large
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Orzhov Giant
size: Large
type: giant
alignment: Lawful Evil
ac: 18
ac_class: plate armour
hp: 84
hit_dice: 8d10 + 40
modifier: 1
speed: 40 ft.
stats: [ 23, 13, 21, 12, 13, 8 ]
saves:
  - dex: 4
  - con: 8
  - wis: 4
gear:
  - greataxe
senses: darkvision 60 ft., passive Perception 11
languages: Common, Giant
cr: "6"
traits:
  - name: Focus
    desc: As a bonus action, the giant can target a creature it can see within 30 feet of it and make that creature its focus. The target remains the giant's focus for 1 minute, or until either the target or the giant drops to 0 hit points. When the giant makes an attack roll against its focus, it adds a d4 to its attack roll. If the giant attacks a different target while it has a focus, it subtracts a d4 from its attack roll.
actions:
  - name: Multiattack
    desc: The giant makes two greataxe attacks.
  - name: Greataxe
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 25 (3d12 + 6) slashing damage. If the Orzhov giant scores a critical hit, it rolls the damage dice three times, instead of twice."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +9 to hit, range 60/240 ft., one target. *Hit:* 28 (4d10 + 6) bludgeoning damage."
```
