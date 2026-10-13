---
title: Astral Elf Star Priest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Astral Elf Star Priest
size: Medium
type: humanoid
subtype: cleric
alignment: Any alignment
ac: 13
ac_class: chain shirt
hp: 90
hit_dice: 20d8
modifier: 0
speed: 30 ft.
stats: [ 11, 11, 10, 16, 20, 17 ]
saves:
  - int: 6
  - wis: 8
  - cha: 6
skillsaves:
  - medicine: 8
  - religion: 6
gear:
  - morningstar
senses: darkvision 60 ft., passive Perception 15
languages: Celestial, Common, Elvish
cr: "5"
traits:
  - name: Fey Ancestry
    desc: The elf has advantage on saving throws it makes to avoid or end the charmed condition on itself, and magic can't put it to sleep.
  - name: Unusual Nature
    desc: The elf doesn't require sleep.
actions:
  - name: Multiattack
    desc: The elf makes two Morningstar attacks. It can use Rain of Radiance in place of one of these attacks.
  - name: Morningstar
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d8) piercing damage plus 17 (5d6) radiant damage."
  - name: Rain of Radiance
    desc: Magical, flame-like radiance rains down on a creature that the elf can see within 60 feet of itself. The target must make a DC 16 Dexterity saving throw, taking 22 (5d8) radiant damage on a failed save, or half as much damage on a successful one.
  - name: Spellcasting
    desc: |-
      The elf casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 16):

      **2/day each:** *cure wounds* (8th-level version), *hold person*

      **1/day each:** *divination*, *sending*, *word of recall*
bonus_actions:
  - name: Starlight Step (2/Day)
    desc: The elf magically teleports up to 30 feet, along with anything it is wearing or carrying, to an unoccupied space it can see.
```
