---
title: Goblin Boss
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fey
size: Small
habitat:
  - Forest
  - Grassland
  - Hill
  - Planar (Acheron)
  - Planar (Feywild)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Goblin Boss
size: Small
type: fey
subtype: goblinoid
alignment: Chaotic Neutral
ac: 17
hp: 21
hit_dice: 6d6
modifier: 2
speed: 30 ft.
stats: [ 10, 15, 10, 10, 8, 10 ]
skillsaves:
  - stealth: 6
gear:
  - chain shirt
  - scimitar
  - shield
  - shortbow
senses: Darkvision 60 ft., passive Perception 9
languages: Common, Goblin
cr: "1"
actions:
  - name: Multiattack
    desc: The goblin makes two attacks, using Scimitar or Shortbow in any combination.
  - name: Scimitar
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Slashing damage, plus 2 (1d4) Slashing damage if the attack roll had Advantage."
  - name: Shortbow
    desc: "*Ranged Attack Roll:* +4, range 80/320 ft. *Hit:* 5 (1d6 + 2) Piercing damage, plus 2 (1d4) Piercing damage if the attack roll had Advantage."
bonus_actions:
  - name: Nimble Escape
    desc: The goblin takes the Disengage or Hide action.
reactions:
  - name: Redirect Attack
    desc: "Trigger: A creature the goblin can see makes an attack roll against it. _Response:_ The goblin chooses a Small or Medium ally within 5 feet of itself. The goblin and that ally swap places, and the ally becomes the target of the attack instead."
```
