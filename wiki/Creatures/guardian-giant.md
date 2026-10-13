---
title: Guardian Giant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Guardian Giant
size: Huge
type: giant
alignment: Lawful Neutral
ac: 19
ac_class: half plate armour, shield
hp: 137
hit_dice: 11d12 + 66
modifier: 3
speed: 40 ft.
stats: [ 24, 17, 22, 10, 18, 12 ]
saves:
  - dex: 6
  - wis: 7
skillsaves:
  - insight: 7
  - perception: 10
gear:
  - spear
senses: passive Perception 20
languages: Common, Giant
cr: "8"
traits:
  - name: Vigilant
    desc: The giant can't be surprised.
actions:
  - name: Multiattack
    desc: The giant makes three spear attacks.
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +10 to hit, reach 10 ft. or range 60/240 ft., one target. *Hit:* 17 (3d6 + 7) piercing damage, or 20 (3d8 + 7) piercing damage if used with two hands to make a melee attack."
reactions:
  - name: Protection
    desc: When an attacker the giant can see makes an attack roll against a creature within 10 feet of the giant, the giant can impose disadvantage on the attack roll.
```
