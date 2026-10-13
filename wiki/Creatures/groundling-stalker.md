---
title: Groundling Stalker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
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
name: Groundling Stalker
size: Medium
type: monstrosity
alignment: Neutral Evil
ac: 15
hp: 52
hit_dice: 8d8 + 16
modifier: 5
speed: 30 ft., burrow 10 ft.
stats: [ 16, 16, 14, 8, 12, 8 ]
skillsaves:
  - perception: 3
  - stealth: 5
  - survival: 3
damage_resistances: poison
gear:
  - heavy crossbow
senses: passive Perception 13
languages: Common
cr: "2"
actions:
  - name: Claw
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 12 (2d8 + 3) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from one of two paws."
  - name: Heavy Crossbow
    desc: "*Ranged Attack Roll:* +5, range 100/400 ft. *Hit:* 14 (2d10 + 3) Piercing damage."
reactions:
  - name: Go to Ground
    desc: "Trigger: The groundling is hit by an attack roll while it is on the ground. _Response:_ The groundling halves the damage (round down) it takes from that attack."
```
