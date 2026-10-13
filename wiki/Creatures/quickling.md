---
title: Quickling
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fey
size: Tiny
habitat:
  - Forest
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Quickling
size: Tiny
type: fey
alignment: Typically Chaotic Evil
ac: 16
hp: 10
hit_dice: 3d4 + 3
modifier: 6
speed: 120 ft.
stats: [ 4, 23, 13, 10, 12, 7 ]
skillsaves:
  - acrobatics: 8
  - sleight of hand: 8
  - stealth: 8
  - perception: 5
gear:
  - dagger
senses: darkvision 60 ft., passive Perception 15
languages: Common, Sylvan
cr: "1"
traits:
  - name: Blurred Movement
    desc: Attack rolls against the quickling have disadvantage unless it is incapacitated or its speed is 0.
  - name: Evasion
    desc: If the quickling is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw and only half damage if it fails, provided it isn't incapacitated.
actions:
  - name: Multiattack
    desc: The quickling makes three Dagger attacks.
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +8 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 8 (1d4 + 6) piercing damage."
```
