---
title: Gnoll Witherling
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Undead
size: Medium
habitat:
  - Arctic
  - Forest
  - Grassland
  - Hill
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gnoll Witherling
size: Medium
type: undead
alignment: Typically Chaotic Evil
ac: 12
ac_class: natural armour
hp: 11
hit_dice: 2d8 + 2
modifier: -1
speed: 30 ft.
stats: [ 14, 8, 12, 5, 5, 5 ]
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: darkvision 60 ft., passive Perception 7
languages: understands Gnoll but can't speak
cr: 1/4
traits:
  - name: Unusual Nature
    desc: The witherling doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The witherling makes two Bite or Spiked Club attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) necrotic damage."
  - name: Spiked Club
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."
bonus_actions:
  - name: Rampage
    desc: After the witherling reduces a creature to 0 hit points with a melee attack on its turn, the gnoll moves up to half its speed and makes one Bite attack.
reactions:
  - name: Vengeful Strike
    desc: In response to a gnoll being reduced to 0 hit points within 30 feet of the witherling, the witherling makes one Bite or Spiked Club attack.
```
