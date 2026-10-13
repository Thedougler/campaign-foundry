---
title: Water Weird
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Elemental
size: Large
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Water Weird
size: Large
type: elemental
alignment: Neutral
ac: 13
hp: 65
hit_dice: 10d10 + 10
modifier: 3
speed: 5 ft., swim 60 ft.
stats: [ 17, 16, 13, 11, 10, 10 ]
damage_resistances: fire
damage_immunities: poison
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Blindsight 30 ft., passive Perception 10
languages: understands Primordial but can't speak
cr: "3"
traits:
  - name: Invisible in Water
    desc: The water weird has the Invisible condition while fully immersed in water.
  - name: Water Bound
    desc: The water weird dies if it leaves the water to which it is bound or if that water is destroyed.
actions:
  - name: Surge
    desc: "*Melee Attack Roll:* +5, reach 10 ft. *Hit:* 13 (3d6 + 3) Cold damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13), and it has the Restrained condition until the grapple ends."
```
