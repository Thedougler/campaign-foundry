---
title: Groundling Grunt
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Monstrosity
size: Medium
habitat:
  - Hill
  - Urban
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Groundling Grunt
size: Medium
type: monstrosity
alignment: Neutral Evil
ac: 14
hp: 45
hit_dice: 7d8 + 14
modifier: 2
speed: 30 ft., burrow 10 ft.
stats: [ 16, 15, 14, 7, 10, 8 ]
skillsaves:
  - perception: 2
  - stealth: 4
  - survival: 2
damage_resistances: poison
gear:
  - sling
senses: passive Perception 12
languages: Common
cr: "1"
actions:
  - name: Claw
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from one of two paws."
  - name: Sling
    desc: "*Ranged Attack Roll:* +4, range 30/120 ft. *Hit:* 7 (2d4 + 2) Bludgeoning damage."
reactions:
  - name: Go to Ground
    desc: "Trigger: The groundling is hit by an attack roll while it is on the ground. _Response:_ The groundling halves the damage (round down) it takes from that attack."
```
