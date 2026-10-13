---
title: Mammoth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Beast
size: Huge
habitat:
  - Arctic
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mammoth
size: Huge
type: beast
alignment: Unaligned
ac: 13
hp: 126
hit_dice: 11d12 + 55
modifier: 2
speed: 50 ft.
stats: [ 24, 9, 21, 3, 11, 6 ]
saves:
  - str: 10
  - con: 8
senses: passive Perception 10
cr: "6"
actions:
  - name: Multiattack
    desc: The mammoth makes two Gore attacks.
  - name: Gore
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 18 (2d10 + 7) Piercing damage. If the target is a Huge or smaller creature and the mammoth moved 20+ feet straight toward it immediately before the hit, the target has the Prone condition."
bonus_actions:
  - name: Trample
    desc: "*Dexterity Saving Throw:* DC 18, one creature within 5 feet that has the Prone condition. *Failure:* 29 (4d10 + 7) Bludgeoning damage. *Success:* Half damage."
```
