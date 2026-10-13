---
title: Zhentilar Soldier
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Zhentilar Soldier
size: Small or Medium
type: humanoid
alignment: Lawful Evil
ac: 13
hp: 22
hit_dice: 4d8 + 4
modifier: 2
speed: 30 ft.
stats: [ 14, 14, 13, 10, 11, 11 ]
saves:
  - dex: 4
  - con: 3
skillsaves:
  - acrobatics: 4
  - athletics: 4
gear:
  - leather armour
  - pistol
  - shortsword
senses: passive Perception 10
languages: Common
cr: "1"
actions:
  - name: Multiattack
    desc: The Zhentilar makes two attacks, using Shortsword or Pistol in any combination. It can replace one attack with a use of Knock Down.
  - name: Shortsword
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Piercing damage plus 2 (1d4) Poison damage."
  - name: Pistol
    desc: "*Ranged Attack Roll:* +4, range 80/320 ft. *Hit:* 7 (1d10 + 2) Piercing damage."
  - name: Knock Down
    desc: "*Strength Saving Throw:* DC 12, one creature within 5 feet that the Zhentilar can see. *Failure:* 4 (1d4 + 2) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition."
```
