---
title: Fire Giant of Evil Fire
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fire Giant of Evil Fire
size: Huge
type: giant
alignment: typically Lawful Evil
ac: 18
ac_class: plate
hp: 150
hit_dice: 12d12 + 72
modifier: -1
speed: 30 ft.
stats: [ 25, 9, 23, 10, 19, 14 ]
saves:
  - con: 10
  - wis: 8
  - cha: 6
skillsaves:
  - athletics: 11
  - perception: 8
damage_immunities: fire
senses: passive Perception 18
languages: Common, Giant, Ignan
cr: "10"
traits:
  - name: Shrapnel Explosion
    desc: When the giant drops to 0 hit points, its armour explodes, destroying the giant's body and scattering the armour as shrapnel. Creatures within 10 feet of the giant when its armour explodes must make a DC 18 Dexterity saving throw, taking 21 (6d6) piercing damage on a failed save, or half as much damage on a successful one.
actions:
  - name: Multiattack
    desc: The giant makes two Searing Sceptre attacks or two Bolt of Imix attacks.
  - name: Searing Sceptre
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 17 (3d6 + 7) bludgeoning damage plus 9 (2d8) fire damage, and the target is magically branded. While branded in this way, the target becomes visible if it's invisible, can't become invisible, and sheds dim light in a 5-foot radius. The brand disappears after 24 hours, or it can be removed from a creature or an object by any spell that ends a curse."
  - name: Bolt of Imix
    desc: "*Ranged Spell Attack:* +8 to hit, range 120 ft., one target. *Hit:* 20 (3d10 + 4) fire damage, and the target must succeed on a DC 16 Wisdom saving throw or have the frightened condition until the end of the target's next turn."
```
