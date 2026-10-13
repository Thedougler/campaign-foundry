---
title: Servitor Thrull
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Construct
size: Small
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Servitor Thrull
size: Small
type: construct
alignment: Unaligned
ac: 11
hp: 22
hit_dice: 4d6 + 8
modifier: 1
speed: 30 ft.
stats: [ 11, 13, 14, 6, 6, 3 ]
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: darkvision 60 ft., passive Perception 8
languages: understands Common but can't speak
cr: 1/4
actions:
  - name: Claws
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 5 (1d8 + 1) slashing damage."
reactions:
  - name: Self-Sacrifice
    desc: When a creature within 5 feet of the thrull is hit by an attack, the thrull swaps places with that creature and is hit instead.
```
