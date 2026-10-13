---
title: Purple Worm
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Monstrosity
size: Gargantuan
habitat:
  - Desert
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Purple Worm
size: Gargantuan
type: monstrosity
alignment: Unaligned
ac: 18
hp: 247
hit_dice: 15d20 + 90
modifier: 3
speed: 50 ft., burrow 50 ft.
stats: [ 28, 7, 22, 1, 8, 4 ]
saves:
  - con: 11
  - wis: 4
senses: Blindsight 30 ft., Tremorsense 60 ft., passive Perception 9
cr: "15"
traits:
  - name: Tunneler
    desc: The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.
actions:
  - name: Multiattack
    desc: The worm makes one Bite attack and one Tail Stinger attack.
  - name: Bite
    desc: "*Melee Attack Roll:* +14, reach 10 ft. *Hit:* 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 19), and it has the Restrained condition until the grapple ends."
  - name: Tail Stinger
    desc: "*Melee Attack Roll:* +14, reach 10 ft. *Hit:* 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage."
bonus_actions:
  - name: Swallow
    desc: |-
      *Strength Saving Throw:* DC 19, one Large or smaller creature Grappled by the worm (it can have up to three creatures swallowed at a time). *Failure:* The target is swallowed by the worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 17 (5d6) Acid damage at the start of each of the worm's turns.

      If the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the worm and has the Prone condition. If the worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.
```
