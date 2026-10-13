---
title: Githzerai Futurist
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githzerai Futurist
size: Medium
type: aberration
subtype: gith
alignment: Any alignment
ac: 16
ac_class: psychic defense
hp: 149
hit_dice: 23d8 + 46
modifier: 3
speed: 40 ft.
stats: [ 14, 17, 15, 17, 17, 13 ]
saves:
  - str: 6
  - dex: 7
  - int: 7
  - wis: 7
skillsaves:
  - arcana: 7
  - insight: 7
  - perception: 7
senses: truesight 30 ft., passive Perception 17
languages: Common, Gith
cr: "9"
traits:
  - name: Psychic Defense
    desc: While the githzerai is wearing no armour and wielding no shield, its AC includes its Wisdom modifier.
actions:
  - name: Multiattack
    desc: The githzerai makes three Unarmed Strike or Psychic Bolt attacks.
  - name: Unarmed Strike
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 12 (2d8 + 3) bludgeoning damage plus 11 (2d10) psychic damage."
  - name: Psychic Bolt
    desc: "*Ranged Spell Attack:* +7 to hit, range 60 ft., one creature. *Hit:* 21 (4d8 + 3) psychic damage."
  - name: Spellcasting (Psionics)
    desc: |-
      The githzerai casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 15):

      **At will:** *dispel magic*, *levitate* (self only), *mage hand* (the hand is invisible), *see invisibility*

      **1/day each:** *plane shift* (self only), *scrying* (as an action), *slow*, *telekinesis*
reactions:
  - name: Future Insight (3/Day)
    desc: When the githzerai or a creature it can see makes an attack roll, a saving throw, or an ability check, the githzerai can cause the roll to be made with advantage or disadvantage.
```
