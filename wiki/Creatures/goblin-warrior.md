---
title: Goblin Warrior
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
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
name: Goblin Warrior
size: Small
type: fey
subtype: goblinoid
alignment: Chaotic Neutral
ac: 15
hp: 10
hit_dice: 3d6
modifier: 2
speed: 30 ft.
stats: [ 8, 15, 10, 10, 8, 8 ]
skillsaves:
  - stealth: 6
gear:
  - leather armour
  - scimitar
  - shield
  - shortbow
senses: Darkvision 60 ft., passive Perception 9
languages: Common, Goblin
cr: 1/4
actions:
  - name: Scimitar
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Slashing damage, plus 2 (1d4) Slashing damage if the attack roll had Advantage."
  - name: Shortbow
    desc: "*Ranged Attack Roll:* +4, range 80/320 ft. *Hit:* 5 (1d6 + 2) Piercing damage, plus 2 (1d4) Piercing damage if the attack roll had Advantage."
bonus_actions:
  - name: Nimble Escape
    desc: The goblin takes the Disengage or Hide action.
```
