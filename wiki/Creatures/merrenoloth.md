---
title: Merrenoloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fiend
size: Medium
habitat:
  - Coastal
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Merrenoloth
size: Medium
type: fiend
subtype: yugoloth
alignment: Typically Neutral Evil
ac: 13
hp: 40
hit_dice: 9d8
modifier: 3
speed: 30 ft., swim 40 ft.
stats: [ 8, 17, 10, 17, 14, 11 ]
saves:
  - dex: 5
  - int: 5
skillsaves:
  - history: 5
  - nature: 5
  - perception: 4
  - survival: 4
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: poisoned
senses: blindsight 60 ft., darkvision 60 ft., passive Perception 14
languages: Abyssal, Infernal, telepathy 60 ft.
cr: "3"
traits:
  - name: Magic Resistance
    desc: The merrenoloth has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The merrenoloth makes one Oar attack and uses Fear Gaze.
  - name: Oar
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 8 (2d4 + 3) fire damage."
  - name: Fear Gaze
    desc: The merrenoloth targets one creature it can see within 60 feet of it. The target must succeed on a DC 13 Wisdom saving throw or become frightened of the merrenoloth for 1 minute. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Spellcasting
    desc: |-
      The merrenoloth casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *charm person*, *darkness*, *detect magic*, *dispel magic*, *gust of wind*

      **3/day:** *control water*
bonus_actions:
  - name: Teleport
    desc: The merrenoloth teleports, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see.
```
