---
title: Incarnation of Transience
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
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
name: Incarnation of Transience
size: Huge
type: fey
alignment: Neutral
ac: 16
hp: 142
hit_dice: 15d12 + 45
modifier: 8
speed: 40 ft., swim 40 ft.
stats: [ 21, 20, 17, 10, 14, 16 ]
saves:
  - dex: 8
  - con: 6
condition_immunities: grappled, paralysed, petrified, prone, restrained
senses: Darkvision 60 ft., passive Perception 12
languages: Sylvan; telepathy 120 ft.
cr: "7"
traits:
  - name: Ephemeral Movement
    desc: The incarnation can move through other creatures and objects as if they were Difficult Terrain, and its movement doesn't provoke Opportunity Attacks. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - name: Magic Resistance
    desc: The incarnation has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The incarnation makes three attacks, using Bite or Miasmic Globule in any combination.
  - name: Bite
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 14 (2d8 + 5) Piercing damage."
  - name: Miasmic Globule
    desc: "*Ranged Attack Roll:* +8, range 60/120 ft. *Hit:* 15 (6d4) Acid damage, and the target's Speed is reduced by 10 feet until the end of the incarnation's next turn."
  - name: Spectral Stampede
    desc: The incarnation moves up to 80 feet in a straight line. Each creature whose space the incarnation enters is targeted once by the following effect. *Dexterity Saving Throw:* DC 16. *Failure:* 18 (4d8) Force damage. If the target is the incarnation's size or smaller, it has the Prone condition. *Success:* Half damage only.
bonus_actions:
  - name: Shape-Shift
    desc: The incarnation changes its size to Medium, Large, or Huge.
```
