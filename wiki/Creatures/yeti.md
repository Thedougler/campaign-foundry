---
title: Yeti
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Large
habitat:
  - Arctic
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yeti
size: Large
type: monstrosity
alignment: Chaotic Evil
ac: 12
hp: 51
hit_dice: 6d10 + 18
modifier: 1
speed: 40 ft., climb 40 ft.
stats: [ 18, 13, 16, 8, 12, 7 ]
skillsaves:
  - perception: 5
  - stealth: 5
damage_immunities: cold
senses: Darkvision 60 ft., passive Perception 15
languages: Yeti
cr: "3"
traits:
  - name: Fear of Fire
    desc: If the yeti takes Fire damage, it has Disadvantage on attack rolls and ability checks until the end of its next turn.
actions:
  - name: Multiattack
    desc: The yeti can use its Chilling Gaze and makes two attacks, using Claw or Ice Throw in any combination.
  - name: Claw
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 7 (1d6 + 4) Slashing damage plus 3 (1d6) Cold damage."
  - name: Ice Throw
    desc: "*Ranged Attack Roll:* +6, range 30/120 ft. *Hit:* 6 (1d4 + 4) Bludgeoning damage plus 2 (1d4) Cold damage."
  - name: Chilling Gaze
    desc: "*Constitution Saving Throw:* DC 13, one creature the yeti can see within 30 feet. *Failure:* 5 (2d4) Cold damage, and the target has the Paralysed condition until the start of the yeti's next turn unless the target has Immunity to Cold damage. *Success:* The target is immune to the Chilling Gaze of all yetis (but not abominable yetis) for 1 hour."
```
