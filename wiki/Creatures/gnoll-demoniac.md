---
title: Gnoll Demoniac
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Fiend
size: Medium
habitat:
  - Desert
  - Forest
  - Grassland
  - Hill
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gnoll Demoniac
size: Medium
type: fiend
alignment: Chaotic Evil
ac: 16
hp: 135
hit_dice: 18d8 + 54
modifier: 4
speed: 30 ft.
stats: [ 16, 12, 17, 14, 15, 17 ]
saves:
  - str: 6
  - con: 6
  - wis: 5
  - cha: 6
skillsaves:
  - perception: 5
senses: Darkvision 60 ft., passive Perception 15
languages: Abyssal, Common, Gnoll
cr: "8"
actions:
  - name: Multiattack
    desc: The gnoll makes two Abyssal Strike attacks.
  - name: Abyssal Strike
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 60 ft. *Hit:* 20 (5d6 + 3) Poison damage."
  - name: Hunger of Yeenoghu (Recharge 5–6)
    desc: The gnoll conjures a 30-foot Cube of magical Darkness originating from a point it can see within 60 feet, which lasts for 1 minute or until the gnoll's Concentration ends on it. This area is Difficult Terrain. *Dexterity Saving Throw:* DC 14, any creature that starts its turn in this area or enters it for the first time on a turn. *Failure:* 28 (8d6) Necrotic damage, and the gnoll or a creature of its choice it can see gains 10 Temporary Hit Points. *Success:* Half damage only.
bonus_actions:
  - name: Rampage (2/Day)
    desc: Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Abyssal Strike attack.
```
