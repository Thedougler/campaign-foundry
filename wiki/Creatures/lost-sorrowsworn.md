---
title: Lost Sorrowsworn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Monstrosity
size: Medium
habitat:
  - Arctic
  - Desert
  - Forest
  - Mountain
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lost Sorrowsworn
size: Medium
type: monstrosity
alignment: Typically Neutral Evil
ac: 15
ac_class: natural armour
hp: 78
hit_dice: 12d8 + 24
modifier: 1
speed: 30 ft.
stats: [ 17, 12, 15, 6, 7, 5 ]
skillsaves:
  - athletics: 6
damage_resistances: bludgeoning, piercing, slashing while in dim light or darkness
senses: darkvision 60 ft., passive Perception 8
languages: Common
cr: "7"
actions:
  - name: Multiattack
    desc: The sorrowsworn makes two Arm Spike attacks.
  - name: Arm Spike
    desc: "*Melee Weapon Attack:* +6 to hit, reach 10 ft., one target. *Hit:* 14 (2d10 + 3) piercing damage."
  - name: Embrace (Recharge 4–6)
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 25 (4d10 + 3) piercing damage, and the target is grappled (escape DC 14) if it is a Medium or smaller creature. Until the grapple ends, the target is frightened, and it takes 27 (6d8) psychic damage at the end of each of its turns. The sorrowsworn can grapple only one creature at a time."
reactions:
  - name: Tightening Embrace
    desc: If the sorrowsworn takes damage, the creature grappled by Embrace takes 18 (4d8) psychic damage.
```
