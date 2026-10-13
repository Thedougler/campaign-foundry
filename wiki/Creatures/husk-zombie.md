---
title: Husk Zombie
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Husk Zombie
size: Medium
type: undead
alignment: Neutral Evil
ac: 10
hp: 37
hit_dice: 5d8 + 15
modifier: 0
speed: 35 ft.
stats: [ 16, 10, 16, 3, 6, 5 ]
saves:
  - con: 5
  - wis: 0
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 60 ft., passive Perception 8
languages: understands the languages it knew in life but can't speak
cr: "1"
traits:
  - name: Curse of the Husk
    desc: A humanoid slain by a melee attack from the zombie revives as a husk zombie on its next turn.
  - name: Undead Fortitude
    desc: If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.
actions:
  - name: Multiattack
    desc: The zombie makes two claw attacks. For each of these attacks that reduces a creature to 0 hit points, the zombie can make an additional claw attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage."
```
