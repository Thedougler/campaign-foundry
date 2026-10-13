---
title: Bulette
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Large
habitat:
  - Grassland
  - Hill
  - Mountain
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bulette
size: Large
type: monstrosity
alignment: Unaligned
ac: 17
hp: 94
hit_dice: 9d10 + 45
modifier: 0
speed: 40 ft., burrow 40 ft.
stats: [ 19, 11, 21, 2, 10, 5 ]
skillsaves:
  - perception: 6
senses: Darkvision 60 ft., Tremorsense 120 ft., passive Perception 16
cr: "5"
actions:
  - name: Multiattack
    desc: The bulette makes two Bite attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 17 (2d12 + 4) Piercing damage."
  - name: Deadly Leap
    desc: The bulette spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. *Dexterity Saving Throw:* DC 15, each creature in the bulette's destination space. *Failure:* 19 (3d12) Bludgeoning damage, and the target has the Prone condition. *Success:* Half damage, and the target is pushed 5 feet straight away from the bulette.
bonus_actions:
  - name: Leap
    desc: The bulette jumps up to 30 feet by spending 10 feet of movement.
```
