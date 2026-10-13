---
title: Yuan-ti Broodguard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Monstrosity
size: Medium
habitat:
  - Desert
  - Forest
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yuan-ti Broodguard
size: Medium
type: monstrosity
alignment: Typically Neutral Evil
ac: 14
ac_class: natural armour
hp: 45
hit_dice: 7d8 + 14
modifier: 2
speed: 30 ft.
stats: [ 15, 14, 14, 6, 11, 4 ]
saves:
  - str: 4
  - dex: 4
  - wis: 2
skillsaves:
  - perception: 2
damage_immunities: poison
condition_immunities: charmed, paralysed, poisoned
senses: darkvision 60 ft., passive Perception 12
languages: Abyssal, Common, Draconic
cr: "2"
traits:
  - name: Reckless
    desc: At the start of its turn, the broodguard can gain advantage on all melee weapon attack rolls it makes during that turn, but attack rolls against it have advantage until the start of its next turn.
actions:
  - name: Multiattack
    desc: The broodguard makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage."
```
