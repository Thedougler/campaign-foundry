---
title: Enchanter Archmage
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
name: Enchanter Archmage
size: Medium
type: humanoid
subtype: wizard
alignment: Neutral
ac: 16
hp: 214
hit_dice: 39d8 + 39
modifier: 8
speed: 30 ft.
stats: [ 10, 16, 12, 20, 15, 16 ]
skillsaves:
  - arcana: 15
  - history: 10
  - perception: 7
  - persuasion: 13
gear:
  - staff
senses: passive Perception 17
languages: Common plus five other languages
cr: "15"
traits:
  - name: Magic Resistance
    desc: The archmage has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The archmage makes four Arcane Burst Attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +10, reach 5 ft. or range 150 ft. *Hit:* 21 (3d10 + 5) Force damage."
  - name: Spellcasting
    desc: |-
      The archmage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Magic*, *Mage Armour* (included in AC), *Mage Hand*, *Prestidigitation*

      **2/day each:** *Fireball* (level 7 version), *Geas*, *Modify Memory*
bonus_actions:
  - name: Dominate Person (1/Day)
    desc: |
      The archmage casts *Dominate Person*, using the same spellcasting ability as Spellcasting.
  - name: Duplicitous Magic (2/Day)
    desc: |
      The archmage casts *Charm Person*, *Hold Person*, or *Sleep*, using the same spellcasting ability as Spellcasting.
reactions:
  - name: Protective Magic (3/Day)
    desc: |
      The archmage casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
```
