---
title: Android
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Android
size: Medium
type: construct
alignment: typically Lawful Neutral
ac: 15
ac_class: natural armour
hp: 91
hit_dice: 14d8 + 28
modifier: 4
speed: 30 ft., fly 30 ft. (hover; aerialist only), swim 30 ft. (diver only)
stats: [ 18, 18, 15, 12, 13, 10 ]
saves:
  - con: 5
  - wis: 4
skillsaves:
  - history: 4
  - perception: 7
damage_resistances: acid, fire
damage_immunities: cold, poison
condition_immunities: exhaustion, poisoned
senses: blindsight 60 ft. (sentry only), darkvision 60 ft., passive Perception 17
languages: Common plus the languages spoken by its creator
cr: "5"
traits:
  - name: Design Specialization
    desc: "When the android is created, it gains one of six possible designs suited for its role (choose or roll a d6): 1, aerialist; 2, diplomat; 3, diver; 4, duelist; 5, medic; 6, sentry. This design determines certain traits in this stat block."
  - name: Lightning Overload
    desc: When the android takes lightning damage, it must succeed on a DC 10 Constitution saving throw or have the stunned condition until the start of its next turn.
actions:
  - name: Multiattack
    desc: The android makes two Force Strike attacks.
  - name: Force Strike
    desc: "*Melee or Ranged Weapon Attack:* +7 to hit, reach 5 ft. or range 40/120 ft., one target. *Hit:* 15 (2d10 + 4) force damage. If the target is a Medium or smaller creature, it must succeed on a DC 15 Strength saving throw or have the prone condition."
  - name: Spellcasting (Diplomat and Medic Only)
    desc: |-
      The android casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability:

      **2/day each:** *Cure Wounds* (as a 3rd-level spell; medic only), *Identify*, *Tongues* (diplomat only)
reactions:
  - name: Parry (Duelist Only)
    desc: The android adds 3 to its AC against one melee attack roll that would hit it. To do so, the android must see the attacker.
```
