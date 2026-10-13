---
title: Groundling Slayer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
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
name: Groundling Slayer
size: Medium
type: monstrosity
alignment: Neutral Evil
ac: 15
hp: 58
hit_dice: 9d8 + 18
modifier: 5
speed: 30 ft., burrow 20 ft.
stats: [ 17, 16, 15, 10, 13, 8 ]
skillsaves:
  - perception: 3
  - stealth: 7
  - survival: 3
damage_resistances: poison
gear:
  - six daggers
senses: passive Perception 13
languages: Common
cr: "3"
actions:
  - name: Multiattack
    desc: The groundling makes two attacks, using Claw or Dagger in any combination.
  - name: Claw
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 12 (2d8 + 3) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from one of two paws."
  - name: Dagger
    desc: "*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 20/60 ft. *Hit:* 5 (1d4 + 3) Piercing damage plus 7 (2d6) Poison damage."
reactions:
  - name: Go to Ground
    desc: "Trigger: The groundling is hit by an attack roll while it is on the ground. _Response:_ The groundling halves the damage (round down) it takes from that attack."
```
