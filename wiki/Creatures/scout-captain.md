---
title: Scout Captain
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
name: Scout Captain
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 15
hp: 66
hit_dice: 12d8 + 12
modifier: 5
speed: 30 ft., climb 30 ft.
stats: [ 11, 16, 12, 14, 15, 11 ]
saves:
  - dex: 5
  - int: 4
skillsaves:
  - perception: 6
  - stealth: 7
  - survival: 6
gear:
  - longbow
  - shortsword
  - studded leather armour
senses: passive Perception 16
languages: Common plus one other language
cr: "3"
actions:
  - name: Multiattack
    desc: The scout makes two attacks, using Shortsword or Longbow in any combination.
  - name: Shortsword
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Piercing damage, plus 10 (3d6) Piercing damage if the attack was made with Advantage."
  - name: Longbow
    desc: "*Ranged Attack Roll:* +5, range 150/600 ft. *Hit:* 7 (1d8 + 3) Piercing damage, plus 10 (3d6) Piercing damage if the attack was made with Advantage."
bonus_actions:
  - name: Aim
    desc: The scout has Advantage on the next attack roll it makes during the current turn.
reactions:
  - name: Uncanny Dodge
    desc: "Trigger: The scout is hit by an attack roll. _Response:_ The scout halves the damage (round down) it takes from that attack."
```
