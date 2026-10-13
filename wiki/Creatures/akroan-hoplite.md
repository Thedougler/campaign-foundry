---
title: Akroan Hoplite
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Akroan Hoplite
size: Medium
type: humanoid
alignment: Any alignment
ac: 18
ac_class: breastplate, shield
hp: 52
hit_dice: 8d8 + 16
modifier: 3
speed: 30 ft.
stats: [ 16, 16, 14, 11, 14, 13 ]
saves:
  - str: 5
  - dex: 5
gear:
  - spear
senses: passive Perception 12
languages: Common
cr: "3"
traits:
  - name: Hold the Line
    desc: While the hoplite is holding a spear, other creatures provoke an opportunity attack from the hoplite when they move within 5 feet of it. When the hoplite hits a creature with an opportunity attack using its spear, the creature takes an extra 4 (1d8) piercing damage, and the creature's speed becomes 0 for the rest of the turn.
actions:
  - name: Multiattack
    desc: The hoplite makes three melee attacks or two ranged attacks.
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft., or range 20/60 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage, or 7 (1d8 + 3) piercing damage if used with two hands to make a melee attack."
  - name: Shield Bash
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one creature. *Hit:* 5 (1d4 + 3) bludgeoning damage. If the target is a Medium or smaller creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
```
