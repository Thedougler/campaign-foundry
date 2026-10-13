---
title: Warrior Veteran
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
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
name: Warrior Veteran
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 17
hp: 65
hit_dice: 10d8 + 20
modifier: 3
speed: 30 ft.
stats: [ 16, 13, 14, 10, 11, 10 ]
skillsaves:
  - athletics: 5
  - perception: 2
gear:
  - greatsword
  - heavy crossbow
  - splint armour
senses: passive Perception 12
languages: Common plus one other language
cr: "3"
actions:
  - name: Multiattack
    desc: The warrior makes two Greatsword or Heavy Crossbow attacks.
  - name: Greatsword
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Slashing damage."
  - name: Heavy Crossbow
    desc: "*Ranged Attack Roll:* +3, range 100/400 ft. *Hit:* 12 (2d10 + 1) Piercing damage."
reactions:
  - name: Parry
    desc: "Trigger: The warrior is hit by a melee attack roll while holding a weapon. _Response:_ The warrior adds 2 to its AC against that attack, possibly causing it to miss."
```
