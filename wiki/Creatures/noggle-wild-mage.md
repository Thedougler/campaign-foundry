---
title: Noggle Wild Mage
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fey
size: Small
habitat:
  - Planar (Feywild)
sourcebooks:
  - "Lorwyn: First Light"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Noggle Wild Mage
size: Small
type: fey
alignment: Chaotic Neutral
ac: 13
hp: 22
hit_dice: 4d6 + 8
modifier: 3
speed: 30 ft.
stats: [ 11, 16, 14, 10, 12, 17 ]
saves:
  - con: 4
  - cha: 5
senses: Darkvision 60 ft., passive Perception 11
languages: Common, Sylvan
cr: "1"
traits:
  - name: Bloodied Wild Magic
    desc: While Bloodied, the noggle has a Fly Speed of 30 feet and it can choose for any damage it deals to be Force damage.
actions:
  - name: Multiattack
    desc: The noggle makes two attacks, using Noggling Stick or Befuddling Ray in any combination.
  - name: Noggling Stick
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 5 (1d4 + 3) Bludgeoning damage plus 2 (1d4) Psychic damage."
  - name: Befuddling Ray
    desc: "*Ranged Attack Roll:* +5, range 60 ft. *Hit:* 6 (1d6 + 3) Psychic damage, and the target subtracts 1d4 from the next saving throw it makes before the end of the noggle's next turn."
```
