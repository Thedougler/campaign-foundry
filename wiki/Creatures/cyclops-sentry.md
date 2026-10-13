---
title: Cyclops Sentry
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Giant
size: Huge
habitat:
  - Coastal
  - Desert
  - Grassland
  - Hill
  - Mountain
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cyclops Sentry
size: Huge
type: giant
alignment: Chaotic Neutral
ac: 14
hp: 138
hit_dice: 12d12 + 60
modifier: 0
speed: 40 ft.
stats: [ 22, 11, 20, 8, 6, 10 ]
senses: passive Perception 8
languages: Giant
cr: "6"
actions:
  - name: Multiattack
    desc: The cyclops makes two attacks, using Stone Club or Rock in any combination.
  - name: Stone Club
    desc: "*Melee Attack Roll:* +9, reach 10 ft. *Hit:* 16 (3d6 + 6) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition."
  - name: Rock
    desc: "*Ranged Attack Roll:* +9, range 30/120 ft. *Hit:* 22 (3d10 + 6) Bludgeoning damage."
reactions:
  - name: Limited Foresight (Recharge 6)
    desc: "Trigger: A creature the cyclops can see makes an attack roll against it. _Response:_ The cyclops imposes Disadvantage on the roll, and the cyclops gains Advantage on attack rolls against the target until the end of the cyclops's next turn."
```
