---
title: Bleak Cabal Void Soother
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bleak Cabal Void Soother
size: Small or Medium
type: humanoid
alignment: Any alignment
ac: 16
ac_class: breastplate
hp: 55
hit_dice: 10d8 + 10
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 12, 12, 15, 10 ]
saves:
  - con: 3
  - wis: 4
skillsaves:
  - medicine: 4
gear:
  - mace
senses: passive Perception 12
languages: Common plus one more language
cr: "3"
actions:
  - name: Multiattack
    desc: The void soother makes two Mace or Void Bolt attacks.
  - name: Mace
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) bludgeoning damage plus 3 (1d6) force damage."
  - name: Void Bolt
    desc: "*Ranged Spell Attack:* +4 to hit, range 90 ft., one target. *Hit:* 9 (2d8) force damage."
  - name: Spellcasting
    desc: |-
      The void soother casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 12):

      **At will:** *guidance*, *light*

      **1/day each:** *calm emotions*, *lesser restoration*, *remove curse*, *protection from energy*
bonus_actions:
  - name: Soothing Word (3/Day)
    desc: The void soother speaks a magical word of mercy, healing one creature it can see within 60 feet of itself. The target regains 4 (1d4 + 2) hit points.
```
