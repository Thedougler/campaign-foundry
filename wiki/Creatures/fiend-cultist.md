---
title: Fiend Cultist
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
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
name: Fiend Cultist
size: Small or Medium
type: humanoid
alignment: Neutral Evil
ac: 16
hp: 127
hit_dice: 17d8 + 51
modifier: 5
speed: 30 ft.
stats: [ 19, 15, 16, 12, 18, 10 ]
saves:
  - con: 6
  - wis: 7
skillsaves:
  - perception: 7
  - religion: 4
gear:
  - breastplate
senses: Darkvision 90 ft. (unimpeded by magical Darkness), passive Perception 17
languages: Abyssal, Common, Infernal
cr: "8"
actions:
  - name: Multiattack
    desc: The cultist makes three Pact Axe attacks.
  - name: Pact Axe
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 10 (1d12 + 4) Slashing damage plus 13 (3d8) Fire damage."
  - name: Spellcasting
    desc: |-
      The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 15, +7 to hit with spell attacks):

      **At will:** *Scorching Ray* (level 5 version), *Thaumaturgy*

      **2/day:** *Fireball* (level 6 version)
reactions:
  - name: Hellish Rebuke
    desc: |
      The cultist casts *Hellish Rebuke* in response to that spell's trigger, using the same spellcasting ability as Spellcasting.
```
