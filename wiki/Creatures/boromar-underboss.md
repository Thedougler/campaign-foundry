---
title: Boromar Underboss
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Humanoid
size: Small
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Boromar Underboss
size: Small
type: humanoid
subtype: halfling
alignment: Lawful Evil
ac: 16
hp: 104
hit_dice: 19d6 + 38
modifier: 7
speed: 30 ft.
stats: [ 10, 18, 15, 12, 14, 17 ]
saves:
  - dex: 7
  - con: 5
  - wis: 5
skillsaves:
  - insight: 5
  - perception: 8
  - sleight of hand: 10
damage_resistances: poison
gear:
  - studded leather armour
senses: passive Perception 18
languages: Common, Halfling, Thieves' cant
cr: "8"
traits:
  - name: Hustle
    desc: The underboss can move through the space of any creature that is of a larger size, but it can't stop there.
actions:
  - name: Multiattack
    desc: The underboss makes three attacks, using Poisoned Blade or Arcane Firearm in any combination.
  - name: Poisoned Blade
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 13 (2d8 + 4) Slashing damage plus 7 (2d6) Poison damage, and the target has the Poisoned condition until the start of the underboss's next turn. If the target is already Poisoned, it instead takes an extra 7 (2d6) Poison damage."
  - name: Arcane Firearm
    desc: "*Ranged Attack Roll:* +7, range 30/90 ft. *Hit:* 26 (4d10 + 4) Force damage."
reactions:
  - name: Uncanny Dodge
    desc: "Trigger: The underboss is hit by an attack roll. _Response:_ The underboss halves the damage (round down) it takes from that attack."
```
