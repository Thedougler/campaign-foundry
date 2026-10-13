---
title: Tyrannosaurus Rex
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Beast
size: Huge
habitat:
  - Grassland
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tyrannosaurus Rex
size: Huge
type: beast
subtype: dinosaur
alignment: Unaligned
ac: 13
hp: 136
hit_dice: 13d12 + 52
modifier: 3
speed: 50 ft.
stats: [ 25, 10, 19, 2, 12, 9 ]
saves:
  - str: 10
  - wis: 4
skillsaves:
  - perception: 4
senses: passive Perception 14
cr: "8"
actions:
  - name: Multiattack
    desc: The tyrannosaurus makes one Bite attack and one Tail attack.
  - name: Bite
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 33 (4d12 + 7) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17). While Grappled, the target has the Restrained condition and can't be targeted by the tyrannosaurus's Tail."
  - name: Tail
    desc: "*Melee Attack Roll:* +10, reach 15 ft. *Hit:* 25 (4d8 + 7) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition."
```
