---
title: Cultist of Myrkul
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Humanoid
size: Small or Medium
habitat:
  - Urban
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cultist of Myrkul
size: Small or Medium
type: humanoid
alignment: Neutral Evil
ac: 16
hp: 204
hit_dice: 24d8 + 96
modifier: 6
speed: 30 ft.
stats: [ 13, 14, 18, 20, 18, 15 ]
saves:
  - con: 8
  - int: 9
  - wis: 8
  - cha: 6
skillsaves:
  - arcana: 9
  - insight: 8
  - religion: 9
damage_resistances: necrotic
gear:
  - breastplate
  - holy symbol
senses: Darkvision 60 ft., passive Perception 14
languages: Common
cr: "11"
traits:
  - name: Nearer to the Dead
    desc: While Bloodied, the cultist has Immunity to the Frightened and Poisoned conditions.
actions:
  - name: Multiattack
    desc: The cultist makes three Necrotic Burst attacks.
  - name: Necrotic Burst
    desc: "*Melee or Ranged Attack Roll:* +9, reach 5 ft. or range 120 ft. *Hit:* 27 (5d10) Necrotic damage and the target can't regain Hit Points until the end of the cultist's next turn."
  - name: Spellcasting
    desc: |-
      The cultist casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17):

      **At will:** *Speak with Dead*, *Thaumaturgy*

      **1/day each:** *Animate Dead*, *Circle of Death*
```
