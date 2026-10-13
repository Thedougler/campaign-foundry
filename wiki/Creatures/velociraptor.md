---
title: Velociraptor
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Beast
size: Tiny
habitat:
  - Forest
  - Grassland
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Velociraptor
size: Tiny
type: beast
subtype: dinosaur
alignment: Unaligned
ac: 13
ac_class: natural armour
hp: 10
hit_dice: 3d4 + 3
modifier: 2
speed: 30 ft.
stats: [ 6, 14, 13, 4, 12, 6 ]
skillsaves:
  - perception: 3
senses: passive Perception 13
cr: 1/4
traits:
  - name: Pack Tactics
    desc: The velociraptor has advantage on an attack roll against a creature if at least one of the velociraptor's allies is within 5 feet of the creature and the ally isn't incapacitated.
actions:
  - name: Multiattack
    desc: The velociraptor makes one Bite attack and one Claw attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one creature. *Hit:* 5 (1d6 + 2) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) slashing damage."
```
