---
title: Swavain Basilisk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swavain Basilisk
size: Huge
type: monstrosity
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 85
hit_dice: 10d12 + 20
modifier: 3
speed: 15 ft., swim 40 ft.
stats: [ 15, 16, 15, 2, 8, 7 ]
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 60 ft., passive Perception 9
cr: "7"
traits:
  - name: Amphibious
    desc: The basilisk can breathe air and water.
  - name: Petrifying Secretions
    desc: A creature must make a DC 13 Constitution saving throw if it hits the basilisk with a weapon attack while within 5 feet of it or if it starts its turn grappled by the basilisk. Unless the save succeeds, the creature magically begins to turn to stone and is restrained, and it must repeat the saving throw at the end of its next turn. On a successful save, the effect ends. On a failure, the creature is petrified.
actions:
  - name: Multiattack
    desc: "The basilisk makes two attacks: one with its bite and one with its tail."
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one creature. *Hit:* 13 (3d6 + 3) piercing damage plus 10 (3d6) poison damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +6 to hit, reach 15 ft., one target. *Hit:* 14 (2d10 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 12)."
```
