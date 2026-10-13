---
title: Grick Ancient
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Aberration
size: Large
habitat:
  - Forest
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Grick Ancient
size: Large
type: aberration
alignment: Unaligned
ac: 18
hp: 135
hit_dice: 18d10 + 36
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 18, 16, 15, 4, 14, 9 ]
skillsaves:
  - stealth: 6
senses: Darkvision 60 ft., passive Perception 12
cr: "7"
actions:
  - name: Multiattack
    desc: The grick makes one Beak attack, one Slam attack, and one Tentacles attack.
  - name: Beak
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 22 (4d8 + 4) Piercing damage."
  - name: Slam
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 7 (1d6 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition."
  - name: Tentacles
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 15 (2d10 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from all four tentacles."
```
