---
title: Gas Spore Fungus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Plant
size: Large
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gas Spore Fungus
size: Large
type: plant
alignment: Unaligned
ac: 8
hp: 13
hit_dice: 9d10 - 36
modifier: -5
speed: 5 ft., fly 10 ft. (hover)
stats: [ 5, 1, 3, 1, 1, 1 ]
damage_immunities: poison
condition_immunities: blinded, charmed, deafened, frightened, paralysed, poisoned, prone
senses: Blindsight 30 ft., passive Perception 5
cr: 1/2
traits:
  - name: Death Burst
    desc: The gas spore bursts when it dies. *Constitution Saving Throw:* DC 10, each creature in a 20-foot Emanation originating from the gas spore. *Failure:* The target takes 10 (3d6) Poison damage and has the Poisoned condition for 1d12 hours. Unless the Poisoned condition is removed, the target dies at the end of that time and sprouts 2d4 Tiny Gas Spore Fungi (each with 1 Hit Point). After 2d6 days, they become Large and have 13 Hit Points.
actions:
  - name: Tendril
    desc: "*Melee Attack Roll:* +0, reach 5 ft. *Hit:* 3 (1d6) Poison damage, and the target has the Poisoned condition until the end of its next turn."
```
