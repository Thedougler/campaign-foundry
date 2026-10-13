---
title: Fraternity of Order Law Bender
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fraternity of Order Law Bender
size: Small or Medium
type: humanoid
alignment: Any alignment
ac: 12
ac_class: 15 with *mage armour*
hp: 137
hit_dice: 25d8 + 25
modifier: 2
speed: 30 ft.
stats: [ 8, 15, 12, 19, 16, 14 ]
saves:
  - con: 5
  - wis: 7
skillsaves:
  - insight: 7
  - perception: 7
senses: passive Perception 17
languages: Common plus three more languages
cr: "9"
actions:
  - name: Multiattack
    desc: The law bender makes three Arcane Burst attacks and uses Power of Authority or Spellcasting.
  - name: Arcane Burst
    desc: "*Melee or Ranged Spell Attack:* +8 to hit, reach 5 ft. or range 90 ft., one target. *Hit:* 17 (2d12 + 4) force damage."
  - name: Power of Authority
    desc: The law bender targets a creature it can see within 60 feet of itself. The target must succeed on a DC 16 Intelligence saving throw or take 10 (3d6) psychic damage and have the incapacitated condition for 1 minute. At the end of each of the target's turns, it can repeat the saving throw, ending the incapacitated condition on itself on a success. A target that succeeds on the saving throw becomes immune to this law bender's Power of Authority for 24 hours.
  - name: Spellcasting
    desc: |-
      The law bender casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability:

      **At will:** *dispel magic*, *fly*, *mage armour*, *mage hand*, *prestidigitation*
bonus_actions:
  - name: Spatial Loophole
    desc: The law bender teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see.
reactions:
  - name: Probability Loophole (3/Day)
    desc: When the law bender or a creature it can see makes an attack roll, a saving throw, or an ability check, the law bender can cause the roll to be made with advantage or disadvantage.
```
