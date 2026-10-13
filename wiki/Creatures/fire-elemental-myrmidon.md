---
title: Fire Elemental Myrmidon
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
name: Fire Elemental Myrmidon
size: Medium
type: elemental
alignment: Typically Neutral
ac: 18
ac_class: plate
hp: 123
hit_dice: 19d8 + 38
modifier: 4
speed: 40 ft.
stats: [ 13, 18, 15, 9, 10, 10 ]
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: fire, poison
condition_immunities: paralysed, petrified, poisoned, prone
gear:
  - scimitar
senses: darkvision 60 ft., passive Perception 10
languages: Ignan, one language of its creator's choice
cr: "7"
traits:
  - name: Illumination
    desc: The myrmidon sheds bright light in a 20-foot radius and dim light in a 40-foot radius.
  - name: Water Susceptibility
    desc: For every 5 feet the myrmidon moves in 1 foot or more of water, it takes 2 (1d4) cold damage.
actions:
  - name: Multiattack
    desc: The myrmidon makes three Scimitar attacks.
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) force damage."
  - name: Fiery Strikes (Recharge 6)
    desc: The myrmidon uses Multiattack. Each attack that hits deals an extra 7 (2d6) fire damage.
```
