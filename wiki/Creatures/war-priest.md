---
title: War Priest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat:
  - Desert
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: War Priest
size: Medium
type: humanoid
subtype: cleric
alignment: Any alignment
ac: 18
ac_class: plate
hp: 117
hit_dice: 18d8 + 36
modifier: 0
speed: 30 ft.
stats: [ 16, 10, 14, 11, 17, 13 ]
saves:
  - con: 6
  - wis: 7
skillsaves:
  - intimidation: 5
  - religion: 4
gear:
  - maul
senses: passive Perception 13
languages: any two languages
cr: "9"
actions:
  - name: Multiattack
    desc: The war priest makes two Maul attacks, and it uses Holy Fire.
  - name: Maul
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) bludgeoning damage plus *Hit:* 10 (3d6) radiant damage."
  - name: Holy Fire
    desc: The war priest targets one creature it can see within 60 feet of it. The target must make a DC 15 Wisdom saving throw. On a failed save, the target takes 12 (2d8 + 3) radiant damage, and it is blinded until the start of the war priest's next turn. On a successful save, the target takes half as much damage and isn't blinded.
  - name: Spellcasting
    desc: |-
      The war priest casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 15):

      **At will:** *light*, *spare the dying*, *thaumaturgy*

      **1/day each:** *banishment*, *command*, *dispel magic*, *flame strike*, *guardian of faith*, *hold person*, *lesser restoration*, *revivify*
bonus_actions:
  - name: Healing Light (Recharge 4–6)
    desc: The war priest or one creature of its choice within 60 feet of it regains 12 (2d8 + 3) hit points.
```
