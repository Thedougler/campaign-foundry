---
title: Tree Blight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
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
name: Tree Blight
size: Huge
type: plant
alignment: Neutral Evil
ac: 15
hp: 115
hit_dice: 10d12 + 50
modifier: 3
speed: 30 ft.
stats: [ 23, 10, 20, 6, 10, 3 ]
condition_immunities: deafened
senses: Blindsight 60 ft., passive Perception 10
languages: understands Common and Druidic but can't speak
cr: "7"
actions:
  - name: Multiattack
    desc: The blight makes two Branch attacks and uses Grasping Root.
  - name: Branch
    desc: "*Melee Attack Roll:* +9, reach 15 ft. *Hit:* 16 (3d6 + 6) Bludgeoning damage."
  - name: Grasping Root
    desc: "*Strength Saving Throw:* DC 17, one Large or smaller creature the blight can see within 15 feet. *Failure:* The target is pulled up to 10 feet straight toward the blight and has the Grappled condition (escape DC 16) from one of six roots. Until the grapple ends, the target takes 13 (2d6 + 6) Bludgeoning damage at the start of each of its turns."
bonus_actions:
  - name: Gnash
    desc: "*Dexterity Saving Throw:* DC 17, one creature Grappled by the blight. *Failure:* 19 (3d8 + 6) Piercing damage. *Success:* Half damage."
```
