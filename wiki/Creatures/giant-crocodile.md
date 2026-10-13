---
title: Giant Crocodile
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Beast
size: Huge
habitat:
  - Coastal
  - Swamp
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giant Crocodile
size: Huge
type: beast
alignment: Unaligned
ac: 14
hp: 85
hit_dice: 9d12 + 27
modifier: -1
speed: 30 ft., swim 50 ft.
stats: [ 21, 9, 17, 2, 10, 7 ]
skillsaves:
  - stealth: 5
senses: passive Perception 10
cr: "5"
traits:
  - name: Hold Breath
    desc: The crocodile can hold its breath for 1 hour.
actions:
  - name: Multiattack
    desc: The crocodile makes one Bite attack and one Tail attack.
  - name: Bite
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 21 (3d10 + 5) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition and can't be targeted by the crocodile's Tail."
  - name: Tail
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 18 (3d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition."
```
