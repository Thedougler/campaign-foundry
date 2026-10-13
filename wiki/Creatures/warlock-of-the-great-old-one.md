---
title: Warlock of the Great Old One
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Humanoid
size: Medium
habitat:
  - Arctic
  - Hill
  - Mountain
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Warlock of the Great Old One
size: Medium
type: humanoid
alignment: Any alignment
ac: 13
ac_class: 16 with *mage armour*
hp: 91
hit_dice: 14d8 + 28
modifier: 3
speed: 30 ft.
stats: [ 9, 16, 15, 12, 12, 18 ]
saves:
  - wis: 4
  - cha: 7
skillsaves:
  - arcana: 4
  - history: 4
damage_resistances: psychic
gear:
  - dagger
senses: darkvision 60 ft., passive Perception 11
languages: any two languages, telepathy 30 ft.
cr: "6"
traits:
  - name: Whispering Aura
    desc: At the start of each of the warlock's turns, each creature of its choice within 10 feet of it must succeed on a DC 15 Wisdom saving throw or take 10 (3d6) psychic damage, provided that the warlock isn't incapacitated.
actions:
  - name: Multiattack
    desc: The warlock makes two Dagger attacks.
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 10 (3d6) psychic damage."
  - name: Howling Void
    desc: The warlock opens a momentary extraplanar rift within 60 feet of it. The rift is a scream-filled, 20-foot cube. Each creature in that area must make a DC 15 Wisdom saving throw. On a failed save, a creature takes 9 (2d8) psychic damage and is frightened of the warlock until the start of the warlock's next turn. On a successful save, a creature takes half as much damage and isn't frightened.
  - name: Spellcasting
    desc: |-
      The warlock casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 15): 

      **At will:** *detect magic*, *guidance*, *levitate*, *mage armour* (self only), *mage hand*, *minor illusion*, *prestidigitation*

      **1/day each:** arcane gate, *detect thoughts*, *true seeing*
```
