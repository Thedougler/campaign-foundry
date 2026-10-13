---
title: Wood Woad
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Plant
size: Medium
habitat:
  - Forest
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Wood Woad
size: Medium
type: plant
alignment: Typically Lawful Neutral
ac: 18
ac_class: natural armour, shield
hp: 75
hit_dice: 10d8 + 30
modifier: 1
speed: 30 ft., climb 30 ft.
stats: [ 18, 12, 16, 10, 13, 8 ]
skillsaves:
  - athletics: 7
  - perception: 4
  - stealth: 4
damage_vulnerabilities: fire
damage_resistances: bludgeoning, piercing
condition_immunities: charmed, frightened
gear:
  - club
senses: darkvision 60 ft., passive Perception 14
languages: Sylvan
cr: "5"
traits:
  - name: Plant Camouflage
    desc: The wood woad has advantage on Dexterity (Stealth) checks it makes in any terrain with ample obscuring vegetation.
  - name: Regeneration
    desc: The wood woad regains 10 hit points at the start of its turn if it is in contact with the ground. If the wood woad takes fire damage, this trait doesn't function at the start of the wood woad's next turn. The wood woad dies only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Tree Stride
    desc: Once on each of its turns, the wood woad can use 10 feet of its movement to step magically into one living tree within 5 feet of it and emerge from a second living tree within 60 feet of it that it can see, appearing in an unoccupied space within 5 feet of the second tree. Both trees must be Large or bigger.
actions:
  - name: Multiattack
    desc: The wood woad makes two Club attacks.
  - name: Club
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 14 (4d4 + 4) force damage."
```
