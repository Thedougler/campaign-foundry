---
title: Daask Bruiser
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Daask Bruiser
size: Medium
type: humanoid
subtype: gnoll
alignment: Neutral Evil
ac: 17
hp: 150
hit_dice: 20d8 + 60
modifier: 5
speed: 30 ft.
stats: [ 20, 13, 16, 10, 12, 14 ]
saves:
  - str: 9
  - con: 7
  - wis: 5
skillsaves:
  - athletics: 9
  - intimidation: 6
  - perception: 5
senses: Darkvision 60 ft., passive Perception 15
languages: Common, Gnoll
cr: "9"
traits:
  - name: Blood Frenzy
    desc: The bruiser has Advantage on attack rolls against any creature that doesn't have all its Hit Points.
actions:
  - name: Multiattack
    desc: The bruiser makes three Pummel attacks and uses Glare.
  - name: Pummel
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 12 (2d6 + 5) Bludgeoning damage."
  - name: Glare
    desc: "*Wisdom Saving Throw:* DC 14, one creature the bruiser can see within 30 feet. *Failure:* The target has the Frightened condition until the start of the bruiser's next turn."
reactions:
  - name: Smackback
    desc: "Trigger: The bruiser takes damage from a creature within 5 feet. _Response:_ The bruiser makes one Pummel attack, targeting the triggering creature."
```
