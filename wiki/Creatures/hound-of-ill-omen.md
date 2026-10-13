---
title: Hound of Ill Omen
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Xanathar's Guide to Everything
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hound of Ill Omen
size: Medium
type: monstrosity
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 37
hit_dice: 5d10 + 10
modifier: 2
speed: 50 ft.
stats: [ 17, 15, 15, 3, 12, 7 ]
skillsaves:
  - perception: 3
  - stealth: 4
senses: passive Perception 13
cr: "1"
traits:
  - name: Keen Hearing and Smell
    desc: The hound has advantage on Wisdom (Perception) checks that rely on hearing or smell.
  - name: Pack Tactics
    desc: The hound has advantage on an attack roll against a creature if at least one of the hound's allies is within 5 feet of the creature and the ally isn't incapacitated.
  - name: Cloak of Shadows
    desc: The hound appears with a number of temporary hit points equal to half your sorcerer level.
  - name: Incorporeal Movement
    desc: The hound can move through other creatures and objects as if they were difficult terrain. The hound takes 5 force damage if it ends its turn inside an object.
  - name: Omen Sight
    desc: At the start of its turn, the hound automatically knows its target's location. If the target was hidden, it is no longer hidden from the hound.
  - name: Ever at Your Heels
    desc: On its turn, it can move only toward its target by the most direct route, and it can use its action only to attack its target. The hound can make opportunity attacks, but only against its target. Additionally, while the hound is within 5 feet of the target, the target has disadvantage on saving throws against any spell you cast. The hound disappears if it is reduced to 0 hit points, if its target is reduced to 0 hit points, or after 5 minutes.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
```
