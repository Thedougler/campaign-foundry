---
title: Hungry Sorrowsworn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Monstrosity
size: Medium
habitat:
  - Forest
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hungry Sorrowsworn
size: Medium
type: monstrosity
alignment: Typically Neutral Evil
ac: 17
ac_class: natural armour
hp: 225
hit_dice: 30d8 + 90
modifier: 0
speed: 30 ft.
stats: [ 19, 10, 17, 6, 11, 6 ]
damage_resistances: bludgeoning, piercing, slashing while in dim light or darkness
senses: darkvision 60 ft., passive Perception 10
languages: Common
cr: "11"
traits:
  - name: Life Hunger
    desc: "If a creature within 60 feet of the sorrowsworn regains hit points, the sorrowsworn gains two benefits until the end of its next turn: it has advantage on attack rolls, and its Bite deals an extra 22 (4d10) necrotic damage on a hit."
actions:
  - name: Multiattack
    desc: The sorrowsworn makes one Bite attack and one Claw attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage plus 13 (3d8) necrotic damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 18 (4d6 + 4) slashing damage. If the target is Medium or smaller, it is grappled (escape DC 16), and it is restrained until the grapple ends. While grappling a creature, the sorrowsworn can't make a Claw attack."
```
