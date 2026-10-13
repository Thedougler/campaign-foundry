---
title: Guardian Naga
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Celestial
size: Large
habitat:
  - Desert
  - Forest
  - Planar (Upper)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Guardian Naga
size: Large
type: celestial
alignment: Lawful Good
ac: 18
hp: 136
hit_dice: 16d10 + 48
modifier: 4
speed: 40 ft., climb 40 ft., swim 40 ft.
stats: [ 19, 18, 16, 16, 19, 18 ]
saves:
  - dex: 8
  - con: 7
  - int: 7
  - wis: 8
  - cha: 8
skillsaves:
  - arcana: 11
  - history: 11
  - religion: 11
damage_immunities: poison
condition_immunities: charmed, paralysed, poisoned, restrained
senses: Darkvision 60 ft., passive Perception 14
languages: Celestial, Common
cr: "10"
traits:
  - name: Celestial Restoration
    desc: If the naga dies, it returns to life in 1d6 days and regains all its Hit Points unless *Dispel Evil and Good* is cast on its remains.
actions:
  - name: Multiattack
    desc: The naga makes two Bite attacks. It can replace any attack with a use of Poisonous Spittle.
  - name: Bite
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 17 (2d12 + 4) Piercing damage plus 22 (4d10) Poison damage."
  - name: Poisonous Spittle
    desc: "*Constitution Saving Throw:* DC 16, one creature the naga can see within 60 feet. *Failure:* 31 (7d8) Poison damage, and the target has the Blinded condition until the start of the naga's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The naga casts one of the following spells, requiring no Somatic or Material components and using Wisdom as the spellcasting ability (spell save DC 16):

      **At will:** *Thaumaturgy*

      **1/day each:** *Clairvoyance*, *Cure Wounds* (level 6 version), *Flame Strike* (level 6 version), *Geas*, *True Seeing*
```
