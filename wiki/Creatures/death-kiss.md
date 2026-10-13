---
title: Death Kiss
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Aberration
size: Large
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Death Kiss
size: Large
type: aberration
subtype: beholder
alignment: Typically Neutral Evil
ac: 15
ac_class: natural armour
hp: 142
hit_dice: 15d10 + 60
modifier: 2
speed: 0 ft., fly 30 ft. (hover)
stats: [ 18, 14, 18, 10, 12, 10 ]
saves:
  - con: 8
  - wis: 5
skillsaves:
  - perception: 5
damage_immunities: lightning
condition_immunities: prone
senses: darkvision 120 ft., passive Perception 15
languages: Deep Speech, Undercommon
cr: "10"
traits:
  - name: Lightning Blood
    desc: A creature within 5 feet of the death kiss takes 5 (1d10) lightning damage whenever it hits the death kiss with a melee attack that deals piercing or slashing damage.
actions:
  - name: Multiattack
    desc: The death kiss makes three Tentacle attacks. Up to three of these attacks can be replaced by Blood Drain, one replacement per tentacle grappling a creature.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +8 to hit, reach 20 ft., one target. *Hit:* 11 (2d6 + 4) piercing damage, and the target is grappled (escape DC 14) if it is a Huge or smaller creature. Until this grapple ends, the target is restrained, and the death kiss can't use the same tentacle on another target. The death kiss has ten tentacles."
  - name: Blood Drain
    desc: One creature grappled by a tentacle of the death kiss must make a DC 16 Constitution saving throw. On a failed save, the target takes 22 (4d10) lightning damage, and the death kiss regains half as many hit points.
```
