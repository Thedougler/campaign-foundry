---
title: Elemental Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Elemental
size: Medium
habitat: []
sourcebooks:
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Elemental Spirit
size: Medium
type: elemental
alignment: Neutral
ac_class: 11 + the spell's level
hp: 50 + 10 for each spell level above 4
modifier: 2
speed: 40 ft., burrow 40 ft. (Earth only), fly 40 ft. (hover; Air only), swim 40 ft. (Water only)
stats: [ 18, 15, 17, 4, 10, 16 ]
damage_resistances: lightning, thunder (Air only)
damage_immunities: poison; fire (Fire only)
condition_immunities: exhaustion, paralysed, petrified, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: Primordial, understands the languages you know
traits:
  - name: Amorphous Form (Air, Fire, and Water Only)
    desc: The spirit can move through a space as narrow as 1 inch wide without it counting as Difficult Terrain.
actions:
  - name: Multiattack
    desc: The spirit makes a number of Slam attacks equal to half this spell's level (round down).
  - name: Slam
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d10 + 4 + the spell's level Bludgeoning (Earth only), Cold (Water only), Lightning (Air only), or Fire (Fire only) damage."
```
