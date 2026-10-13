---
title: Goblin Hexer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fey
size: Small
habitat:
  - Forest
  - Grassland
  - Hill
  - Planar (Acheron)
  - Planar (Feywild)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Goblin Hexer
size: Small
type: fey
subtype: goblinoid
alignment: Chaotic Neutral
ac: 13
hp: 45
hit_dice: 10d6 + 10
modifier: 3
speed: 30 ft.
stats: [ 8, 16, 12, 16, 10, 10 ]
skillsaves:
  - sleight of hand: 5
  - stealth: 7
senses: Darkvision 60 ft., passive Perception 10
languages: Common, Goblin
cr: "3"
actions:
  - name: Multiattack
    desc: The goblin makes two Hex Stick attacks. It can replace one attack with a use of Spellcasting.
  - name: Hex Stick
    desc: "*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 60 ft. *Hit:* 12 (2d8 + 3) Psychic damage."
  - name: Spellcasting
    desc: |-
      The goblin casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *Minor Illusion*

      **1/day each:** *Blindness/Deafness*, *Faerie Fire*, *Grease*
reactions:
  - name: Jinx
    desc: "Trigger: A creature the goblin can see hits it with an attack roll. _Response, _*Wisdom Saving Throw:* DC 13, the triggering creature. *Failure:* The attack misses instead."
```
