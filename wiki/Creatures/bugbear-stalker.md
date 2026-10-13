---
title: Bugbear Stalker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fey
size: Medium
habitat:
  - Forest
  - Grassland
  - Planar (Feywild)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bugbear Stalker
size: Medium
type: fey
subtype: goblinoid
alignment: Chaotic Evil
ac: 15
hp: 65
hit_dice: 10d8 + 20
modifier: 2
speed: 30 ft.
stats: [ 17, 14, 14, 11, 12, 11 ]
saves:
  - con: 4
  - wis: 3
skillsaves:
  - stealth: 6
  - survival: 3
gear:
  - chain shirt
  - six javelins
  - morningstar
senses: Darkvision 60 ft., passive Perception 11
languages: Common, Goblin
cr: "3"
traits:
  - name: Abduct
    desc: The bugbear needn't spend extra movement to move a creature it is grappling.
actions:
  - name: Multiattack
    desc: The bugbear makes two Javelin or Morningstar attacks.
  - name: Javelin
    desc: "*Melee or Ranged Attack Roll:* +5, reach 10 ft. or range 30/120 ft. *Hit:* 13 (3d6 + 3) Piercing damage."
  - name: Morningstar
    desc: "*Melee Attack Roll:* +5 (with Advantage if the target is Grappled by the bugbear), reach 10 ft. *Hit:* 12 (2d8 + 3) Piercing damage."
bonus_actions:
  - name: Quick Grapple
    desc: "*Dexterity Saving Throw:* DC 13, one Medium or smaller creature the bugbear can see within 10 feet. *Failure:* The target has the Grappled condition (escape DC 13)."
```
