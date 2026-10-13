---
title: Phase Spider
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Large
habitat:
  - Desert
  - Forest
  - Grassland
  - Hill
  - Planar (Ethereal)
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Phase Spider
size: Large
type: monstrosity
alignment: Unaligned
ac: 14
hp: 45
hit_dice: 7d10 + 7
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 15, 16, 12, 6, 10, 6 ]
skillsaves:
  - stealth: 7
senses: Darkvision 60 ft., passive Perception 10
cr: "3"
traits:
  - name: Ethereal Sight
    desc: The spider can see 60 feet into the Ethereal Plane while on the Material Plane and vice versa.
  - name: Spider Climb
    desc: The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - name: Web Walker
    desc: The spider ignores movement restrictions caused by webs, and the spider knows the location of any other creature in contact with the same web.
actions:
  - name: Multiattack
    desc: The spider makes two Bite attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 8 (1d10 + 3) Piercing damage plus 9 (2d8) Poison damage. If this damage reduces the target to 0 Hit Points, the target becomes Stable, and it has the Poisoned condition for 1 hour. While Poisoned, the target also has the Paralysed condition."
bonus_actions:
  - name: Ethereal Jaunt
    desc: The spider teleports from the Material Plane to the Ethereal Plane or vice versa.
```
