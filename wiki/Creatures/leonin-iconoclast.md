---
title: Leonin Iconoclast
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Leonin Iconoclast
size: Medium
type: humanoid
subtype: leonin
alignment: Any alignment
ac: 17
ac_class: Unarmored Defense
hp: 67
hit_dice: 9d8 + 27
modifier: 4
speed: 40 ft.
stats: [ 14, 18, 16, 13, 17, 10 ]
saves:
  - dex: 7
  - wis: 6
skillsaves:
  - arcana: 4
  - insight: 6
  - intimidation: 3
  - stealth: 7
  - survival: 6
gear:
  - dart
senses: darkvision 60 ft., passive Perception 13
languages: Common, Leonin
cr: "5"
traits:
  - name: Innate Spellcasting
    desc: |-
      The leonin's spellcasting ability is Wisdom (spell save DC 14). It can innately cast the following spells, requiring no material components:

      **1/day each:** *banishment*, *detect evil and good*
  - name: Evasion
    desc: If the leonin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails. It can't use this trait if it's incapacitated.
  - name: Unarmored Defense
    desc: While the leonin is wearing no armour and wielding no shield, its AC includes its Wisdom modifier.
actions:
  - name: Multiattack
    desc: The leonin makes three weapon attacks.
  - name: Claws
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage plus 7 (2d6) force damage."
  - name: Dart
    desc: "*Ranged Weapon Attack:* +7 to hit, range 20/60 ft., one target. *Hit:* 6 (1d4 + 4) piercing damage."
```
