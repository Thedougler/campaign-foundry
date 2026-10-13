---
title: Ancient Deep Crow
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Acquisitions Incorporated
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Deep Crow
size: Huge
type: monstrosity
alignment: Unaligned
ac: 18
ac_class: natural armour
hp: 187
hit_dice: 15d12 + 90
modifier: 3
speed: 20 ft., fly 80 ft.
stats: [ 23, 16, 23, 10, 15, 19 ]
saves:
  - con: 11
  - wis: 7
skillsaves:
  - perception: 7
  - stealth: 13
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 17
languages: Deep Crow
cr: "15"
traits:
  - name: Magic Resistance
    desc: The ancient deep crow has advantage on saving throws against spells and other magical effects.
  - name: Shadow Stealth
    desc: While in dim light or darkness, the ancient deep crow can take the Hide action as a bonus action.
actions:
  - name: Multiattack
    desc: "The ancient deep crow makes three attacks: one with its mandibles and two with its claws."
  - name: Mandibles
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 17 (2d10 + 6) piercing damage, and the target is grappled (escape DC 19). Until this grapple ends, the target is restrained, and the ancient deep crow can't use its mandibles on another target."
  - name: Claw
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 13 (2d6 + 6) slashing damage."
  - name: Shadow Caw
    desc: The ancient deep crow releases an ear-splitting caw. Each creature within 60 feet of the crow and able to hear it must make a DC 17 Constitution saving throw. On a failure, a creature takes 10 (3d6) psychic damage.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the ancient deep crow can expend a use to take one of the following actions. The ancient deep crow regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Detect
    desc: The deep crow makes a Wisdom (Perception) check.
  - name: Shadow Caw (Costs 2 Actions)
    desc: The ancient deep crow uses Shadow Caw.
  - name: Wing Attack (Costs 2 Actions)
    desc: The ancient deep crow beats its wings. Each creature within 10 feet of the deep crow must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The ancient deep crow can then fly up to half its flying speed.
```
