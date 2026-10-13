---
title: Plasmoid Boss
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Ooze
size: Large
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Plasmoid Boss
size: Large
type: ooze
alignment: Any alignment
ac: 11
hp: 82
hit_dice: 11d10 + 22
modifier: 1
speed: 30 ft.
stats: [ 18, 12, 14, 14, 13, 15 ]
saves:
  - con: 4
  - wis: 3
skillsaves:
  - deception: 4
  - intimidation: 4
  - persuasion: 4
damage_resistances: acid, poison
senses: darkvision 60 ft., passive Perception 13
languages: Common
cr: "4"
traits:
  - name: Amorphous
    desc: The plasmoid can squeeze through a space as narrow as 1 inch wide, provided it is wearing and carrying nothing. It has advantage on ability checks it makes to initiate or escape a grapple.
  - name: Hold Breath
    desc: The plasmoid can hold its breath for 1 hour.
actions:
  - name: Multiattack
    desc: The plasmoid makes three Pseudopod attacks.
  - name: Pseudopod
    desc: "*Melee Weapon Attack:* +6 to hit (with advantage if the plasmoid has one or more allies within 10 feet of itself), reach 10 ft., one target. *Hit:* 11 (2d6 + 4) bludgeoning damage."
reactions:
  - name: Uncanny Dodge
    desc: The plasmoid halves the damage that it takes from an attack that hits it. The plasmoid must be able to see the attacker.
```
