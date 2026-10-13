---
title: Air Elemental
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Elemental
size: Large
habitat:
  - Desert
  - Mountain
  - Planar (Air)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Air Elemental
size: Large
type: elemental
alignment: Neutral
ac: 15
hp: 90
hit_dice: 12d10 + 24
modifier: 5
speed: 10 ft., fly 90 ft. (hover)
stats: [ 14, 20, 14, 6, 10, 6 ]
damage_resistances: bludgeoning, lightning, piercing, slashing
damage_immunities: poison, thunder
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Darkvision 60 ft., passive Perception 10
languages: Primordial (Auran)
cr: "5"
traits:
  - name: Air Form
    desc: The elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.
actions:
  - name: Multiattack
    desc: The elemental makes two Thunderous Slam attacks.
  - name: Thunderous Slam
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 14 (2d8 + 5) Thunder damage."
  - name: Whirlwind (Recharge 4–6)
    desc: "*Strength Saving Throw:* DC 13, one Medium or smaller creature in the elemental's space. *Failure:* 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the elemental and has the Prone condition. *Success:* Half damage only."
```
