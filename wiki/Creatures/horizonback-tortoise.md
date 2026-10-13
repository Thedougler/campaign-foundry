---
title: Horizonback Tortoise
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
  - "Critical Role: Call of the Netherdeep"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Horizonback Tortoise
size: Gargantuan
type: monstrosity
alignment: Unaligned
ac: 17
ac_class: natural armour; 22 while in its shell
hp: 227
hit_dice: 13d20 + 91
modifier: -4
speed: 20 ft.
stats: [ 28, 3, 25, 4, 10, 5 ]
saves:
  - str: 12
  - con: 10
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 60 ft, passive Perception 10
languages: understands Goblin but can't speak
cr: "8"
traits:
  - name: Amphibious
    desc: The tortoise can breathe air and water.
  - name: Massive Frame
    desc: |-
      The tortoise can carry up to 20,000 pounds of weight atop its shell, but moves at half speed if the weight exceeds 10,000 pounds. Medium or smaller creatures can move underneath the tortoise while it's not prone.

      Any creature under the tortoise when it falls prone is grappled (escape DC 18). Until the grapple ends, the creature is prone and restrained.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 28 (3d12 + 9) bludgeoning damage."
  - name: Shell Defense (Recharge 4–6)
    desc: The tortoise withdraws into its shell, falls prone, and gains a +5 bonus to AC. While the tortoise is in its shell, its speed is 0 and can't increase. The tortoise can emerge from its shell as an action, whereupon it is no longer prone.
```
