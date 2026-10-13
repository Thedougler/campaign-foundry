---
title: Oblex Spawn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Ooze
size: Tiny
habitat:
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Oblex Spawn
size: Tiny
type: ooze
alignment: Typically Lawful Evil
ac: 13
hp: 18
hit_dice: 4d4 + 8
modifier: 3
speed: 20 ft.
stats: [ 8, 16, 15, 14, 11, 10 ]
saves:
  - int: 4
  - cha: 2
condition_immunities: blinded, charmed, deafened, exhaustion, prone
senses: blindsight 60 ft. (blind beyond this radius), passive Perception 12
cr: 1/4
traits:
  - name: Amorphous
    desc: The oblex can move through a space as narrow as 1 inch wide without squeezing.
  - name: Aversion to Fire
    desc: If the oblex takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn.
  - name: Unusual Nature
    desc: The oblex doesn't require sleep.
actions:
  - name: Pseudopod
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d4 + 3) bludgeoning damage plus 2 (1d4) psychic damage."
```
