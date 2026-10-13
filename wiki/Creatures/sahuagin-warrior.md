---
title: Sahuagin Warrior
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Fiend
size: Medium
habitat:
  - Coastal
  - Underwater
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sahuagin Warrior
size: Medium
type: fiend
alignment: Lawful Evil
ac: 12
hp: 22
hit_dice: 4d8 + 4
modifier: 0
speed: 30 ft., swim 40 ft.
stats: [ 13, 11, 12, 12, 13, 9 ]
skillsaves:
  - perception: 5
damage_resistances: acid, cold
senses: Darkvision 120 ft., passive Perception 15
languages: Sahuagin
cr: 1/2
traits:
  - name: Blood Frenzy
    desc: The sahuagin has Advantage on attack rolls against any creature that doesn't have all its Hit Points.
  - name: Limited Amphibiousness
    desc: The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water.
  - name: Shark Telepathy
    desc: The sahuagin can magically control sharks within 120 feet of itself, using a special telepathy.
actions:
  - name: Multiattack
    desc: The sahuagin makes two Claw attacks.
  - name: Claw
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 4 (1d6 + 1) Slashing damage."
bonus_actions:
  - name: Aquatic Charge
    desc: The sahuagin swims up to its Swim Speed straight toward an enemy it can see.
```
