---
title: Hobgoblin Warlord
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Fey
size: Medium
habitat:
  - Desert
  - Forest
  - Grassland
  - Hill
  - Mountain
  - Planar (Acheron)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hobgoblin Warlord
size: Medium
type: fey
subtype: goblinoid
alignment: Lawful Evil
ac: 20
hp: 112
hit_dice: 15d8 + 45
modifier: 5
speed: 30 ft.
stats: [ 17, 14, 16, 14, 11, 15 ]
saves:
  - dex: 5
  - int: 5
  - wis: 3
  - cha: 5
gear:
  - nine javelins
  - longsword
  - plate armour
  - shield
senses: Darkvision 60 ft., passive Perception 10
languages: Common, Goblin
cr: "6"
traits:
  - name: Aura of Authority
    desc: While in a 30-foot Emanation originating from the hobgoblin, the hobgoblin and its allies have Advantage on attack rolls and saving throws, provided the hobgoblin doesn't have the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The hobgoblin makes three attacks, using Javelin or Longsword in any combination.
  - name: Javelin
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 30/120 ft. *Hit:* 11 (2d6 + 4) Piercing damage, and the target's Speed decreases by 10 feet until the start of the hobgoblin's next turn."
  - name: Longsword
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 12 (2d8 + 3) Slashing damage."
reactions:
  - name: Parry
    desc: "Trigger: The hobgoblin is hit by a melee attack roll while holding a weapon. _Response:_ The hobgoblin adds 3 to its AC against that attack, possibly causing it to miss."
```
