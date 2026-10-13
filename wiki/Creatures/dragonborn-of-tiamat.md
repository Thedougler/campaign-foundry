---
title: Dragonborn of Tiamat
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dragonborn of Tiamat
size: Medium
type: humanoid
alignment: typically Chaotic Evil
ac: 18
ac_class: plate
hp: 85
hit_dice: 10d8 + 40
modifier: 0
speed: 30 ft.
stats: [ 20, 11, 18, 10, 12, 16 ]
saves:
  - str: 8
  - con: 7
  - wis: 4
  - cha: 6
skillsaves:
  - athletics: 8
  - intimidation: 6
  - perception: 4
condition_immunities: frightened
gear:
  - greataxe
senses: passive Perception 14
languages: Common, Draconic
cr: "7"
traits:
  - name: Legendary Resistance (1/Day)
    desc: If the dragonborn fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragonborn makes two Greataxe attacks.
  - name: Greataxe
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 11 (1d12 + 5) slashing damage plus 13 (3d8) necrotic damage."
  - name: Necrotic Breath (Recharge 6)
    desc: The dragonborn exhales shadowy fire in a 30-foot cone. Each creature in that area must make a DC 15 Wisdom saving throw. On a failed save, the creature takes 36 (8d8) necrotic damage and is frightened of the dragonborn for 1 minute. On a successful save, the creature takes half as much damage and isn't frightened. A frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```
