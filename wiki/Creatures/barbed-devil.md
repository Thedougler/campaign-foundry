---
title: Barbed Devil
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Fiend
size: Medium
habitat:
  - Planar (Nine Hells)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Barbed Devil
size: Medium
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 15
hp: 110
hit_dice: 13d8 + 52
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 16, 17, 18, 12, 14, 14 ]
saves:
  - str: 6
  - con: 7
  - wis: 5
  - cha: 5
skillsaves:
  - deception: 5
  - insight: 5
  - perception: 8
damage_resistances: cold
damage_immunities: fire, poison
condition_immunities: poisoned
senses: Darkvision 120 ft. (unimpeded by magical Darkness), passive Perception 18
languages: Infernal; telepathy 120 ft.
cr: "5"
traits:
  - name: Barbed Hide
    desc: At the start of each of its turns, the devil deals 5 (1d10) Piercing damage to any creature it is grappling or any creature grappling it.
  - name: Diabolical Restoration
    desc: If the devil dies outside the Nine Hells, its body disappears in sulphurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - name: Magic Resistance
    desc: The devil has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The devil makes one Claws attack and one Tail attack, or it makes two Hurl Flame attacks.
  - name: Claws
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 10 (2d6 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13) from both claws."
  - name: Tail
    desc: "*Melee Attack Roll:* +6, reach 10 ft. *Hit:* 14 (2d10 + 3) Slashing damage."
  - name: Hurl Flame
    desc: "*Ranged Attack Roll:* +5, range 150 ft. *Hit:* 17 (5d6) Fire damage. If the target is a flammable object that isn't being worn or carried, it starts burning."
```
