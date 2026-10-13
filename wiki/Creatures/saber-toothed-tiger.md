---
title: Saber-Toothed Tiger
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Beast
size: Large
habitat:
  - Arctic
  - Hill
  - Mountain
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sabre-Toothed Tiger
size: Large
type: beast
alignment: Unaligned
ac: 13
hp: 52
hit_dice: 7d10 + 14
modifier: 3
speed: 40 ft.
stats: [ 18, 17, 15, 3, 12, 8 ]
saves:
  - str: 6
  - dex: 5
skillsaves:
  - perception: 5
  - stealth: 7
senses: Darkvision 60 ft., passive Perception 15
cr: "2"
traits:
  - name: Running Leap
    desc: With a 10-foot running start, the tiger can Long Jump up to 25 feet.
actions:
  - name: Multiattack
    desc: The tiger makes two Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 11 (2d6 + 4) Slashing damage."
bonus_actions:
  - name: Nimble Escape
    desc: The tiger takes the Disengage or Hide action.
```
