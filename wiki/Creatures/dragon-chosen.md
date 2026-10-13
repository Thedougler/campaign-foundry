---
title: Dragon Chosen
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dragon Chosen
size: Medium
type: humanoid
alignment: Any alignment
ac: 17
ac_class: natural armour
hp: 45
hit_dice: 7d8 + 14
modifier: 4
speed: 30 ft.
stats: [ 18, 18, 14, 10, 13, 14 ]
saves:
  - str: 6
  - dex: 6
  - con: 4
skillsaves:
  - athletics: 6
  - perception: 3
condition_immunities: frightened
gear:
  - handaxe
  - shortsword
senses: passive Perception 13
languages: Common, Draconic
cr: "3"
actions:
  - name: Multiattack
    desc: The chosen makes one Handaxe attack and two Shortsword attacks.
  - name: Handaxe
    desc: "*Melee or Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 7 (1d6 + 4) slashing damage. *Hit or Miss:* The handaxe magically returns to the chosen's hand immediately after a ranged attack."
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage."
reactions:
  - name: Biting Rebuke
    desc: Immediately after the chosen takes damage from a creature within 5 feet of it, it can make a Shortsword attack with advantage against that creature.
```
