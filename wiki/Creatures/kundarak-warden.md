---
title: Kundarak Warden
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kundarak Warden
size: Medium
type: humanoid
subtype: dwarf
alignment: Neutral
ac: 14
hp: 82
hit_dice: 11d8 + 33
modifier: 1
speed: 30 ft.
stats: [ 15, 12, 16, 17, 13, 10 ]
saves:
  - str: 5
  - dex: 4
  - con: 6
  - int: 6
  - wis: 4
senses: Darkvision 120 ft., passive Perception 11
languages: Common, Dwarvish
cr: "5"
traits:
  - name: Magic Resistance
    desc: The warden has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The warden makes two Arcane Whip attacks. It can replace one attack with a use of Shackling Glyph if available.
  - name: Arcane Whip
    desc: "*Melee Attack Roll:* +6, reach 10 ft. *Hit:* 13 (3d6 + 3) Force damage, and if the target is a Medium or smaller creature, it has the Prone condition. If the target already has the Prone condition, the attack deals an extra 7 (2d6) Force damage."
  - name: Shackling Glyph (Recharge 6)
    desc: "*Strength Saving Throw:* DC 14, one creature the warden can see within 60 feet. *Failure:* The creature has the Grappled condition (escape DC 14). While Grappled, the creature has the Restrained condition."
  - name: Spellcasting
    desc: |-
      The warden casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 14):

      **At will:** *Alarm*, *Arcane Lock*, *Mage Armour* (included in AC)

      **1/day:** *Dispel Magic*
reactions:
  - name: Protective Magic (3/Day)
    desc: |
      The warden casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
```
