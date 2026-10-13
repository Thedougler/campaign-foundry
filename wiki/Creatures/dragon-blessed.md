---
title: Dragon Blessed
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dragon Blessed
size: Medium
type: humanoid
alignment: Any alignment
ac: 14
ac_class: scale mail
hp: 75
hit_dice: 10d8 + 30
modifier: 0
speed: 30 ft.
stats: [ 12, 10, 16, 14, 17, 10 ]
saves:
  - con: 6
  - wis: 6
skillsaves:
  - medicine: 6
  - religion: 5
condition_immunities: frightened
gear:
  - mace
senses: passive Perception 13
languages: Common, Draconic, and any two languages
cr: "5"
actions:
  - name: Multiattack
    desc: The blessed makes two Mace or Radiant Bolt attacks.
  - name: Mace
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d6 + 1) bludgeoning damage plus 18 (4d8) radiant damage."
  - name: Radiant Bolt
    desc: "*Ranged Spell Attack:* +6 to hit, range 120 ft., one target. *Hit:* 22 (5d8) radiant damage, and the blessed regains 5 (1d10) hit points."
  - name: Spellcasting
    desc: |-
      The blessed casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

      **At will:** *light*, *thaumaturgy*

      **1/day each:** *enhance ability*, *flame strike*, *mass cure wounds*, *revivify*, *tongues*
```
