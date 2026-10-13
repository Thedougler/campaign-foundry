---
title: Basilisk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Medium
habitat:
  - Mountain
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Basilisk
size: Medium
type: monstrosity
alignment: Unaligned
ac: 15
hp: 52
hit_dice: 8d8 + 16
modifier: -1
speed: 20 ft.
stats: [ 16, 8, 15, 2, 8, 7 ]
senses: Darkvision 60 ft., passive Perception 9
cr: "3"
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Piercing damage plus 7 (2d6) Poison damage."
bonus_actions:
  - name: Petrifying Gaze (Recharge 4–6)
    desc: "*Constitution Saving Throw:* DC 12, each creature in a 30-foot Cone. If the basilisk sees its reflection within the Cone, the basilisk must make this save. *1St Failure:* The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. *2Nd Failure:* The target has the Petrified condition instead of the Restrained condition."
```
