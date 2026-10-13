---
title: Elephant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Beast
size: Huge
habitat:
  - Grassland
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Elephant
size: Huge
type: beast
alignment: Unaligned
ac: 12
hp: 76
hit_dice: 8d12 + 24
modifier: -1
speed: 40 ft.
stats: [ 22, 9, 17, 3, 11, 6 ]
senses: passive Perception 10
cr: "4"
actions:
  - name: Multiattack
    desc: The elephant makes two Gore attacks.
  - name: Gore
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 15 (2d8 + 6) Piercing damage. If the target is a Huge or smaller creature and the elephant moved 20+ feet straight toward it immediately before the hit, the target has the Prone condition."
bonus_actions:
  - name: Trample
    desc: "*Dexterity Saving Throw:* DC 16, one creature within 5 feet that has the Prone condition. *Failure:* 17 (2d10 + 6) Bludgeoning damage. *Success:* Half damage."
```
