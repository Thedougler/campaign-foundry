---
title: Kuo-toa Archpriest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
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
name: Kuo-toa Archpriest
size: Medium
type: aberration
alignment: Neutral Evil
ac: 13
hp: 105
hit_dice: 14d8 + 42
modifier: 2
speed: 30 ft., swim 30 ft.
stats: [ 16, 14, 16, 13, 16, 14 ]
skillsaves:
  - perception: 9
  - religion: 4
senses: Darkvision 120 ft., Truesight 30 ft., passive Perception 19
languages: Undercommon
cr: "6"
traits:
  - name: Amphibious
    desc: The kuo-toa can breathe air and water.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the kuo-toa has Disadvantage on ability checks and attack rolls.
actions:
  - name: Multiattack
    desc: The kuo-toa makes three Strange Sceptre attacks.
  - name: Strange Sceptre
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 120 ft. *Hit:* 20 (5d6 + 3) Lightning damage."
  - name: Spellcasting
    desc: |-
      The kuo-toa casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 14):

      **At will:** *Detect Magic*, *Thaumaturgy*

      **1/day each:** Destructive Wave, *Divination*, *Hold Monster* (level 6 version), *Scrying*, *Tongues*
bonus_actions:
  - name: Shield of Faith (2/Day)
    desc: |
      The kuo-toa casts *Shield of Faith*, using the same spellcasting ability as Spellcasting.
```
