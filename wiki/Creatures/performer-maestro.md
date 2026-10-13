---
title: Performer Maestro
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Performer Maestro
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 18
hp: 110
hit_dice: 17d8 + 34
modifier: 7
speed: 30 ft.
stats: [ 12, 18, 14, 13, 14, 19 ]
saves:
  - dex: 7
  - cha: 7
skillsaves:
  - acrobatics: 10
  - athletics: 4
  - perception: 5
  - performance: 10
  - stealth: 7
gear:
  - rapier
senses: passive Perception 15
languages: Common plus one other language
cr: "6"
actions:
  - name: Multiattack
    desc: The performer makes three Rapier attacks.
  - name: Rapier
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 8 (1d8 + 4) Piercing damage plus 7 (2d6) Psychic damage."
  - name: Beguiling Song
    desc: "*Wisdom Saving Throw:* DC 15, each creature in a 20-foot-radius Sphere centred on a point within 120 feet. *Failure:* 20 (3d10 + 4) Psychic damage, and the target has the Charmed condition until the end of the performer's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The performer casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):

      **At will:** *Minor Illusion*, *Prestidigitation*

      **1/day:** *Tasha's Hideous Laughter* (level 3 version)
```
