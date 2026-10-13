---
title: Hadozee Warrior
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hadozee Warrior
size: Medium
type: humanoid
alignment: Any alignment
ac: 16
ac_class: breastplate
hp: 16
hit_dice: 3d8 + 3
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 11, 16, 13, 10, 13, 12 ]
saves:
  - dex: 5
  - con: 3
skillsaves:
  - perception: 3
  - stealth: 5
  - survival: 5
gear:
  - light crossbow
  - shortsword
senses: passive Perception 13
languages: Common, Hadozee
cr: 1/2
traits:
  - name: Glide
    desc: If it isn't incapacitated or wearing heavy armour, the hadozee can extend its skin membranes to move up to 5 feet horizontally for every 1 foot it descends in the air.
actions:
  - name: Multiattack
    desc: The hadozee makes two Shortsword attacks.
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
  - name: Light Crossbow
    desc: "*Ranged Weapon Attack:* +5 to hit, range 80/320 ft., one target. *Hit:* 12 (2d8 + 3) piercing damage."
reactions:
  - name: Safe Descent
    desc: When it would take damage from a fall, the hadozee extends its skin membranes to reduce the fall's damage to 0, provided it isn't wearing heavy armour.
  - name: Uncanny Dodge
    desc: The hadozee halves the damage that it takes from an attack that hits it, provided it can see the attacker.
```
