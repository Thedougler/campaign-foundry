---
title: Dolphin Delighter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fey
size: Medium
habitat:
  - Coastal
  - Underwater
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dolphin Delighter
size: Medium
type: fey
alignment: Typically Chaotic Good
ac: 14
ac_class: natural armour
hp: 27
hit_dice: 5d8 + 5
modifier: 1
speed: 0 ft., swim 60 ft.
stats: [ 14, 13, 13, 11, 12, 16 ]
saves:
  - wis: 3
  - cha: 5
skillsaves:
  - perception: 3
  - performance: 5
senses: blindsight 60 ft., passive Perception 13
languages: Aquan, telepathy 120 ft.
cr: "3"
traits:
  - name: Hold Breath
    desc: The dolphin can hold its breath for 20 minutes.
actions:
  - name: Multiattack
    desc: The dolphin makes two Dazzling Slam attacks.
  - name: Dazzling Slam
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) bludgeoning damage plus 7 (2d6) psychic damage, and the target is blinded until the start of the dolphin's next turn."
bonus_actions:
  - name: Delightful Light (Recharge 5–6)
    desc: The dolphin magically emanates light in a 10-foot radius for a moment. The dolphin and each creature of its choice in that light gain 11 (2d10) temporary hit points.
  - name: Fey Leap
    desc: The dolphin teleports up to 30 feet to an unoccupied space it can see. Immediately before teleporting, the dolphin can choose one creature within 5 feet of it. That creature can teleport with the dolphin, appearing in an unoccupied space within 5 feet of the dolphin's destination space.
```
