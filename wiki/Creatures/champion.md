---
title: Champion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat:
  - Desert
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Champion
size: Medium
type: humanoid
alignment: Any alignment
ac: 18
ac_class: plate
hp: 143
hit_dice: 22d8 + 44
modifier: 2
speed: 30 ft.
stats: [ 20, 15, 14, 10, 14, 12 ]
saves:
  - str: 9
  - con: 6
skillsaves:
  - athletics: 9
  - intimidation: 5
  - perception: 6
gear:
  - greatsword
  - shortbow
senses: passive Perception 16
languages: any one language (usually Common)
cr: "9"
traits:
  - name: Indomitable (2/Day)
    desc: The champion rerolls a failed saving throw.
actions:
  - name: Multiattack
    desc: The champion makes three Greatsword or Shortbow attacks.
  - name: Greatsword
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) slashing damage, plus 7 (2d6) slashing damage if the champion has more than half of its total hit points remaining."
  - name: Shortbow
    desc: "*Ranged Weapon Attack:* +6 to hit, range 80/320 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage, plus 7 (2d6) piercing damage if the champion has more than half of its total hit points remaining."
bonus_actions:
  - name: Second Wind (Recharges after a Short or Long Rest)
    desc: The champion regains 20 hit points.
```
