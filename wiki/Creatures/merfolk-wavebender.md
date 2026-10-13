---
title: Merfolk Wavebender
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Elemental
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
name: Merfolk Wavebender
size: Medium
type: elemental
alignment: Neutral
ac: 14
hp: 97
hit_dice: 15d8 + 30
modifier: 4
speed: 10 ft., swim 40 ft.
stats: [ 10, 18, 14, 13, 19, 15 ]
saves:
  - dex: 7
  - con: 5
  - wis: 7
  - cha: 5
skillsaves:
  - perception: 7
damage_resistances: cold
senses: passive Perception 17
languages: Common, Primordial (Aquan)
cr: "6"
traits:
  - name: Amphibious
    desc: The merfolk can breathe air and water.
actions:
  - name: Multiattack
    desc: The merfolk makes two Aquatic Burst attacks.
  - name: Aquatic Burst
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 60 ft. *Hit:* 20 (3d10 + 4) Cold damage. If the target is a Large or smaller creature, it has the Prone condition."
  - name: Spellcasting
    desc: |-
      The merfolk casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 15):

      **At will:** *Elementalism*, *Light*

      **1/day each:** *Control Water*, *Create or Destroy Water*
reactions:
  - name: Watery Rebuke
    desc: "Trigger: An enemy the merfolk can see enters a space within 5 feet of the merfolk. _Response, _*Strength Saving Throw:* DC 15, the triggering enemy. *Failure:* 14 (4d6) Cold damage. If the target is Large or smaller, it is pushed up to 30 feet straight away from the merfolk by conjured water."
```
