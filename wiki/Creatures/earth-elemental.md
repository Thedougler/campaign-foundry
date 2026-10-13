---
title: Earth Elemental
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Elemental
size: Large
habitat:
  - Mountain
  - Planar (Earth)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Earth Elemental
size: Large
type: elemental
alignment: Neutral
ac: 17
hp: 147
hit_dice: 14d10 + 70
modifier: -1
speed: 30 ft., burrow 30 ft.
stats: [ 20, 8, 20, 5, 10, 5 ]
damage_vulnerabilities: thunder
damage_immunities: poison
condition_immunities: exhaustion, paralysed, petrified, poisoned, unconscious
senses: Darkvision 60 ft., Tremorsense 60 ft., passive Perception 10
languages: Primordial (Terran)
cr: "5"
traits:
  - name: Earth Glide
    desc: The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn't disturb the material it moves through.
  - name: Siege Monster
    desc: The elemental deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The elemental makes two attacks, using Slam or Rock Launch in any combination.
  - name: Slam
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 14 (2d8 + 5) Bludgeoning damage."
  - name: Rock Launch
    desc: "*Ranged Attack Roll:* +8, range 60 ft. *Hit:* 8 (1d6 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition."
```
