---
title: Duergar Hammerer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Construct
size: Medium
habitat:
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Duergar Hammerer
size: Medium
type: construct
subtype: dwarf
alignment: Any alignment
ac: 17
ac_class: natural armour
hp: 33
hit_dice: 6d8 + 6
modifier: -2
speed: 20 ft.
stats: [ 17, 7, 12, 5, 5, 5 ]
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 7
languages: understands Dwarvish but can't speak
cr: "2"
traits:
  - name: Siege Monster
    desc: The hammerer deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The hammerer makes one Claw attack and one Hammer attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
  - name: Hammer
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) bludgeoning damage."
reactions:
  - name: Engine of Pain
    desc: Immediately after a creature within 5 feet of the hammerer hits it with an attack roll, the hammerer makes a Hammer attack against that creature.
```
