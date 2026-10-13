---
title: Fury of Kostchtchie
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fury of Kostchtchie
size: Huge
type: fiend
subtype: demon
alignment: typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 216
hit_dice: 16d12 + 112
modifier: 0
speed: 40 ft.
stats: [ 26, 10, 25, 10, 12, 11 ]
saves:
  - con: 12
  - wis: 6
skillsaves:
  - athletics: 13
  - perception: 6
damage_resistances: fire, lightning, poison
damage_immunities: cold
condition_immunities: charmed, frightened, poisoned
senses: darkvision 120 ft., passive Perception 16
languages: Abyssal, Giant
cr: "14"
traits:
  - name: Chilling Aura
    desc: A creature that starts its turn within 10 feet of the fury must succeed on a DC 20 Constitution saving throw or take 11 (2d10) cold damage.
  - name: Magic Resistance
    desc: The fury has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The fury makes two Fist or Rock attacks.
  - name: Fist
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 17 (2d8 + 8) bludgeoning damage plus 10 (3d6) cold damage, or 17 (5d6) cold damage if the target took damage from the fury's Chilling Aura since the end of the fury's last turn."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +13 to hit, range 60/240 ft., one target. *Hit:* 30 (4d10 + 8) bludgeoning damage."
bonus_actions:
  - name: Charge
    desc: The fury can move up to its speed toward an enemy it can see.
```
