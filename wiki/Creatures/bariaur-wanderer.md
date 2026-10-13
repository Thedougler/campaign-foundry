---
title: Bariaur Wanderer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bariaur Wanderer
size: Medium
type: celestial
alignment: typically Chaotic Good
ac: 14
ac_class: studded leather
hp: 71
hit_dice: 11d8 + 22
modifier: 2
speed: 40 ft.
stats: [ 18, 14, 15, 11, 15, 10 ]
saves:
  - str: 6
  - dex: 4
skillsaves:
  - athletics: 6
  - perception: 4
  - stealth: 4
  - survival: 6
gear:
  - shortbow
senses: darkvision 60 ft., passive Perception 14
languages: Celestial, Common
cr: "3"
traits:
  - name: Portal Sense
    desc: The bariaur can sense the presence of portals within 30 feet of itself, including inactive portals, and instinctively knows the destination of each one. The bariaur knows the distance and direction to the last portal it used as long as they're on the same plane.
actions:
  - name: Multiattack
    desc: The bariaur makes two Barbed Javelin or Shortbow attacks.
  - name: Barbed Javelin
    desc: "*Melee or Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 9 (1d10 + 4) piercing damage. If the target is a creature, its speed is reduced by 10 feet until the start of the bariaur's next turn."
  - name: Ram
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) bludgeoning damage. If the bariaur moved at least 20 feet straight toward the target immediately before the hit, the target takes an extra 10 (3d6) bludgeoning damage, and the target must succeed on a DC 14 Strength saving throw or have the prone condition."
  - name: Shortbow
    desc: "*Ranged Weapon Attack:* +4 to hit, range 80/320 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage, plus 4 (1d8) piercing damage if the target doesn't have all its hit points."
  - name: Spellcasting
    desc: |-
      The bariaur casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability:

      **At will:** *dancing lights*, *druidcraft*

      **1/day each:** *goodberry*, *pass without trace*, *tongues*
bonus_actions:
  - name: Mighty Leap
    desc: The bariaur jumps a distance up to its walking speed.
```
