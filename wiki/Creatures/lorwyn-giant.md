---
title: Lorwyn Giant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Giant
size: Huge
habitat:
  - Planar (Feywild)
sourcebooks:
  - "Lorwyn: First Light"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lorwyn Giant
size: Huge
type: giant
alignment: Chaotic Neutral
ac: 13
hp: 115
hit_dice: 11d12 + 44
modifier: 1
speed: 40 ft.
stats: [ 21, 13, 18, 9, 16, 8 ]
saves:
  - con: 7
  - wis: 6
senses: passive Perception 13
languages: Common, Giant
cr: "6"
actions:
  - name: Multiattack
    desc: The giant makes two attacks, using Stone Sword or Boulder in any combination.
  - name: Stone Sword
    desc: "*Melee Attack Roll:* +8, reach 15 ft. *Hit:* 21 (3d10 + 5) Slashing damage."
  - name: Boulder
    desc: "*Ranged Attack Roll:* +8, range 60/240 ft. *Hit:* 14 (2d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition."
bonus_actions:
  - name: Name Sleep (Recharge 5–6)
    desc: The giant falls into a deep, restorative slumber. The giant gains 20 Temporary Hit Points and has the Unconscious condition until it takes damage or the end of its next turn. The giant has Advantage on ability checks and saving throws for 1 minute.
```
