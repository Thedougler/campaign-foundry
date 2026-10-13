---
title: Kuo-toa Whip
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Aberration
size: Medium
habitat:
  - Coastal
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kuo-toa Whip
size: Medium
type: aberration
alignment: Neutral Evil
ac: 11
hp: 45
hit_dice: 7d8 + 14
modifier: 0
speed: 30 ft., swim 30 ft.
stats: [ 14, 10, 14, 12, 14, 11 ]
skillsaves:
  - perception: 6
  - religion: 3
senses: Darkvision 120 ft., Truesight 30 ft., passive Perception 16
languages: Undercommon
cr: "1"
traits:
  - name: Amphibious
    desc: The kuo-toa can breathe air and water.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the kuo-toa has Disadvantage on ability checks and attack rolls.
actions:
  - name: Pincer Staff
    desc: "*Melee Attack Roll:* +4, reach 10 ft. *Hit:* 9 (2d6 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12). Until the grapple ends, the kuo-toa can't make Pincer Staff attacks."
  - name: Conjure Slimy Glob
    desc: "*Ranged Attack Roll:* +4, range 60 ft. *Hit:* 9 (3d4 + 2) Acid damage."
bonus_actions:
  - name: Shield of Faith (2/Day)
    desc: |
      The kuo-toa casts *Shield of Faith*, using Wisdom as the spellcasting ability.
```
