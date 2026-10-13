---
title: Archer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat:
  - Forest
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Archer
size: Medium
type: humanoid
alignment: Any alignment
ac: 16
ac_class: studded leather
hp: 75
hit_dice: 10d8 + 30
modifier: 4
speed: 30 ft.
stats: [ 11, 18, 16, 11, 13, 10 ]
skillsaves:
  - acrobatics: 6
  - perception: 5
gear:
  - longbow
  - shortsword
senses: passive Perception 15
languages: any one language (usually Common)
cr: "3"
actions:
  - name: Multiattack
    desc: The archer makes two Shortsword or Longbow attacks.
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +6 to hit, range 150/600 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage."
bonus_actions:
  - name: Archer's Eye (3/Day)
    desc: Immediately after making an attack roll or a damage roll with a ranged weapon, the archer can roll a d10 and add the number rolled to the total.
```
