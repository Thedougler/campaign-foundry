---
title: Goristro
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Fiend
size: Huge
habitat:
  - Planar (Abyss)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Goristro
size: Huge
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 19
hp: 310
hit_dice: 23d12 + 161
modifier: 6
speed: 50 ft.
stats: [ 25, 11, 25, 6, 13, 14 ]
saves:
  - str: 13
  - dex: 6
  - con: 13
  - wis: 7
skillsaves:
  - perception: 7
  - survival: 7
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: Darkvision 120 ft., passive Perception 17
languages: Abyssal
cr: "17"
traits:
  - name: Demonic Restoration
    desc: If the goristro dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - name: Magic Resistance
    desc: The goristro has Advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The goristro deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The goristro makes one Brutal Gore attack and two Slam attacks.
  - name: Brutal Gore
    desc: "*Melee Attack Roll:* +13, reach 10 ft. *Hit:* 40 (6d10 + 7) Piercing damage. If the target is a Huge or smaller creature, it is pushed up to 20 feet straight away from the goristro and has the Prone condition."
  - name: Slam
    desc: "*Melee Attack Roll:* +13, reach 10 ft. *Hit:* 29 (4d10 + 7) Bludgeoning damage."
bonus_actions:
  - name: Charge
    desc: The goristro moves up to half its Speed straight toward an enemy it can see.
```
