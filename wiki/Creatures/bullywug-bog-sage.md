---
title: Bullywug Bog Sage
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Fey
size: Medium
habitat:
  - Swamp
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bullywug Bog Sage
size: Medium
type: fey
alignment: Neutral
ac: 16
hp: 52
hit_dice: 8d8 + 16
modifier: 3
speed: 30 ft., swim 30 ft.
stats: [ 8, 16, 14, 10, 16, 12 ]
saves:
  - con: 4
  - wis: 5
  - cha: 3
skillsaves:
  - nature: 4
  - stealth: 5
gear:
  - component pouch
senses: passive Perception 13
languages: Bullywug, Common
cr: "4"
traits:
  - name: Amphibious
    desc: The bullywug can breathe air and water.
  - name: Speak with Frogs and Toads
    desc: The bullywug can communicate simple concepts to frogs and toads when it speaks in Bullywug.
actions:
  - name: Multiattack
    desc: The bullywug makes two Bog Staff attacks. It can replace any attack with a use of Spellcasting to cast *Ray of Sickness*.
  - name: Bog Staff
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Bludgeoning damage plus 10 (3d6) Poison damage."
  - name: Spellcasting
    desc: |-
      The bullywug casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13, +5 to hit with spell attacks):

      **At will:** *Dancing Lights*, *Druidcraft*, *Ray of Sickness*

      **1/day each:** *Speak with Plants*, *Vitriolic Sphere*
bonus_actions:
  - name: Leap
    desc: The bullywug can jump up to 30 feet by spending 10 feet of movement.
```
