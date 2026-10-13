---
title: Bandit Captain
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bandit Captain
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 15
hp: 52
hit_dice: 8d8 + 16
modifier: 3
speed: 30 ft.
stats: [ 15, 16, 14, 14, 11, 14 ]
saves:
  - str: 4
  - dex: 5
  - wis: 2
skillsaves:
  - athletics: 4
  - deception: 4
gear:
  - pistol
  - scimitar
  - studded leather armour
senses: passive Perception 10
languages: Common, Thieves' cant
cr: "2"
actions:
  - name: Multiattack
    desc: The bandit makes two attacks, using Scimitar and Pistol in any combination.
  - name: Scimitar
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Slashing damage."
  - name: Pistol
    desc: "*Ranged Attack Roll:* +5, range 30/90 ft. *Hit:* 8 (1d10 + 3) Piercing damage."
reactions:
  - name: Parry
    desc: "Trigger: The bandit is hit by a melee attack roll while holding a weapon. _Response:_ The bandit adds 2 to its AC against that attack, possibly causing it to miss."
```
