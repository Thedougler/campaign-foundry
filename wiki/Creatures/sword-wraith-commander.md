---
title: Sword Wraith Commander
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Undead
size: Medium
habitat:
  - Grassland
  - Swamp
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sword Wraith Commander
size: Medium
type: undead
alignment: Typically Lawful Evil
ac: 18
ac_class: breastplate, shield
hp: 127
hit_dice: 15d8 + 60
modifier: 2
speed: 30 ft.
stats: [ 18, 14, 18, 11, 12, 14 ]
skillsaves:
  - perception: 4
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: exhaustion, frightened, poisoned, unconscious
gear:
  - longbow
  - longsword
senses: darkvision 60 ft., passive Perception 14
languages: the languages it knew in life
cr: "8"
traits:
  - name: Turning Defiance
    desc: The commander and any other sword wraiths within 30 feet of it have advantage on saving throws against effects that turn Undead.
  - name: Unusual Nature
    desc: The commander doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The commander makes two Longsword or Longbow attacks.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +5 to hit, range 150/600 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage."
  - name: Call to Honour (1/Day)
    desc: If the commander has taken damage during this combat, it gives itself advantage on attack rolls until the end of its next turn, and 1d4 + 1 sword wraith warriors appear in unoccupied spaces within 30 feet of it. The warriors last until they drop to 0 hit points, and they take their turns immediately after the commander's turn on the same initiative count.
bonus_actions:
  - name: Martial Fury
    desc: The commander makes one Longsword or Longbow attack, which deals an extra 9 (2d8) necrotic damage on a hit, and attack rolls against it have advantage until the start of its next turn.
```
