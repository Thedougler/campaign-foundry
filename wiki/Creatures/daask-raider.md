---
title: Daask Raider
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Daask Raider
size: Medium
type: humanoid
subtype: gnoll
alignment: Neutral Evil
ac: 15
hp: 33
hit_dice: 6d8 + 6
modifier: 1
speed: 30 ft.
stats: [ 16, 12, 13, 10, 11, 8 ]
saves:
  - str: 5
skillsaves:
  - athletics: 5
  - perception: 2
senses: Darkvision 60 ft., passive Perception 12
languages: Common, Gnoll
cr: "1"
traits:
  - name: Pack Tactics
    desc: The raider has Advantage on an attack roll against a creature if at least one of the raider's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
actions:
  - name: Pummel
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 5 (1d4 + 3) Bludgeoning damage."
reactions:
  - name: Smackback
    desc: "Trigger: The raider takes damage from a creature within 5 feet. _Response:_ The raider makes one Pummel attack, targeting the triggering creature."
```
