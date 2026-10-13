---
title: Abominable Yeti
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Monstrosity
size: Huge
habitat:
  - Arctic
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Abominable Yeti
size: Huge
type: monstrosity
alignment: Chaotic Evil
ac: 15
hp: 137
hit_dice: 11d12 + 66
modifier: 4
speed: 40 ft., climb 40 ft.
stats: [ 24, 10, 22, 9, 13, 9 ]
skillsaves:
  - perception: 9
  - stealth: 8
damage_immunities: cold
senses: Darkvision 60 ft., passive Perception 19
languages: Yeti
cr: "9"
traits:
  - name: Fear of Fire
    desc: If the yeti takes Fire damage, it has Disadvantage on attack rolls and ability checks until the end of its next turn.
actions:
  - name: Multiattack
    desc: The yeti can use its Chilling Gaze and makes two attacks, using Claw or Ice Throw in any combination.
  - name: Claw
    desc: "*Melee Attack Roll:* +11, reach 5 ft. *Hit:* 14 (2d6 + 7) Slashing damage plus 7 (2d6) Cold damage."
  - name: Ice Throw
    desc: "*Ranged Attack Roll:* +11, range 60/240 ft. *Hit:* 12 (2d4 + 7) Bludgeoning damage plus 7 (2d6) Cold damage."
  - name: Chilling Gaze
    desc: "*Constitution Saving Throw:* DC 18, one creature the yeti can see within 30 feet. *Failure:* 21 (6d6) Cold damage, and the target has the Paralysed condition until the start of the yeti's next turn unless the target has Immunity to Cold damage. *Success:* The target is immune to this yeti's Chilling Gaze for 1 hour."
  - name: Cold Breath (Recharge 6)
    desc: "*Constitution Saving Throw:* DC 18, each creature in a 30-foot Cone. *Failure:* 45 (10d8) Cold damage. *Success:* Half damage."
```
