---
title: Sahuagin Priest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Fiend
size: Medium
habitat:
  - Coastal
  - Underwater
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sahuagin Priest
size: Medium
type: fiend
alignment: Lawful Evil
ac: 12
hp: 38
hit_dice: 7d8 + 7
modifier: 0
speed: 30 ft., swim 40 ft.
stats: [ 13, 11, 12, 12, 14, 13 ]
skillsaves:
  - perception: 6
  - religion: 3
damage_resistances: acid, cold
senses: Darkvision 120 ft., passive Perception 16
languages: Sahuagin
cr: "2"
traits:
  - name: Blood Frenzy
    desc: The sahuagin has Advantage on attack rolls against any creature that doesn't have all its Hit Points.
  - name: Limited Amphibiousness
    desc: The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water.
  - name: Shark Telepathy
    desc: The sahuagin can magically control sharks within 120 feet of itself, using a special telepathy.
actions:
  - name: Multiattack
    desc: The sahuagin makes two Spectral Jaws attacks.
  - name: Spectral Jaws
    desc: "*Melee or Ranged Attack Roll:* +4, reach 5 ft. or range 120 ft. *Hit:* 11 (2d8 + 2) Force damage."
  - name: Spellcasting
    desc: |-
      The sahuagin casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 12):

      **At will:** *Thaumaturgy*

      **2/day each:** *Hold Person*, *Tongues*
bonus_actions:
  - name: Fiendish Aid (2/Day)
    desc: |
      The sahuagin casts *Bless* or *Healing Word*, using the same spellcasting ability as Spellcasting.
```
