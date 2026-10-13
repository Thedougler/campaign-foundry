---
title: Yuan-ti Infiltrator
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Monstrosity
size: Medium
habitat:
  - Desert
  - Forest
  - Swamp
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yuan-ti Infiltrator
size: Medium
type: monstrosity
alignment: Neutral Evil
ac: 11
hp: 40
hit_dice: 9d8
modifier: 1
speed: 30 ft.
stats: [ 11, 12, 11, 13, 14, 12 ]
skillsaves:
  - deception: 5
  - perception: 4
  - stealth: 3
damage_immunities: poison
condition_immunities: poisoned
gear:
  - scimitar
senses: Darkvision 60 ft., passive Perception 14
languages: Abyssal, Common, Draconic
cr: "1"
traits:
  - name: Magic Resistance
    desc: The yuan-ti has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The yuan-ti makes two Scimitar attacks.
  - name: Scimitar
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 4 (1d6 + 1) Slashing damage."
  - name: Poison Ray
    desc: "*Ranged Attack Roll:* +4, range 120 ft. *Hit:* 9 (2d6 + 2) Poison damage."
  - name: Spellcasting
    desc: |-
      The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 12):

      **At will:** *Animal Friendship* (snakes only)

      **2/day:** *Suggestion*
```
