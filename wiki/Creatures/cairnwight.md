---
title: Cairnwight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cairnwight
size: Huge
type: undead
alignment: typically Neutral
ac: 19
ac_class: natural armour
hp: 138
hit_dice: 12d12 + 60
modifier: 0
speed: 40 ft.
stats: [ 23, 10, 21, 10, 12, 9 ]
saves:
  - con: 9
  - wis: 5
skillsaves:
  - athletics: 10
  - perception: 5
  - stealth: 8
condition_immunities: charmed, exhaustion, frightened, petrified
senses: darkvision 60 ft., passive Perception 15
languages: Giant
cr: "9"
actions:
  - name: Multiattack
    desc: The cairnwight makes two Slam attacks or two Rock attacks, and it uses its Petrifying Touch if available.
  - name: Slam
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 22 (3d10 + 6) bludgeoning damage."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +10 to hit, range 60/240 ft., one target. *Hit:* 19 (3d8 + 6) bludgeoning damage, and the target must succeed on a DC 17 Strength saving throw or have the prone condition."
  - name: Petrifying Touch (Recharge 5–6)
    desc: The cairnwight touches one creature it can see within 10 feet of itself. The target must succeed on a DC 17 Constitution saving throw or take 26 (4d12) force damage and have the restrained condition as it begins to turn to stone. The affected target must repeat the saving throw at the end of its next turn. On a successful save, the effect ends on the target. On a failed save, the target has the petrified condition instead of the restrained condition.
```
