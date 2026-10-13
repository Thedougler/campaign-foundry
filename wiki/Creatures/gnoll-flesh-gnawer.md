---
title: Gnoll Flesh Gnawer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Monstrosity
size: Medium
habitat:
  - Arctic
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
name: Gnoll Flesh Gnawer
size: Medium
type: monstrosity
alignment: Typically Chaotic Evil
ac: 14
ac_class: studded leather
hp: 22
hit_dice: 4d8 + 4
modifier: 2
speed: 30 ft.
stats: [ 12, 14, 12, 8, 10, 8 ]
saves:
  - dex: 4
gear:
  - shortsword
senses: darkvision 60 ft., passive Perception 10
languages: Gnoll
cr: "1"
actions:
  - name: Multiattack
    desc: The gnoll makes one Bite attack and two Shortsword attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage."
  - name: Sudden Rush
    desc: Until the end of the turn, the gnoll's speed increases by 60 feet and it doesn't provoke opportunity attacks.
bonus_actions:
  - name: Rampage
    desc: After the gnoll reduces a creature to 0 hit points with a melee attack on its turn, the gnoll moves up to half its speed and makes a Bite attack.
```
