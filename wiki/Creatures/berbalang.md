---
title: Berbalang
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Aberration
size: Medium
habitat:
  - Desert
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Berbalang
size: Medium
type: aberration
alignment: Typically Neutral Evil
ac: 14
ac_class: natural armour
hp: 49
hit_dice: 14d8 - 14
modifier: 3
speed: 30 ft., fly 40 ft.
stats: [ 9, 16, 9, 17, 11, 10 ]
saves:
  - dex: 5
  - int: 5
skillsaves:
  - arcana: 5
  - history: 5
  - insight: 2
  - perception: 2
  - religion: 5
senses: truesight 120 ft., passive Perception 12
languages: all
cr: "2"
actions:
  - name: Multiattack
    desc: |-
      The berbalang makes one Bite attack and one

      Claw attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 8 (1d10 + 3) piercing damage plus 4 (1d8) psychic damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 8 (2d4 + 3) slashing damage."
  - name: Spellcasting
    desc: |-
      The berbalang casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability:

      **At will:** *speak with dead*

      **1/day:** *plane shift* (self only)
bonus_actions:
  - name: Spectral Duplicate (Recharges after a Short or Long Rest)
    desc: |-
      The berbalang creates one spectral duplicate of itself in an unoccupied space it can see within 60 feet of it. While the duplicate exists, the berbalang is unconscious. A berbalang can have only one duplicate at a time. The duplicate disappears when it or the berbalang drops to 0 hit points or when the berbalang dismisses it (no action required).

      The duplicate has the same statistics and knowledge as the berbalang, and everything experienced by the duplicate is known by the berbalang. All damage dealt by the duplicate's attacks is psychic damage.
```
