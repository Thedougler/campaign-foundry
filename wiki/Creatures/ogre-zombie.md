---
title: Ogre Zombie
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Undead
size: Large
habitat:
  - Planar (Shadowfell)
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ogre Zombie
size: Large
type: undead
alignment: Neutral Evil
ac: 8
hp: 85
hit_dice: 9d10 + 36
modifier: -2
speed: 30 ft.
stats: [ 19, 6, 18, 3, 6, 5 ]
saves:
  - wis: 0
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 8
languages: understands Common and Giant but can't speak
cr: "2"
traits:
  - name: Undead Fortitude
    desc: If damage reduces the zombie to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the zombie drops to 1 Hit Point instead.
actions:
  - name: Slam
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 13 (2d8 + 4) Bludgeoning damage."
```
