---
title: Rusted Berserker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Construct
size: Medium
habitat:
  - Coastal
  - Forest
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Rusted Berserker
size: Medium
type: construct
alignment: Neutral
ac: 16
hp: 82
hit_dice: 11d8 + 33
modifier: 2
speed: 30 ft.
stats: [ 18, 14, 17, 6, 10, 6 ]
damage_immunities: poison
condition_immunities: exhaustion, petrified, poisoned
gear:
  - greatsword
  - six javelins
senses: passive Perception 10
languages: Common
cr: "4"
actions:
  - name: Multiattack
    desc: The Rusted makes two attacks, using Greatsword or Javelin in any combination.
  - name: Greatsword
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 11 (2d6 + 4) Slashing damage, and the target has the Poisoned condition until the end of its next turn."
  - name: Javelin
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 30/120 ft. *Hit:* 11 (2d6 + 4) Piercing damage, and the target has the Poisoned condition until the end of its next turn."
```
