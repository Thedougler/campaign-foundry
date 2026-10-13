---
title: Flind
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Fiend
size: Medium
habitat:
  - Coastal
  - Forest
  - Grassland
  - Hill
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Flind
size: Medium
type: fiend
subtype: gnoll
alignment: Typically Chaotic Evil
ac: 16
ac_class: breastplate
hp: 127
hit_dice: 15d8 + 60
modifier: 2
speed: 30 ft.
stats: [ 20, 14, 19, 11, 13, 12 ]
saves:
  - con: 8
  - wis: 5
skillsaves:
  - intimidation: 5
  - perception: 5
gear:
  - longbow
senses: darkvision 60 ft., passive Perception 15
languages: Gnoll, Abyssal
cr: "9"
traits:
  - name: Aura of Blood Thirst
    desc: If the flind isn't incapacitated, any creature with the Rampage trait can make a Bite attack as a bonus action while within 10 feet of the flind.
actions:
  - name: Multiattack
    desc: The flind makes one Flail of Chaos attack, one Flail of Pain attack, and one Flail of Paralysis attack, or it makes three Longbow attacks.
  - name: Flail of Chaos
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 10 (1d10 + 5) bludgeoning damage, and the target must make a DC 16 Wisdom saving throw. On a failed save, the target must use its reaction, if available, to make one melee attack against a random creature, other than the flind, within its reach. If there's no creature within reach, the target instead moves half its speed in a random direction."
  - name: Flail of Pain
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 10 (1d10 + 5) bludgeoning damage plus 16 (3d10) psychic damage."
  - name: Flail of Paralysis
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 10 (1d10 + 5) bludgeoning damage, and the target must succeed on a DC 16 Constitution saving throw or be paralysed until the end of its next turn."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +6 to hit, range 150/600 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage."
```
