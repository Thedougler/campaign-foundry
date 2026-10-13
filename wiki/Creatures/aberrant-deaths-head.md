---
title: Aberrant Death's Head
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
name: Aberrant Death's Head
size: Tiny
type: undead
alignment: Chaotic Evil
ac: 16
hp: 24
hit_dice: 7d4 + 7
modifier: 1
speed: 5 ft., fly 30 ft. (hover)
stats: [ 8, 13, 12, 8, 14, 3 ]
saves:
  - int: 1
  - wis: 4
damage_resistances: necrotic, psychic
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 12
cr: "1"
traits:
  - name: Flyby
    desc: The death's head doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
actions:
  - name: Brain-Rending Bite
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 3 (1d4 + 1) Piercing damage plus 3 (1d6) Psychic damage, and the target has the Frightened condition until the start of the death's head's next turn."
```
