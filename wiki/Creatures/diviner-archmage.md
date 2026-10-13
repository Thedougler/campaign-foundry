---
title: Diviner Archmage
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
name: Diviner Archmage
size: Medium
type: humanoid
subtype: wizard
alignment: Neutral
ac: 16
hp: 176
hit_dice: 32d8 + 32
modifier: 8
speed: 30 ft.
stats: [ 10, 16, 12, 20, 15, 16 ]
skillsaves:
  - arcana: 15
  - history: 10
  - insight: 7
  - investigation: 10
  - perception: 7
gear:
  - staff
senses: passive Perception 17
languages: all
cr: "15"
traits:
  - name: Magic Resistance
    desc: The archmage has Advantage on saving throws against spells and similar effects.
actions:
  - name: Multiattack
    desc: The archmage makes four Arcane Burst attacks. It can replace one attack with a use of Spellcasting to cast *Mind Spike* (level 4 version).
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +10, reach 5 ft. or range 150 ft. *Hit:* 24 (3d12 + 5) Force damage."
  - name: Spellcasting
    desc: |-
      The archmage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Mage Armour* (included in AC), *Mage Hand*, *Mind Spike* (level 4 version), *Prestidigitation*

      **2/day each:** *Scrying*, *Sending*

      **1/day each:** *Foresight* (cast before combat), Telepathy
reactions:
  - name: Protective Magic (3/Day)
    desc: |
      The archmage casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
```
