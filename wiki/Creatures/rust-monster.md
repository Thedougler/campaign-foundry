---
title: Rust Monster
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Monstrosity
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Rust Monster
size: Medium
type: monstrosity
alignment: Unaligned
ac: 14
hp: 33
hit_dice: 6d8 + 6
modifier: 1
speed: 40 ft.
stats: [ 13, 12, 13, 2, 13, 6 ]
senses: Darkvision 60 ft., passive Perception 11
cr: 1/2
traits:
  - name: Iron Scent
    desc: The rust monster can pinpoint the location of ferrous metal within 30 feet of itself.
actions:
  - name: Multiattack
    desc: The rust monster makes one Bite attack and uses Antennae twice.
  - name: Bite
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 5 (1d8 + 1) Piercing damage."
  - name: Antennae
    desc: The rust monster targets one nonmagical metal object, armour or a weapon, worn or carried by a creature within 5 feet of itself. *Dexterity Saving Throw:* DC 11, the creature with the object. *Failure:* The object takes a -1 penalty to the AC it offers (armour) or to its attack rolls (weapon). Armour is destroyed if the penalty reduces its AC to 10, and a weapon is destroyed if its penalty reaches -5. The penalty can be removed by casting the *Mending* spell on the armour or weapon.
  - name: Destroy Metal
    desc: The rust monster touches a nonmagical metal object within 5 feet of itself that isn't being worn or carried. The touch destroys a 1-foot Cube of the object.
reactions:
  - name: Reflexive Antennae
    desc: "Trigger: An attack roll hits the rust monster. _Response:_ The rust monster uses Antennae."
```
