---
title: Maw of Yeenoghu
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Maw of Yeenoghu
size: Huge
type: fiend
subtype: demon
alignment: typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 161
hit_dice: 14d12 + 70
modifier: 0
speed: 40 ft.
stats: [ 23, 10, 21, 8, 14, 10 ]
saves:
  - con: 9
  - cha: 4
skillsaves:
  - perception: 6
senses: darkvision 60 ft., passive Perception 16
languages: Abyssal, Giant
cr: "10"
traits:
  - name: Magic Resistance
    desc: The maw has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The maw makes two Bite or Fang Fling attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 19 (2d12 + 6) piercing damage."
  - name: Fang Fling
    desc: "*Ranged Weapon Attack:* +10 to hit, range 30/90 ft., one target. *Hit:* 11 (1d10 + 6) piercing damage."
  - name: Gorging Charge (Recharge 5–6)
    desc: The maw moves up to its speed without provoking opportunity attacks and can move through the spaces of Large or smaller creatures. Each time the maw enters a creature's space for the first time during this move, that creature must succeed on a DC 18 Strength saving throw or take 25 (3d12 + 6) piercing damage and have the grappled condition (escape DC 16); if a creature is already grappled this way, it has the prone condition. Until this grapple ends, the target has the restrained condition. The maw can have only one creature grappled in this way at a time.
reactions:
  - name: Fanged Rebuke
    desc: In response to taking damage, the maw makes one Bite attack against a random creature within 10 feet of itself. If no creature is within reach, the maw can make two Fang Fling attacks.
```
