---
title: Orc Nurtured One of Yurtrus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
  - Mountain
  - Grassland
  - Forest
  - Hill
sourcebooks:
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Orc Nurtured One of Yurtrus
size: Medium
type: humanoid
subtype: orc
alignment: Chaotic Evil
ac: 9
hp: 30
hit_dice: 4d8 + 12
modifier: -1
speed: 30 ft.
stats: [ 15, 8, 16, 7, 11, 7 ]
senses: darkvision 60 ft., passive Perception 10
languages: Common, Orc
cr: 1/2
traits:
  - name: Aggressive
    desc: As a bonus action, the orc can move up to its speed toward a hostile creature that it can see.
  - name: Corrupted Carrier
    desc: When the orc is reduced to 0 hit points, it explodes, and any creature within 10 feet of it must make a DC 13 Constitution saving throw. On a failed save, the creature takes 14 (4d6) poison damage and becomes poisoned. On a success, the creature takes half as much damage and isn't poisoned. A creature poisoned by this effect can repeat the save at the end of each of its turn, ending the effect on itself on a success. While poisoned by this effect, a creature can't regain hit points.
  - name: Nurtured One of Yurtrus
    desc: The orc has advantage on saving throws against poison and disease.
actions:
  - name: Claws
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) slashing damage plus 2 (1d4) necrotic damage."
  - name: Corrupted Vengeance
    desc: The orc reduces itself to 0 hit points, triggering its Corrupted Carrier trait.
```
