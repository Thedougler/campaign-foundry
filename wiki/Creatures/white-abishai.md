---
title: White Abishai
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Fiend
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: White Abishai
size: Medium
type: fiend
subtype: devil
alignment: Typically Lawful Evil
ac: 15
ac_class: natural armour
hp: 68
hit_dice: 8d8 + 32
modifier: 0
speed: 30 ft., fly 40 ft.
stats: [ 16, 11, 18, 11, 12, 13 ]
saves:
  - str: 6
  - con: 7
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: cold, fire, poison
condition_immunities: poisoned
gear:
  - longsword
senses: darkvision 120 ft., passive Perception 11
languages: Draconic, Infernal, telepathy 120 ft.
cr: "6"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the abishai's darkvision.
  - name: Magic Resistance
    desc: The abishai has advantage on saving throws against spells and other magical effects.
  - name: Reckless
    desc: At the start of its turn, the abishai can gain advantage on all melee weapon attack rolls during that turn, but attack rolls against it have advantage until the start of its next turn.
actions:
  - name: Multiattack
    desc: The abishai makes one Bite attack, one Claw attack, and one Longsword attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 3 (1d6) cold damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d10 + 3) slashing damage."
  - name: Longsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) force damage, or 8 (1d10 + 3) force damage if used with two hands."
reactions:
  - name: Vicious Reprisal
    desc: In response to taking damage, the abishai makes one Bite attack against a random creature within 5 feet of it. If no creature is within reach, the abishai moves up to half its speed toward an enemy it can see, without provoking opportunity attacks.
```
