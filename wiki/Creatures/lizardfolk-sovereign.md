---
title: Lizardfolk Sovereign
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Elemental
size: Medium
habitat:
  - Forest
  - Swamp
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lizardfolk Sovereign
size: Medium
type: elemental
alignment: Neutral
ac: 15
hp: 78
hit_dice: 12d8 + 24
modifier: 1
speed: 30 ft., burrow 20 ft., swim 30 ft.
stats: [ 17, 12, 15, 11, 11, 15 ]
saves:
  - con: 4
  - wis: 2
skillsaves:
  - perception: 4
  - stealth: 5
condition_immunities: frightened
senses: Darkvision 60 ft., passive Perception 14
languages: Draconic, Primordial (Terran)
cr: "4"
actions:
  - name: Multiattack
    desc: The lizardfolk makes one Bite attack and one Earthen Maul attack.
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 8 (1d10 + 3) Piercing damage. If the target is a creature that isn't a Construct or an Undead, the lizardfolk gains Temporary Hit Points equal to the damage dealt."
  - name: Earthen Maul
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition."
bonus_actions:
  - name: Charge
    desc: The lizardfolk moves up to its Speed or Swim Speed straight toward an enemy it can see.
```
