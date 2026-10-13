---
title: Zombie
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Undead
size: Medium
habitat:
  - Planar (Shadowfell)
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Zombie
size: Medium
type: undead
alignment: Neutral Evil
ac: 8
hp: 15
hit_dice: 2d8 + 6
modifier: -2
speed: 20 ft.
stats: [ 13, 6, 16, 3, 6, 5 ]
saves:
  - wis: 0
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 8
languages: understands Common plus one other language but can't speak
cr: 1/4
traits:
  - name: Undead Fortitude
    desc: If damage reduces the zombie to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the zombie drops to 1 Hit Point instead.
actions:
  - name: Slam
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 5 (1d8 + 1) Bludgeoning damage."
```
