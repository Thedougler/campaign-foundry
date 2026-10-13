---
title: Gug
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Aberration
size: Huge
habitat:
  - Underdark
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gug
size: Huge
type: aberration
alignment: Chaotic Evil
ac: 16
hp: 250
hit_dice: 20d12 + 120
modifier: 6
speed: 40 ft.
stats: [ 22, 15, 23, 7, 16, 11 ]
saves:
  - str: 10
  - con: 10
skillsaves:
  - perception: 7
  - stealth: 10
senses: Darkvision 120 ft., passive Perception 17
languages: understands Deep Speech but can't speak
cr: "12"
traits:
  - name: Pack Tactics
    desc: The gug has Advantage on an attack roll against a creature if at least one of the gug's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The gug makes two Claw attacks and uses Chew.
  - name: Claw
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 22 (3d10 + 6) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 16) from one of two claws."
  - name: Chew
    desc: |-
      *Dexterity Saving Throw:* DC 18, up to two Medium or smaller creatures Grappled by the gug. *Failure:* The gug places the target in its mouth and chews. A chewed creature is no longer Grappled but has the Restrained condition. While Restrained in this way, a target has Half Cover against attacks and other effects not originating from the gug and takes 10 (3d6) Piercing damage at the start of each of the gug's turns. A gug can have a maximum of four creatures in its mouth at a time.

      A creature in the gug's mouth can take an action to make a DC 16 Strength (Athletics) check. On a successful check, the target is no longer Restrained and moves to an unoccupied space within 5 feet of the gug. If the gug dies, a target is no longer Restrained and can escape from the gug using 5 feet of movement, exiting with the Prone condition.
```
