---
title: Hadozee Explorer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hadozee Explorer
size: Medium
type: humanoid
alignment: Any alignment
ac: 15
ac_class: studded leather
hp: 49
hit_dice: 9d8 + 9
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 11, 17, 13, 13, 17, 14 ]
saves:
  - con: 3
  - wis: 5
skillsaves:
  - athletics: 2
  - perception: 5
  - stealth: 5
  - survival: 5
gear:
  - musket
  - shortsword
senses: passive Perception 15
languages: Common, Hadozee
cr: "2"
traits:
  - name: Glide
    desc: If it isn't incapacitated or wearing heavy armour, the hadozee can extend its skin membranes to move up to 5 feet horizontally for every 1 foot it descends in the air.
actions:
  - name: Multiattack
    desc: The hadozee makes two Shortsword attacks.
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
  - name: Musket
    desc: "*Ranged Weapon Attack:* +5 to hit, range 40/120 ft., one target. *Hit:* 16 (2d12 + 3) piercing damage."
bonus_actions:
  - name: Nimble Escape
    desc: The hadozee takes the Disengage or Hide action.
reactions:
  - name: Safe Descent
    desc: When it would take damage from a fall, the hadozee extends its skin membranes to reduce the fall's damage to 0, provided it isn't wearing heavy armour.
```
