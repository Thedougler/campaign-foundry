---
title: Vine Blight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Plant
size: Medium
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vine Blight
size: Medium
type: plant
alignment: Neutral Evil
ac: 12
hp: 19
hit_dice: 3d8 + 6
modifier: -1
speed: 20 ft.
stats: [ 15, 8, 14, 5, 10, 3 ]
skillsaves:
  - stealth: 1
condition_immunities: deafened
senses: Blindsight 60 ft., passive Perception 10
languages: Common
cr: 1/2
actions:
  - name: Constricting Vine
    desc: "*Melee Attack Roll:* +4, reach 10 ft. *Hit:* 6 (1d8 + 2) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). Until the grapple ends, the target takes 4 (1d8) Bludgeoning damage at the start of each of its turns, and the blight can't make Constricting Vine attacks."
  - name: Entangling Plants (Recharge 5–6)
    desc: |
      The blight casts the *Entangle* spell, using Constitution as the spellcasting ability (spell save DC 12).
```
