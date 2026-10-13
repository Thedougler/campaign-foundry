---
title: Githyanki Dracomancer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Aberration
size: Medium
habitat:
  - Planar (Astral)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githyanki Dracomancer
size: Medium
type: aberration
subtype: gith
alignment: Lawful Evil
ac: 18
hp: 255
hit_dice: 30d8 + 120
modifier: 8
speed: 30 ft., fly 30 ft. (hover)
stats: [ 10, 16, 18, 20, 16, 18 ]
saves:
  - dex: 8
  - con: 9
  - int: 10
  - wis: 8
skillsaves:
  - arcana: 10
  - perception: 8
senses: Blindsight 30 ft., passive Perception 18
languages: Common, Draconic, Gith
cr: "16"
actions:
  - name: Multiattack
    desc: The githyanki makes three Draconic Strike attacks.
  - name: Draconic Strike
    desc: "*Melee or Ranged Attack Roll:* +10, reach 10 ft. or range 120 ft. *Hit:* 12 (2d6 + 5) Slashing damage plus 17 (5d6) Fire damage, and the target has the Frightened condition until the start of the githyanki's next turn."
  - name: Conjured Dragon's Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 18, each creature in a 90-foot Cone. *Failure:* 27 (6d8) Fire damage plus 27 (6d8) Force damage. *Success:* Half damage."
  - name: Spellcasting
    desc: |-
      The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 18, +10 to hit with spell attacks):

      **At will:** *Mage Hand* (the hand is Invisible)

      **2/day each:** *Nondetection* (self only), *Plane Shift*, *Tongues*
bonus_actions:
  - name: Misty Step (3/Day)
    desc: |
      The githyanki casts *Misty Step*, requiring no spell components and using the same spellcasting ability as Spellcasting.
```
