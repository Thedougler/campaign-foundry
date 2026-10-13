---
title: Draconian Foot Soldier
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Draconian Foot Soldier
size: Medium
type: monstrosity
alignment: Any alignment
ac: 14
ac_class: natural armour
hp: 22
hit_dice: 4d8 + 4
modifier: 0
speed: 30 ft.
stats: [ 13, 11, 13, 8, 8, 10 ]
gear:
  - shortsword
senses: darkvision 60 ft., passive Perception 9
languages: Common, Draconic
cr: 1/2
traits:
  - name: Controlled Fall
    desc: When the draconian falls and isn't incapacitated, it subtracts up to 100 feet from the fall when calculating the fall's damage.
  - name: Death Throes
    desc: When the draconian is reduced to 0 hit points, its body turns to stone and releases a petrifying gas. Each creature within 5 feet of the draconian must succeed on a DC 11 Constitution saving throw or be restrained as it begins to turn to stone. The restrained creature must repeat the saving throw at the end of its next turn. On a success, the effect ends; otherwise the creature is petrified for 1 minute. After 1 minute, the body of the draconian crumbles to dust.
actions:
  - name: Multiattack
    desc: The draconian makes two Shortsword attacks.
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d6 + 1) piercing damage."
```
