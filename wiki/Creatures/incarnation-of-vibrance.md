---
title: Incarnation of Vibrance
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Fey
size: Huge
habitat:
  - Planar (Feywild)
sourcebooks:
  - "Lorwyn: First Light"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Incarnation of Vibrance
size: Huge
type: fey
alignment: Neutral
ac: 14
hp: 230
hit_dice: 20d12 + 100
modifier: 7
speed: 40 ft.
stats: [ 20, 17, 20, 10, 16, 21 ]
saves:
  - con: 9
  - cha: 9
damage_resistances: radiant
condition_immunities: blinded, charmed, deafened, frightened
senses: Darkvision 60 ft., passive Perception 13
languages: Sylvan; telepathy 120 ft.
cr: "10"
traits:
  - name: Magic Resistance
    desc: The incarnation has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The incarnation makes two Vine attacks and uses Radiant Blast. It can replace one vine attack with a use of Spellcasting to cast *Blindness/Deafness* if available.
  - name: Vine
    desc: "*Melee Attack Roll:* +9, reach 20 ft. *Hit:* 18 (3d8 + 5) Bludgeoning damage. If the target is the incarnation's size or smaller, it has the Grappled condition (escape DC 15) from one of two vines."
  - name: Radiant Blast
    desc: "*Constitution Saving Throw:* DC 17, each creature of the incarnation's choice in a 20-foot Emanation originating from the incarnation. *Failure:* The creature takes 14 (2d8 + 5) Radiant damage. *Success:* Half damage."
  - name: Spellcasting
    desc: |-
      The incarnation casts one of the following spells, requiring no spell components and using Charisma as the spellcasting ability:

      **At will:** *Daylight*, *Druidcraft*, *Plant Growth*

      **1/day:** *Blindness/Deafness*
bonus_actions:
  - name: Shape-Shift
    desc: The incarnation changes its size to Medium, Large, or Huge.
  - name: Teleport
    desc: The incarnation teleports up to 60 feet to an unoccupied space it can see. The incarnation can't teleport while it has a creature Grappled.
```
