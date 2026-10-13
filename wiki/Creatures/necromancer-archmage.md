---
title: Necromancer Archmage
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Humanoid
size: Medium
habitat:
  - Any
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Necromancer Archmage
size: Medium
type: humanoid
subtype: wizard
alignment: Neutral
ac: 16
hp: 225
hit_dice: 41d8 + 41
modifier: 8
speed: 30 ft.
stats: [ 10, 16, 12, 20, 15, 16 ]
skillsaves:
  - arcana: 15
  - history: 10
  - intimidation: 8
  - perception: 7
damage_resistances: necrotic
gear:
  - crystal
senses: passive Perception 17
languages: Common plus five other languages
cr: "15"
traits:
  - name: Magic Resistance
    desc: The archmage has Advantage on saving throws against spells and other magical effects.
  - name: Marshal Undead
    desc: Undead creatures of the archmage's choice in a 60-foot Emanation originating from the archmage have Advantage on attack rolls and saving throws unless the archmage has the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The archmage makes four Arcane Burst attacks. It can replace one attack with a use of Spellcasting to cast *Blight*.
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +10, reach 5 ft. or range 150 ft. *Hit:* 21 (3d10 + 5) Force damage."
  - name: Spellcasting
    desc: |-
      The archmage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *Blight*, *Detect Magic*, *Mage Armour* (included in AC), *Mage Hand*, *Prestidigitation*, *Speak with Dead*

      **1/day each:** *Circle of Death* (level 7 version), *Create Undead*
reactions:
  - name: Protective Magic (3/Day)
    desc: |
      The archmage casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
```
