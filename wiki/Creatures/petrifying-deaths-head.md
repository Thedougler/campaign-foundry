---
title: Petrifying Death's Head
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Undead
size: Tiny
habitat:
  - Forest
  - Swamp
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Petrifying Death's Head
size: Tiny
type: undead
alignment: Chaotic Evil
ac: 16
hp: 21
hit_dice: 6d4 + 6
modifier: 1
speed: 5 ft., fly 30 ft. (hover)
stats: [ 8, 12, 13, 5, 14, 3 ]
saves:
  - con: 3
damage_resistances: necrotic
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 12
cr: "1"
traits:
  - name: Flyby
    desc: The death's head doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
actions:
  - name: Petrifying Bite
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 3 (1d4 + 1) Piercing damage plus 3 (1d6) Necrotic damage. If the target is a creature, it is subjected to the following effect. *Constitution Saving Throw:* DC 11. *1St Failure:* The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. *2Nd Failure:* The target has the Petrified condition instead of the Restrained condition for 10 minutes, after which the effect ends on the target."
```
