---
title: Treant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Plant
size: Huge
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Treant
size: Huge
type: plant
alignment: Chaotic Good
ac: 16
hp: 138
hit_dice: 12d12 + 60
modifier: 3
speed: 30 ft.
stats: [ 23, 8, 21, 12, 16, 12 ]
damage_vulnerabilities: fire
damage_resistances: bludgeoning, piercing
senses: passive Perception 13
languages: Common, Druidic, Elvish, Sylvan
cr: "9"
traits:
  - name: Siege Monster
    desc: The treant deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The treant makes two Slam attacks.
  - name: Slam
    desc: "*Melee Attack Roll:* +10, reach 5 ft. *Hit:* 16 (3d6 + 6) Bludgeoning damage."
  - name: Hail of Bark
    desc: "*Ranged Attack Roll:* +10, range 180 ft. *Hit:* 28 (4d10 + 6) Piercing damage."
  - name: Animate Trees (1/Day)
    desc: The treant magically animates up to two trees it can see within 60 feet of itself. Each tree uses the Treant stat block, except it has Intelligence and Charisma scores of 1, it can't speak, and it lacks this action. The tree takes its turn immediately after the treant on the same Initiative count, and it obeys the treant. A tree remains animate for 1 day or until it dies, the treant dies, or it is more than 120 feet from the treant. The tree then takes root if possible.
```
