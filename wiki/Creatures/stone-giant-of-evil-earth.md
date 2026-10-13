---
title: Stone Giant of Evil Earth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Stone Giant of Evil Earth
size: Huge
type: giant
alignment: typically Neutral Evil
ac: 20
ac_class: plate
hp: 137
hit_dice: 11d12 + 66
modifier: 1
speed: 40 ft.
stats: [ 23, 13, 22, 10, 12, 9 ]
saves:
  - str: 10
  - con: 10
skillsaves:
  - athletics: 14
  - perception: 5
senses: darkvision 60 ft., passive Perception 15
languages: Common, Giant, Terran
cr: "9"
actions:
  - name: Multiattack
    desc: The giant makes two Thundering Stone Club or Boulder attacks in any combination.
  - name: Thundering Stone Club
    desc: "*Melee Weapon Attack:* +10 to hit, reach 15 ft., one target. *Hit:* 16 (3d6 + 6) bludgeoning damage. The giant can cause the club to emit a burst of thunderous energy that deals 10 (3d6) thunder damage to each creature, other than the giant, within 30 feet of the target. The club can emit a burst this way only once per turn."
  - name: Boulder
    desc: "*Ranged Weapon Attack:* +10 to hit, range 60/240 ft., one target. *Hit:* 19 (3d8 + 6) bludgeoning damage, and the target must succeed on a DC 18 Strength saving throw or have the prone condition. After the giant throws the boulder, roll a d6; on a roll of 3 or lower, the giant has no more boulders to throw."
reactions:
  - name: Unyielding
    desc: In response to failing a saving throw to avoid being moved, having the prone condition, or both, the giant succeeds instead.
```
