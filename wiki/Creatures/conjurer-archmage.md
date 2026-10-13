---
title: Conjurer Archmage
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
name: Conjurer Archmage
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
  - perception: 7
gear:
  - crystal
senses: passive Perception 17
languages: Common plus five other languages
cr: "15"
traits:
  - name: Magic Resistance
    desc: The archmage has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The archmage makes four Arcane Burst attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +10, reach 5 ft. or range 150 ft. *Hit:* 27 (4d10 + 5) Force damage."
  - name: Spellcasting
    desc: |-
      The archmage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Magic*, *Find Familiar*, *Mage Armour* (included in AC), *Mage Hand*, *Prestidigitation*, *Unseen Servant*

      **2/day:** *Dimension Door*

      **1/day each:** *Incendiary Cloud*, *Lightning Bolt* (level 8 version), *Plane Shift*, *Teleport*
bonus_actions:
  - name: Benign Transposition (3/Day)
    desc: The archmage teleports up to 30 feet to an unoccupied space that it can see. If it instead chooses a space within range that is occupied by a willing creature, they both teleport, swapping places.
reactions:
  - name: Protective Magic (3/Day)
    desc: |
      The archmage casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
```
