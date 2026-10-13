---
title: Giant Constrictor Snake
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Beast
size: Huge
habitat:
  - Desert
  - Forest
  - Swamp
  - Underwater
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giant Constrictor Snake
size: Huge
type: beast
alignment: Unaligned
ac: 12
hp: 60
hit_dice: 8d12 + 8
modifier: 2
speed: 30 ft., swim 30 ft.
stats: [ 19, 14, 12, 1, 10, 3 ]
skillsaves:
  - perception: 2
senses: Blindsight 10 ft., passive Perception 12
cr: "2"
actions:
  - name: Multiattack
    desc: The snake makes one Bite attack and uses Constrict.
  - name: Bite
    desc: "*Melee Attack Roll:* +6, reach 10 ft. *Hit:* 11 (2d6 + 4) Piercing damage."
  - name: Constrict
    desc: "*Strength Saving Throw:* DC 14, one Large or smaller creature the snake can see within 10 feet. *Failure:* 13 (2d8 + 4) Bludgeoning damage, and the target has the Grappled condition (escape DC 14)."
```
