---
title: Noble Prodigy
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
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
name: Noble Prodigy
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 16
hp: 148
hit_dice: 27d8 + 27
modifier: 7
speed: 30 ft.
stats: [ 8, 16, 12, 15, 14, 19 ]
saves:
  - dex: 7
  - con: 5
  - wis: 6
  - cha: 8
skillsaves:
  - perception: 6
  - persuasion: 8
senses: passive Perception 16
languages: Common plus two other languages
cr: "10"
actions:
  - name: Multiattack
    desc: The noble makes three Beguiling Strike attacks.
  - name: Beguiling Strike
    desc: "*Melee or Ranged Attack Roll:* +8, reach 5 ft. or range 60 ft. *Hit:* 18 (4d6 + 4) Psychic damage, and the target has the Charmed condition until the start of the noble's next turn."
  - name: Spellcasting
    desc: |-
      The noble casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *Mage Armour* (included in AC), *Mage Hand*, *Minor Illusion*

      **1/day each:** *Befuddlement*, *Detect Thoughts*, *Fly*, *Scrying*, *Shatter* (level 7 version)
reactions:
  - name: Shield (2/Day)
    desc: |
      The noble casts *Shield* in response to that spell's trigger, using the same spellcasting ability as Spellcasting.
```
