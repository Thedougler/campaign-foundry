---
title: Gnoll Hunter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Monstrosity
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
name: Gnoll Hunter
size: Medium
type: monstrosity
alignment: Typically Chaotic Evil
ac: 13
ac_class: leather armour
hp: 22
hit_dice: 4d8 + 4
modifier: 2
speed: 30 ft.
stats: [ 14, 14, 12, 8, 12, 8 ]
skillsaves:
  - perception: 3
  - stealth: 4
gear:
  - longbow
  - spear
senses: darkvision 60 ft., passive Perception 13
languages: Gnoll
cr: 1/2
actions:
  - name: Multiattack
    desc: The gnoll makes two Bite, Spear, or Longbow attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage when used with two hands to make a melee attack."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +4 to hit, range 150/600 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage, and the target's speed is reduced by 10 feet until the end of its next turn."
bonus_actions:
  - name: Rampage
    desc: After the gnoll reduces a creature to 0 hit points with a melee attack on its turn, the gnoll moves up to half its speed and makes a Bite attack.
```
