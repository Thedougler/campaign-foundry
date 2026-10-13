---
title: Stone Giant Dreamwalker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Giant
size: Huge
habitat:
  - Coastal
  - Hill
  - Mountain
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Stone Giant Dreamwalker
size: Huge
type: giant
alignment: Typically Chaotic Neutral
ac: 18
ac_class: natural armour
hp: 161
hit_dice: 14d12 + 70
modifier: 2
speed: 40 ft.
stats: [ 23, 14, 21, 10, 8, 12 ]
saves:
  - dex: 6
  - con: 9
  - wis: 3
skillsaves:
  - athletics: 14
  - perception: 3
condition_immunities: charmed, frightened
gear:
  - greatclub
senses: darkvision 60 ft., passive Perception 13
languages: Common, Giant
cr: "10"
traits:
  - name: Dreamwalker's Charm
    desc: An enemy that starts its turn within 30 feet of the giant must make a DC 13 Charisma saving throw, provided that the giant isn't incapacitated. On a failed save, the creature is charmed by the giant. A creature charmed in this way can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Once it succeeds on the saving throw, the creature is immune to this giant's Dreamwalker's Charm for 24 hours.
actions:
  - name: Multiattack
    desc: The giant makes two Greatclub or Rock attacks.
  - name: Greatclub
    desc: "*Melee Weapon Attack:* +10 to hit, reach 15 ft., one target. *Hit:* 24 (4d8 + 6) bludgeoning damage."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +10 to hit, range 60/240 ft., one target. *Hit:* 22 (3d10 + 6) bludgeoning damage. If the target is a creature, it must succeed on a DC 17 Strength saving throw or be knocked prone."
  - name: Petrifying Touch
    desc: The giant touches one Medium or smaller creature within 10 feet of it that is charmed by it. The target must make a DC 17 Constitution saving throw. On a failed save, the target becomes petrified, and the giant can adhere the target to its stony body. *greater restoration* spells and other magic that can undo petrification have no effect on a petrified creature adhered to the giant unless the giant is dead, in which case the magic works normally, freeing the petrified creature as well as ending the petrified condition on it.
```
