---
title: Precognitive Mage
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Precognitive Mage
size: Medium
type: humanoid
subtype: any race
alignment: Lawful Neutral
ac: 11
ac_class: 14 with *mage armour*
hp: 63
hit_dice: 14d8
modifier: 1
speed: 30 ft.
stats: [ 9, 13, 10, 18, 13, 11 ]
saves:
  - int: 6
  - wis: 3
skillsaves:
  - perception: 3
gear:
  - quarterstaff
senses: truesight 120 ft., passive Perception 13
languages: Common plus any one language
cr: "3"
traits:
  - name: Innate Spellcasting
    desc: |-
      The mage's innate spellcasting ability is Intelligence (spell save DC 14). It can cast the following spells, requiring no material components:

      **3/day:** *detect thoughts*, *mage armour*

      **1/day each:** *clairvoyance*, *locate object*
actions:
  - name: Quarterstaff
    desc: "*Melee Weapon Attack:* +1 to hit, reach 5 ft., one target. *Hit:* 2 (1d6 - 1) bludgeoning damage, or 3 (1d8 - 1) bludgeoning damage if used with two hands."
  - name: Glimpse the Temporal Flood (Recharge 5–6)
    desc: The mage targets one creature within 120 feet of it that it can see. The target takes 18 (4d8) psychic damage, and it must succeed on a DC 14 Intelligence saving throw or be stunned until the end of its next turn.
reactions:
  - name: Precognitive Insight (3/Day)
    desc: When the mage or a creature it can see makes an attack roll, a saving throw, or an ability check, the mage can cause the roll to be made with advantage or disadvantage.
```
