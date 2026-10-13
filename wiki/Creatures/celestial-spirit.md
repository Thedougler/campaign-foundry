---
title: Celestial Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Celestial
size: Large
habitat: []
sourcebooks:
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Celestial Spirit
size: Large
type: celestial
alignment: Neutral
ac_class: 11 + the spell's level + 2 (Defender only)
hp: 40 + 10 for each spell level above 5
modifier: 2
speed: 30 ft., fly 40 ft.
stats: [ 16, 14, 16, 10, 14, 16 ]
damage_resistances: radiant
condition_immunities: charmed, frightened
senses: Darkvision 60 ft., passive Perception 12
languages: Celestial, understands the languages you know
actions:
  - name: Multiattack
    desc: The spirit makes a number of attacks equal to half this spell's level (round down).
  - name: Radiant Bow (Avenger Only)
    desc: "*Ranged Attack Roll:* Bonus equals your spell attack modifier, range 600 ft. *Hit:* 2d6 + 2 + the spell's level Radiant damage."
  - name: Radiant Mace (Defender Only)
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d10 + 3 + the spell's level Radiant damage, and the spirit can choose itself or another creature it can see within 10 feet of the target. The chosen creature gains 1d10 Temporary Hit Points."
  - name: Healing Touch (1/Day)
    desc: The spirit touches another creature. The target regains Hit Points equal to 2d8 + the spell's level.
```
