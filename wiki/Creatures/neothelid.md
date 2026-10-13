---
title: Neothelid
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Aberration
size: Gargantuan
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Neothelid
size: Gargantuan
type: aberration
alignment: Typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 232
hit_dice: 15d20 + 75
modifier: -2
speed: 30 ft.
stats: [ 27, 7, 21, 3, 16, 12 ]
saves:
  - int: 1
  - wis: 8
  - cha: 6
senses: blindsight 120 ft. (blind beyond this radius), passive Perception 13
cr: "13"
traits:
  - name: Creature Sense
    desc: The neothelid is aware of the presence of creatures within 1 mile of it that have an Intelligence score of 4 or higher. It knows the distance and direction to each creature, as well as each creature's Intelligence score, but can't sense anything else about it. A creature protected by a *mind blank* spell, a *nondetection* spell, or similar magic can't be perceived in this manner.
  - name: Magic Resistance
    desc: The neothelid has advantage on saving throws against spells and other magical effects.
actions:
  - name: Tentacles
    desc: |-
      *Melee Weapon Attack:* +13 to hit, reach 15 ft., one target. *Hit:* 21 (3d8 + 8) bludgeoning damage plus 11 (2d10) psychic damage. If the target is a Large or smaller creature, it must succeed on a DC 18 Strength saving throw or be swallowed by the neothelid. A swallowed creature is blinded and restrained, it has total cover against attacks and other effects outside the neothelid, and it takes 21 (6d6) acid damage at the start of each of the neothelid's turns.

      If the neothelid takes 30 damage or more on a single turn from a creature inside it, the neothelid must succeed on a DC 18 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the neothelid. If the neothelid dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 20 feet of movement, exiting prone.
  - name: Acid Breath (Recharge 5–6)
    desc: The neothelid exhales acid in a 60-foot cone. Each creature in that area must make a DC 18 Dexterity saving throw, taking 35 (10d6) acid damage on a failed save, or half as much damage on a successful one.
  - name: Spellcasting (Psionics)
    desc: |-
      The neothelid casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 16):

      **At will:** *levitate*

      **1/day each:** *confusion*, *feeblemind*, *telekinesis*
```
