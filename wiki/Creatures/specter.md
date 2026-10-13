---
title: Specter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Undead
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Spectre
size: Medium
type: undead
alignment: Chaotic Evil
ac: 12
hp: 22
hit_dice: 5d8
modifier: 2
speed: 30 ft., fly 50 ft. (hover)
stats: [ 1, 14, 11, 10, 10, 11 ]
damage_resistances: acid, bludgeoning, cold, fire, lightning, piercing, slashing, thunder
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Darkvision 60 ft., passive Perception 10
languages: understands Common plus one other language but can't speak
cr: "1"
traits:
  - name: Incorporeal Movement
    desc: The spectre can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the spectre has Disadvantage on ability checks and attack rolls.
actions:
  - name: Life Drain
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 7 (2d6) Necrotic damage. If the target is a creature, its Hit Point maximum decreases by an amount equal to the damage taken."
```
