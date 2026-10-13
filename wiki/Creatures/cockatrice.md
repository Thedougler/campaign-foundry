---
title: Cockatrice
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Monstrosity
size: Small
habitat:
  - Grassland
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cockatrice
size: Small
type: monstrosity
alignment: Unaligned
ac: 11
hp: 22
hit_dice: 5d6 + 5
modifier: 1
speed: 20 ft., fly 40 ft.
stats: [ 6, 12, 12, 2, 13, 5 ]
condition_immunities: petrified
senses: Darkvision 60 ft., passive Perception 11
cr: 1/2
actions:
  - name: Petrifying Bite
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 3 (1d4 + 1) Piercing damage. If the target is a creature, it is subjected to the following effect. *Constitution Saving Throw:* DC 11. *1St Failure:* The target has the Restrained condition. The target repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. *2Nd Failure:* The target has the Petrified condition, instead of the Restrained condition, for 24 hours."
```
