---
title: Phaerimm Scout
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Aberration
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Netheril's Fall
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Phaerimm Scout
size: Medium
type: aberration
alignment: Neutral Evil
ac: 13
hp: 44
hit_dice: 8d8 + 8
modifier: 3
speed: 10 ft., fly 40 ft.
stats: [ 12, 13, 12, 15, 16, 16 ]
saves:
  - int: 4
  - cha: 5
skillsaves:
  - perception: 5
condition_immunities: charmed
senses: Truesight 60 ft., passive Perception 15
languages: telepathy 120 ft. understands Common and Deep Speech but can't speak
cr: "2"
traits:
  - name: Magic Resistance
    desc: The phaerimm has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The phaerimm makes two attacks, using Stinger or Mindwarp Ray in any combination.
  - name: Stinger
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 4 (1d6 + 1) Piercing damage plus 9 (2d8) Poison damage."
  - name: Mindwarp Ray
    desc: "*Ranged Attack Roll:* +5, range 120 ft. *Hit:* 6 (1d6 + 3) Psychic damage, and the target has the Charmed condition until the start of the phaerimm's next turn."
  - name: Spellcasting
    desc: |-
      The phaerimm casts one of the following spells, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Mage Hand*

      **1/day:** *Clairvoyance*
reactions:
  - name: Uncanny Dodge
    desc: "Trigger: The phaerimm is hit by an attack roll. _Response:_ The phaerimm halves the damage (round down) it takes from that attack."
```
