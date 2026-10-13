---
title: Hezrou
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Fiend
size: Large
habitat:
  - Planar (Abyss)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hezrou
size: Large
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 18
hp: 157
hit_dice: 15d10 + 75
modifier: 6
speed: 30 ft.
stats: [ 19, 17, 20, 5, 12, 13 ]
saves:
  - str: 7
  - con: 8
  - wis: 4
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: Darkvision 120 ft., passive Perception 11
languages: Abyssal; telepathy 120 ft.
cr: "8"
traits:
  - name: Demonic Restoration
    desc: If the hezrou dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - name: Magic Resistance
    desc: The hezrou has Advantage on saving throws against spells and other magical effects.
  - name: Stench
    desc: "*Constitution Saving Throw:* DC 16, any creature that starts its turn in a 10-foot Emanation originating from the hezrou. *Failure:* The target has the Poisoned condition until the start of its next turn."
actions:
  - name: Multiattack
    desc: The hezrou makes three Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 6 (1d4 + 4) Slashing damage plus 9 (2d8) Poison damage."
bonus_actions:
  - name: Leap
    desc: The hezrou jumps up to 30 feet by spending 10 feet of movement.
```
