---
title: Stench Kow
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Fiend
size: Large
habitat:
  - Grassland
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Stench Kow
size: Large
type: fiend
subtype: cattle
alignment: Unaligned
ac: 10
hp: 15
hit_dice: 2d10 + 4
modifier: 0
speed: 30 ft.
stats: [ 18, 10, 14, 2, 10, 4 ]
damage_resistances: cold, fire, poison
senses: darkvision 60 ft., passive Perception 10
cr: 1/2
traits:
  - name: Stench
    desc: Any creature other than a stench kow that starts its turn within 5 feet of the stench kow must succeed on a DC 12 Constitution saving throw or be poisoned until the start of the creature's next turn. On a successful saving throw, the creature is immune to the Stench of all stench kows for 1 hour.
actions:
  - name: Gore
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage. If the stench kow moved at least 20 feet straight toward the target immediately before the hit, the target takes an extra 7 (2d6) piercing damage."
```
