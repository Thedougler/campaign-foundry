---
title: Constrictor Snake
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Beast
size: Large
habitat:
  - Desert
  - Forest
  - Swamp
  - Underwater
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Constrictor Snake
size: Large
type: beast
alignment: Unaligned
ac: 13
hp: 13
hit_dice: 2d10 + 2
modifier: 2
speed: 30 ft., swim 30 ft.
stats: [ 15, 14, 12, 1, 10, 3 ]
skillsaves:
  - perception: 2
  - stealth: 4
senses: Blindsight 10 ft., passive Perception 12
cr: 1/4
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 6 (1d8 + 2) Piercing damage."
  - name: Constrict
    desc: "*Strength Saving Throw:* DC 12, one Medium or smaller creature the snake can see within 5 feet. *Failure:* 7 (3d4) Bludgeoning damage, and the target has the Grappled condition (escape DC 12)."
```
