---
title: Water Elemental Myrmidon
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
name: Water Elemental Myrmidon
size: Medium
type: elemental
alignment: Typically Neutral
ac: 18
ac_class: plate
hp: 127
hit_dice: 17d8 + 51
modifier: 2
speed: 40 ft., swim 40 ft.
stats: [ 18, 14, 16, 8, 10, 10 ]
damage_resistances: acid; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: paralysed, petrified, poisoned, prone
gear:
  - trident
senses: darkvision 60 ft., passive Perception 10
languages: Aquan, one language of its creator's choice
cr: "7"
actions:
  - name: Multiattack
    desc: The myrmidon makes three Trident attacks.
  - name: Trident
    desc: "*Melee or Ranged Weapon Attack:* +7 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 7 (1d6 + 4) force damage, or 8 (1d8 + 4) force damage if used with two hands to make a melee attack."
  - name: Freezing Strikes (Recharge 6)
    desc: The myrmidon uses Multiattack. Each attack that hits deals an extra 5 (1d10) cold damage. A target that is hit by one or more of these attacks has its speed reduced by 10 feet until the end of the myrmidon's next turn.
```
