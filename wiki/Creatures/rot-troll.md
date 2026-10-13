---
title: Rot Troll
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Giant
size: Large
habitat:
  - Desert
  - Forest
  - Swamp
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Rot Troll
size: Large
type: giant
alignment: Typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 138
hit_dice: 12d10 + 72
modifier: 1
speed: 30 ft.
stats: [ 18, 13, 22, 5, 8, 4 ]
skillsaves:
  - perception: 3
damage_immunities: necrotic
senses: darkvision 60 ft., passive Perception 13
languages: Giant
cr: "9"
traits:
  - name: Rancid Degeneration
    desc: At the end of each of the troll's turns, each creature within 5 feet of it takes 11 (2d10) necrotic damage, unless the troll has taken acid or fire damage since the end of its last turn.
actions:
  - name: Multiattack
    desc: The troll makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 9 (1d10 + 4) piercing damage plus 16 (3d10) necrotic damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage plus 7 (2d6) necrotic damage."
```
