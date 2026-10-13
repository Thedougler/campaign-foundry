---
title: Gargoyle
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Elemental
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
name: Gargoyle
size: Medium
type: elemental
alignment: Chaotic Evil
ac: 15
hp: 67
hit_dice: 9d8 + 27
modifier: 2
speed: 30 ft., fly 60 ft.
stats: [ 15, 11, 16, 6, 11, 7 ]
skillsaves:
  - stealth: 4
damage_immunities: poison
condition_immunities: exhaustion, petrified, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: Primordial (Terran)
cr: "2"
traits:
  - name: Flyby
    desc: The gargoyle doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
actions:
  - name: Multiattack
    desc: The gargoyle makes two Claw attacks.
  - name: Claw
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 7 (2d4 + 2) Slashing damage."
```
