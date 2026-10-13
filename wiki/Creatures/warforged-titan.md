---
title: Warforged Titan
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Construct
size: Huge
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Warforged Titan
size: Huge
type: construct
alignment: Lawful Neutral
ac: 20
ac_class: natural armour
hp: 125
hit_dice: 10d12 + 60
modifier: -1
speed: 40 ft.
stats: [ 23, 8, 22, 3, 11, 1 ]
damage_immunities: poison, psychic
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 10
languages: understands the languages of its creator but can't speak
cr: "8"
traits:
  - name: Platforms
    desc: The warforged titan has two platforms built into its chassis. One Medium or smaller creature can ride on each platform without squeezing. To make a melee attack against a target within 5 feet of the warforged, they must use spears or weapons with reach and the target must be Large or larger.
  - name: Siege Monster
    desc: The warforged titan deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The warforged titan makes one axehand attack and one hammerfist attack.
  - name: Axehand
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 19 (3d8 + 6) slashing damage, plus 11 (2d10) slashing damage if the target is prone."
  - name: Hammerfist
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 19 (3d8 + 6) bludgeoning damage. If the target is a creature, it must succeed on a DC 17 Strength saving throw or be knocked prone."
  - name: Sweeping Axe (Recharge 6)
    desc: The warforged titan makes a sweep with its axehand, and each creature within 10 feet of it must make a DC 17 Dexterity saving throw. A creature takes 19 (3d8 + 6) slashing damage on a failed save, or half as much damage on a successful one.
```
