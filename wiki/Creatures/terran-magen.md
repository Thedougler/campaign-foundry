---
title: Terran Magen
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Construct
size: Medium
habitat:
  - Any
sourcebooks:
  - Netheril's Fall
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Terran Magen
size: Medium
type: construct
alignment: Unaligned
ac: 21
hp: 121
hit_dice: 22d8 + 22
modifier: 3
speed: 30 ft., fly 20 ft. (hover)
stats: [ 16, 10, 12, 10, 18, 10 ]
saves:
  - wis: 7
skillsaves:
  - perception: 7
damage_immunities: poison, thunder
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, paralysed, petrified, poisoned
senses: passive Perception 17
languages: understands Common plus two other languages but can't speak
cr: "8"
traits:
  - name: Disintegration
    desc: If the magen dies, it disintegrates into dust, leaving behind anything it was wearing or carrying.
  - name: Magic Resistance
    desc: The magen has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The magen makes two attacks, using Hammer Fist or Thunderous Boom in any combination.
  - name: Hammer Fist
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 16 (3d8 + 3) Bludgeoning damage plus 13 (3d8) Force damage."
  - name: Thunderous Boom
    desc: "*Ranged Attack Roll:* +7, range 60 ft. *Hit:* 28 (8d6) Thunder damage."
  - name: Spellcasting
    desc: |-
      The magen casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 15):

      **At will:** *Mage Hand*, *Mending*, *Prestidigitation*

      **1/day each:** *Disintegrate*, *Move Earth*, *Stone Shape*
```
