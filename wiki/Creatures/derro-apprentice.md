---
title: Derro Apprentice
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Aberration
size: Small
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Derro Apprentice
size: Small
type: aberration
alignment: typically Chaotic Evil
ac: 13
ac_class: leather armour
hp: 22
hit_dice: 5d6 + 5
modifier: 2
speed: 30 ft.
stats: [ 9, 14, 12, 11, 5, 12 ]
skillsaves:
  - stealth: 4
senses: darkvision 120 ft., passive Perception 7
languages: Dwarvish, Undercommon
cr: "1"
traits:
  - name: Magic Resistance
    desc: The derro has advantage on saving throws against spells and other magical effects.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the derro has disadvantage on attack rolls.
actions:
  - name: Chaos Blast
    desc: "*Melee or Ranged Spell Attack:* +3 to hit, reach 5 ft. or range 60 ft., one target. *Hit:* 10 (3d6) damage. Roll a d4 to determine the damage type: 1, acid; 2, cold; 3, fire; 4, lightning."
  - name: Force Burst (Recharge 4–6)
    desc: Raw arcane magic bursts out from the derro. Each creature within 10 feet of it must make a DC 11 Strength saving throw. On a failed save, the creature takes 7 (2d6) force damage and has the prone condition. On a successful save, the creature takes half as much damage only.
  - name: Spellcasting
    desc: |-
      The derro casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 11):

      **At will:** *Message*, *Prestidigitation*

      **1/day:** *Charm Person*
```
