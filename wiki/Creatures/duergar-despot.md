---
title: Duergar Despot
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Humanoid
size: Medium
habitat:
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Duergar Despot
size: Medium
type: humanoid
subtype: dwarf
alignment: Any alignment
ac: 21
ac_class: natural armour
hp: 119
hit_dice: 14d8 + 56
modifier: -3
speed: 25 ft.
stats: [ 20, 5, 19, 15, 14, 13 ]
saves:
  - con: 8
  - wis: 6
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: darkvision 120 ft., passive Perception 12
languages: Dwarvish, Undercommon
cr: "12"
traits:
  - name: Magic Resistance
    desc: The duergar has advantage on saving throws against spells and other magical effects.
  - name: Psychic Engine
    desc: When the duergar suffers a critical hit or is reduced to 0 hit points, psychic energy erupts from its frame to deal 14 (4d6) psychic damage to each creature within 5 feet of it.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the duergar has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The duergar makes two Iron Fist attacks and two Stomping Foot attacks. After one of the attacks, the duergar can move up to its speed without provoking opportunity attacks. It can replace one of the attacks with a use of Flame Jet.
  - name: Iron Fist
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 23 (4d8 + 5) bludgeoning damage. If the target is a Large or smaller creature, it must succeed on a DC 17 Strength saving throw or be pushed up to 30 feet away in a straight line and be knocked prone."
  - name: Stomping Foot
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 10 (1d10 + 5) bludgeoning damage, or 21 (3d10 + 5) to a prone target."
  - name: Flame Jet
    desc: The duergar spews flames in a line 100 feet long and 5 feet wide. Each creature in the line must make a DC 16 Dexterity saving throw, taking 18 (4d8) fire damage on a failed save, or half as much damage on a successful one.
  - name: Spellcasting (Psionics)
    desc: |-
      The duergar casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 12):

      **At will:** *mage hand*, *minor illusion*

      **1/day:** *stinking cloud*
```
