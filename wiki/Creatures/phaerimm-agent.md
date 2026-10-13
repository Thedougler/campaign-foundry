---
title: Phaerimm Agent
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Aberration
size: Large
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Phaerimm Agent
size: Large
type: aberration
alignment: Neutral Evil
ac: 15
hp: 123
hit_dice: 19d10 + 19
modifier: 4
speed: 10 ft., fly 40 ft. (hover)
stats: [ 12, 18, 12, 17, 16, 18 ]
saves:
  - con: 4
  - int: 6
  - wis: 6
  - cha: 7
skillsaves:
  - arcana: 9
  - insight: 6
  - perception: 6
condition_immunities: charmed
senses: Truesight 120 ft., passive Perception 16
languages: telepathy 120 ft. understands Common and Deep Speech but can't speak
cr: "8"
traits:
  - name: Magic Resistance
    desc: The phaerimm has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The phaerimm makes three attacks, using Dread Stinger or Mindwarp Ray in any combination.
  - name: Dread Stinger
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 7 (1d6 + 4) Piercing damage plus 13 (2d12) Poison damage."
  - name: Mindwarp Ray
    desc: "*Ranged Attack Roll:* +7, range 120 ft. *Hit:* 13 (2d8 + 4) Psychic damage, and the target has the Charmed condition until the start of the phaerimm's next turn."
  - name: Spellcasting
    desc: |-
      The phaerimm casts one of the following spells, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 15):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Mage Hand*

      **1/day each:** *Clairvoyance*, *Major Image*, Synaptic Static
bonus_actions:
  - name: Teleport
    desc: The phaerimm teleports up to 30 feet to an unoccupied space it can see.
reactions:
  - name: Protective Magic (3/Day)
    desc: |
      The phaerimm casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
```
