---
title: Giant Frog
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Beast
size: Medium
habitat:
  - Forest
  - Swamp
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giant Frog
size: Medium
type: beast
alignment: Unaligned
ac: 11
hp: 18
hit_dice: 4d8
modifier: 1
speed: 30 ft., swim 30 ft.
stats: [ 12, 13, 11, 2, 10, 3 ]
skillsaves:
  - perception: 2
  - stealth: 4
senses: Darkvision 30 ft., passive Perception 12
cr: 1/4
traits:
  - name: Amphibious
    desc: The frog can breathe air and water.
  - name: Standing Leap
    desc: The frog's Long Jump is up to 20 feet and its High Jump is up to 10 feet with or without a running start.
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 5 (1d6 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 11)."
  - name: Swallow
    desc: |-
      The frog swallows a Small or smaller target it is grappling. While swallowed, the target isn't Grappled but has the Blinded and Restrained conditions, and it has Total Cover against attacks and other effects outside the frog. While swallowing the target, the frog can't use Bite, and if the frog dies, the swallowed target is no longer Restrained and can escape from the corpse using 5 feet of movement, exiting with the Prone condition.

      At the end of the frog's next turn, the swallowed target takes 5 (2d4) Acid damage. If that damage doesn't kill it, the frog disgorges it, causing it to exit Prone.
```
