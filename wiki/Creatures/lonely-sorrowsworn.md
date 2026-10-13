---
title: Lonely Sorrowsworn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Monstrosity
size: Medium
habitat:
  - Coastal
  - Desert
  - Mountain
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lonely Sorrowsworn
size: Medium
type: monstrosity
alignment: Typically Neutral Evil
ac: 16
ac_class: natural armour
hp: 112
hit_dice: 15d8 + 45
modifier: 1
speed: 30 ft.
stats: [ 16, 12, 17, 6, 11, 6 ]
damage_resistances: bludgeoning, piercing, slashing while in dim light or darkness
senses: darkvision 60 ft., passive Perception 10
languages: Common
cr: "9"
traits:
  - name: Psychic Leech
    desc: At the start of each of the sorrowsworn's turns, each creature within 5 feet of it must succeed on a DC 15 Wisdom saving throw or take 10 (3d6) psychic damage.
  - name: Thrives on Company
    desc: The sorrowsworn has advantage on attack rolls while it is within 30 feet of at least two other creatures. It otherwise has disadvantage on attack rolls.
actions:
  - name: Multiattack
    desc: The sorrowsworn makes one Harpoon Arm attack, and it uses Sorrowful Embrace.
  - name: Harpoon Arm
    desc: "*Melee Weapon Attack:* +7 to hit, reach 60 ft., one target. *Hit:* 21 (4d8 + 3) piercing damage, and the target is grappled (escape DC 15) if it is a Large or smaller creature. The sorrowsworn has two harpoon arms and can grapple up to two creatures at once."
  - name: Sorrowful Embrace
    desc: Each creature grappled by the sorrowsworn must make a DC 15 Wisdom saving throw, taking 18 (4d8) psychic damage on a failed save, or half as much damage on a successful one. In either case, the sorrowsworn pulls each of those creatures up to 30 feet straight toward it.
```
