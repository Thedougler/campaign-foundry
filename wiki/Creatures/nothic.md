---
title: Nothic
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Aberration
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nothic
size: Medium
type: aberration
alignment: Neutral Evil
ac: 15
hp: 45
hit_dice: 6d8 + 18
modifier: 3
speed: 30 ft.
stats: [ 14, 16, 16, 13, 10, 8 ]
skillsaves:
  - arcana: 3
  - insight: 4
  - perception: 4
  - stealth: 5
senses: Truesight 120 ft., passive Perception 14
languages: Undercommon
cr: "2"
actions:
  - name: Multiattack
    desc: The nothic makes two Claw attacks.
  - name: Claw
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 8 (1d10 + 3) Slashing damage."
  - name: Rotting Gaze
    desc: "*Constitution Saving Throw:* DC 13, one creature the nothic can see within 120 feet. *Failure:* 17 (5d6) Necrotic damage. *Success:* Half damage."
bonus_actions:
  - name: Weird Insight (Recharge 6)
    desc: "*Wisdom Saving Throw:* DC 14, one creature the nothic can see within 120 feet. *Failure:* The nothic magically learns one fact or secret about the target."
```
