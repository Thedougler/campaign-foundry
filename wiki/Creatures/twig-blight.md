---
title: Twig Blight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.125
creature_type: Plant
size: Small
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Twig Blight
size: Small
type: plant
alignment: Neutral Evil
ac: 14
hp: 7
hit_dice: 2d6
modifier: 2
speed: 20 ft.
stats: [ 6, 14, 11, 4, 8, 3 ]
skillsaves:
  - stealth: 4
damage_vulnerabilities: fire
condition_immunities: deafened
senses: Blindsight 60 ft., passive Perception 9
languages: understands Common but can't speak
cr: 1/8
traits:
  - name: Pack Tactics
    desc: The blight has Advantage on an attack roll against a creature if at least one of the blight's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
actions:
  - name: Claw
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 4 (1d4 + 2) Slashing damage."
```
