---
title: Giant Ape
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Beast
size: Huge
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giant Ape
size: Huge
type: beast
alignment: Unaligned
ac: 12
hp: 168
hit_dice: 16d12 + 64
modifier: 5
speed: 40 ft., climb 40 ft.
stats: [ 23, 14, 18, 5, 12, 7 ]
skillsaves:
  - athletics: 9
  - perception: 4
  - survival: 4
senses: passive Perception 14
cr: "7"
actions:
  - name: Multiattack
    desc: The ape makes two Fist attacks.
  - name: Fist
    desc: "*Melee Attack Roll:* +9, reach 10 ft. *Hit:* 22 (3d10 + 6) Bludgeoning damage."
  - name: Boulder Toss (Recharge 6)
    desc: The ape hurls a boulder at a point it can see within 90 feet. *Dexterity Saving Throw:* DC 17, each creature in a 5-foot-radius Sphere centred on that point. *Failure:* 24 (7d6) Bludgeoning damage. If the target is a Large or smaller creature, it has the Prone condition. *Success:* Half damage only.
bonus_actions:
  - name: Leap
    desc: The ape jumps up to 30 feet by spending 10 feet of movement.
```
