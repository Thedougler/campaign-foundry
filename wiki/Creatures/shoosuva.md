---
title: Shoosuva
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Fiend
size: Large
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
name: Shoosuva
size: Large
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 14
ac_class: natural armour
hp: 136
hit_dice: 16d10 + 48
modifier: 1
speed: 40 ft.
stats: [ 18, 13, 17, 7, 14, 9 ]
saves:
  - dex: 4
  - con: 6
  - wis: 5
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: charmed, frightened, poisoned
senses: darkvision 60 ft., passive Perception 12
languages: Abyssal, Gnoll, telepathy 120 ft.
cr: "8"
actions:
  - name: Multiattack
    desc: The shoosuva makes one Bite attack and one Tail Stinger attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 26 (4d10 + 4) piercing damage."
  - name: Tail Stinger
    desc: "*Melee Weapon Attack:* +7 to hit, reach 15 ft., one creature. *Hit:* 13 (2d8 + 4) piercing damage, and the target must succeed on a DC 14 Constitution saving throw or become poisoned. While poisoned in this way, the target is also paralysed. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
bonus_actions:
  - name: Rampage
    desc: When it reduces a creature to 0 hit points with a melee attack on its turn, the shoosuva can move up to half its speed and make one Bite attack.
```
