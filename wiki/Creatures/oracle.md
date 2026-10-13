---
title: Oracle
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Oracle
size: Medium
type: humanoid
alignment: Any alignment
ac: 15
ac_class: Blessings Of The Gods
hp: 44
hit_dice: 8d8 + 8
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 12, 13, 16, 15 ]
saves:
  - wis: 5
  - cha: 4
skillsaves:
  - insight: 5
  - persuasion: 4
  - religion: 5
senses: passive Perception 13
languages: Celestial, Common
cr: "4"
traits:
  - name: Innate Spellcasting
    desc: |-
      The oracle's spellcasting ability is Wisdom (spell save DC 13, +5 to hit with spell attacks). It can innately cast the following spells, requiring no material components:

      **At will:** *guidance*, *light*, *thaumaturgy*

      **3/day each:** *bless*, *guiding bolt*, *healing word*, *hold person*

      **1/day each:** *augury*, *scrying*
  - name: Blessings of the Gods
    desc: While the oracle is wearing no armour and wielding no shield, its AC includes its Wisdom modifier. In addition, a creature that hits the oracle with a melee attack while within 5 feet of it takes 9 (2d8) force damage.
actions:
  - name: Eldritch Touch
    desc: "*Melee Spell Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) force damage."
reactions:
  - name: Divine Insight (3/Day)
    desc: When the oracle or a creature it can see makes an attack roll, a saving throw, or an ability check, the oracle can cause the roll to be made with advantage or disadvantage.
```
