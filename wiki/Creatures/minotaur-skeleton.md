---
title: Minotaur Skeleton
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
name: Minotaur Skeleton
size: Large
type: undead
alignment: Lawful Evil
ac: 12
hp: 45
hit_dice: 6d10 + 12
modifier: 0
speed: 40 ft.
stats: [ 18, 11, 15, 6, 8, 5 ]
damage_vulnerabilities: bludgeoning
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 9
languages: understands Abyssal but can't speak
cr: "2"
actions:
  - name: Gore
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 11 (2d6 + 4) Piercing damage. If the target is a Large or smaller creature and the skeleton moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition."
  - name: Slam
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 15 (2d10 + 4) Bludgeoning damage."
```
