---
title: Aarakocra Aeromancer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Elemental
size: Medium
habitat:
  - Mountain
  - Planar (Air)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aarakocra Aeromancer
size: Medium
type: elemental
alignment: Neutral
ac: 16
hp: 66
hit_dice: 12d8 + 12
modifier: 3
speed: 20 ft., fly 50 ft.
stats: [ 10, 16, 12, 13, 17, 12 ]
saves:
  - dex: 5
  - wis: 5
skillsaves:
  - arcana: 3
  - nature: 5
  - perception: 7
senses: passive Perception 17
languages: Aarakocra, Primordial (Auran)
cr: "4"
actions:
  - name: Multiattack
    desc: The aarakocra makes two Wind Staff attacks, and it can use Spellcasting to cast *Gust of Wind*.
  - name: Wind Staff
    desc: "*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 120 ft. *Hit:* 7 (1d8 + 3) Bludgeoning damage plus 11 (2d10) Lightning damage."
  - name: Spellcasting
    desc: |-
      The aarakocra casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *Elementalism*, *Gust of Wind*, *Mage Hand*, *Message*

      **1/day:** *Lightning Bolt*
reactions:
  - name: Feather Fall (1/Day)
    desc: |
      The aarakocra casts *Feather Fall* in response to that spell's trigger, using the same spellcasting ability as Spellcasting.
```
