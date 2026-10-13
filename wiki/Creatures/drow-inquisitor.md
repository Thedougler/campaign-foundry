---
title: Drow Inquisitor
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Drow Inquisitor
size: Medium
type: humanoid
subtype: cleric, Drow elf
alignment: Typically Neutral Evil
ac: 16
ac_class: breastplate
hp: 149
hit_dice: 23d8 + 46
modifier: 2
speed: 30 ft.
stats: [ 11, 15, 14, 16, 21, 20 ]
saves:
  - con: 7
  - wis: 10
  - cha: 10
skillsaves:
  - insight: 10
  - perception: 10
  - religion: 8
  - stealth: 7
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 20
languages: Elvish, Undercommon
cr: "14"
traits:
  - name: Discern Lie
    desc: The drow discerns when a creature in earshot speaks a lie in a language the drow knows.
  - name: Fey Ancestry
    desc: The drow has advantage on saving throws against being charmed, and magic can't put the drow to sleep.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The drow makes three Death Lance attacks.
  - name: Death Lance
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 8 (1d6 + 5) piercing damage plus 18 (4d8) necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken. This reduction lasts until the target finishes a long rest. The target dies if its hit point maximum is reduced to 0."
  - name: Spellcasting
    desc: |-
      The drow casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 18):

      **At will:** *dancing lights*, *detect magic*, *message*, *thaumaturgy*

      **1/day each:** *clairvoyance*, *darkness*, *detect thoughts*, *dispel magic*, *faerie fire*, *levitate* (self only), *silence*, *suggestion*, *true seeing*
bonus_actions:
  - name: Spectral Dagger (Recharges after a Short or Long Rest)
    desc: |-
      The drow conjures a floating, spectral dagger within 60 feet of itself. The drow can make a melee spell attack (+10 to hit) against one creature within 5 feet of the dagger. On a hit, the target takes 9 (1d8 + 5) force damage.

      The dagger lasts for 1 minute. As a bonus action on later turns, the drow can move the dagger up to 20 feet and repeat the attack against one creature within 5 feet of the dagger.
```
