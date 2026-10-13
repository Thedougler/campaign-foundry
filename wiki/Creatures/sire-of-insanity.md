---
title: Sire of Insanity
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sire of Insanity
size: Huge
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 17
ac_class: natural armour
hp: 157
hit_dice: 15d12 + 60
modifier: -2
speed: 40 ft.
stats: [ 23, 6, 19, 14, 19, 22 ]
saves:
  - con: 8
  - int: 6
  - wis: 8
  - cha: 10
skillsaves:
  - deception: 10
  - intimidation: 10
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: poisoned
senses: truesight 120 ft., passive Perception 14
languages: Abyssal, Common, telepathy 120 ft.
cr: "12"
traits:
  - name: Innate Spellcasting
    desc: |-
      The sire's innate spellcasting ability is Charisma (spell save DC 18, +10 to hit with spell attacks). The sire can innately cast the following spells, requiring no material components:

      **At will:** *clairvoyance*, crown of madness, *major image*, *suggestion*

      **1/day each:** *confusion*, *mass suggestion*
  - name: Aura of Mind Erosion
    desc: Any creature that starts its turn within 30 feet of the sire must make a DC 18 Wisdom saving throw. On a successful save, the creature is immune to this aura for the next 24 hours. On a failed save, the creature has disadvantage for 1 minute on Wisdom and Charisma checks and on Wisdom and Charisma saves. At the start of each of its turns, the sire can suppress this aura until the start of its next turn.
  - name: Magic Resistance
    desc: The sire has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: "The sire makes two attacks: one with its bite and one with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one creature. *Hit:* 25 (3d12 + 6) piercing damage plus 16 (3d10) psychic damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 10 (1d8 + 6) slashing damage plus 9 (2d8) psychic damage."
```
