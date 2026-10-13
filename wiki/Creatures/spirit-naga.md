---
title: Spirit Naga
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Fiend
size: Large
habitat:
  - Planar (Lower)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Spirit Naga
size: Large
type: fiend
alignment: Chaotic Evil
ac: 17
hp: 135
hit_dice: 18d10 + 36
modifier: 3
speed: 40 ft.
stats: [ 18, 17, 14, 16, 15, 16 ]
saves:
  - dex: 6
  - con: 5
  - wis: 5
  - cha: 6
damage_immunities: poison
condition_immunities: charmed, poisoned
senses: Darkvision 60 ft., passive Perception 12
languages: Abyssal, Common
cr: "8"
traits:
  - name: Fiendish Restoration
    desc: If it dies, the naga returns to life in 1d6 days and regains all its Hit Points. Only a *Wish* spell can prevent this trait from functioning.
actions:
  - name: Multiattack
    desc: The naga makes three attacks, using Bite or Necrotic Ray in any combination.
  - name: Bite
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 7 (1d6 + 4) Piercing damage plus 14 (4d6) Poison damage."
  - name: Necrotic Ray
    desc: "*Ranged Attack Roll:* +6, range 60 ft. *Hit:* 21 (6d6) Necrotic damage."
  - name: Spellcasting
    desc: |-
      The naga casts one of the following spells, requiring no Somatic or Material components and using Intelligence as the spellcasting ability (spell save DC 14):

      **At will:** *Detect Magic*, *Mage Hand*, *Minor Illusion*, *Water Breathing*

      **2/day each:** *Detect Thoughts*, *Dimension Door*, *Hold Person* (level 3 version), *Lightning Bolt* (level 4 version)
```
