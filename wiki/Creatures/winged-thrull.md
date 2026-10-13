---
title: Winged Thrull
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Construct
size: Small
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Winged Thrull
size: Small
type: construct
alignment: Unaligned
ac: 12
hp: 31
hit_dice: 7d6 + 7
modifier: 2
speed: 30 ft., fly 30 ft.
stats: [ 9, 15, 12, 8, 9, 8 ]
saves:
  - dex: 4
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: darkvision 60 ft., passive Perception 9
languages: understands Common but can't speak
cr: 1/2
actions:
  - name: Claws
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 7 (2d4 + 2) slashing damage."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +4 to hit, range 20/60 ft., one target. *Hit:* 5 (1d6 + 2) bludgeoning damage."
reactions:
  - name: Self-Sacrifice
    desc: When a creature within 5 feet of the thrull is hit by an attack, the thrull swaps places with that creature and is hit instead.
```
