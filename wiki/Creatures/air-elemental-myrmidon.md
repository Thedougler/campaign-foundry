---
title: Air Elemental Myrmidon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Elemental
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Air Elemental Myrmidon
size: Medium
type: elemental
alignment: Typically Neutral
ac: 18
ac_class: plate
hp: 117
hit_dice: 18d8 + 36
modifier: 2
speed: 30 ft., fly 30 ft. (hover)
stats: [ 18, 14, 14, 9, 10, 10 ]
damage_resistances: lightning; thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: paralysed, petrified, poisoned, prone
gear:
  - flail
senses: darkvision 60 ft., passive Perception 10
languages: Auran, one language of its creator's choice
cr: "7"
actions:
  - name: Multiattack
    desc: The myrmidon makes three Flail attacks.
  - name: Flail
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) force damage."
  - name: Lightning Strike (Recharge 6)
    desc: The myrmidon makes one Flail attack. On a hit, the target takes an extra 18 (4d8) lightning damage, and the target must succeed on a DC 13 Constitution saving throw or be stunned until the end of the myrmidon's next turn.
```
