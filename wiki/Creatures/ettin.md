---
title: Ettin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Giant
size: Large
habitat:
  - Hill
  - Mountain
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ettin
size: Large
type: giant
alignment: Chaotic Evil
ac: 12
hp: 85
hit_dice: 10d10 + 30
modifier: -1
speed: 40 ft.
stats: [ 21, 8, 17, 6, 10, 8 ]
skillsaves:
  - perception: 4
condition_immunities: blinded, charmed, deafened, frightened, stunned, unconscious
gear:
  - battleaxe
  - morningstar
senses: Darkvision 60 ft., passive Perception 14
languages: Giant
cr: "4"
actions:
  - name: Multiattack
    desc: The ettin makes one Battleaxe attack and one Morningstar attack.
  - name: Battleaxe
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 14 (2d8 + 5) Slashing damage. If the target is a Large or smaller creature, it has the Prone condition."
  - name: Morningstar
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 14 (2d8 + 5) Piercing damage, and the target has Disadvantage on the next attack roll it makes before the end of its next turn."
```
