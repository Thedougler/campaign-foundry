---
title: Avatar of Death
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Dungeon Master's Guide (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Avatar of Death
size: Medium
type: undead
alignment: Neutral Evil
ac: 20
hp: Half the HP maximum of its summoner
modifier: 3
speed: 60 ft., fly 60 ft. (hover)
stats: [ 16, 16, 16, 16, 16, 16 ]
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned, unconscious
senses: Truesight 60 ft., passive Perception 13
languages: all languages known to its summoner
traits:
  - name: Incorporeal Movement
    desc: The avatar can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
actions:
  - name: Multiattack
    desc: The avatar makes a number of Reaping Scythe attacks equal to half the summoner's Proficiency Bonus (rounded up).
  - name: Reaping Scythe
    desc: "*Melee Attack Roll:* Automatic hit, reach 5 ft. *Hit:* 7 (1d8 + 3) Slashing damage plus 4 (1d8) Necrotic damage."
```
