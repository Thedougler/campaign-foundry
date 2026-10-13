---
title: Spy Master
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
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
name: Spy Master
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 19
hp: 137
hit_dice: 25d8 + 25
modifier: 9
speed: 30 ft., climb 30 ft.
stats: [ 10, 20, 12, 18, 16, 16 ]
saves:
  - dex: 9
  - con: 5
  - int: 8
  - wis: 7
skillsaves:
  - deception: 7
  - insight: 7
  - investigation: 8
  - perception: 11
  - sleight of hand: 9
  - stealth: 13
gear:
  - hand crossbow
  - rapier
  - thieves' tools
senses: passive Perception 21
languages: Common plus two other languages
cr: "10"
actions:
  - name: Multiattack
    desc: The spy makes three attacks, using Rapier or Hand Crossbow in any combination.
  - name: Rapier
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 14 (2d8 + 5) Piercing damage plus 7 (2d6) Poison damage."
  - name: Hand Crossbow
    desc: "*Ranged Attack Roll:* +9, range 30/120 ft. *Hit:* 12 (2d6 + 5) Piercing damage plus 9 (2d8) Poison damage."
  - name: Smoke Bomb (1/Day)
    desc: The spy throws a bomb to a point it can see within 30 feet of itself. *Constitution Saving Throw:* DC 16, each creature in a 20-foot-radius Sphere centred on that point. *Failure:* 28 (8d6) Poison damage, and the target has the Blinded condition until the end of the spy's next turn. *Success:* Half damage only.
bonus_actions:
  - name: Cunning Action
    desc: The spy takes the Dash, Disengage, or Hide action.
```
