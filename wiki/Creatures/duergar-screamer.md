---
title: Duergar Screamer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
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
name: Duergar Screamer
size: Medium
type: construct
subtype: dwarf
alignment: Any alignment
ac: 15
ac_class: natural armour
hp: 38
hit_dice: 7d8 + 7
modifier: -2
speed: 20 ft.
stats: [ 18, 7, 12, 5, 5, 5 ]
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 7
languages: understands Dwarvish but can't speak
cr: "3"
actions:
  - name: Multiattack
    desc: The screamer makes one Drill attack, and it uses Sonic Scream.
  - name: Drill
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 10 (1d12 + 4) piercing damage."
  - name: Sonic Scream
    desc: The screamer emits destructive energy in a 15-foot cube. Each creature in that area must succeed on a DC 11 Strength saving throw or take 7 (2d6) thunder damage and be knocked prone.
reactions:
  - name: Engine of Pain
    desc: Immediately after a creature within 5 feet of the screamer hits it with an attack roll, the screamer makes a Drill attack against that creature.
```
