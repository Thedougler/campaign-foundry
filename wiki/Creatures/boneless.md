---
title: Boneless
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Undead
size: Medium
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Boneless
size: Medium
type: undead
alignment: Chaotic Evil
ac: 12
hp: 22
hit_dice: 4d8 + 4
modifier: 2
speed: 30 ft.
stats: [ 15, 14, 12, 1, 10, 1 ]
skillsaves:
  - stealth: 4
damage_resistances: bludgeoning
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: understands Common but can't speak
cr: "1"
traits:
  - name: Abduct
    desc: The boneless needn't spend extra movement to move a creature it is grappling.
  - name: Compression
    desc: The boneless can move through a space as narrow as 1 inch without expending extra movement to do so.
actions:
  - name: Smother
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 7 (2d4 + 2) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12). Until the grapple ends, the target has the Blinded and Restrained conditions, is suffocating, and takes 7 (2d4 + 2) Bludgeoning damage at the start of each of the boneless's turns. The boneless can smother only one creature at a time. While grappling a target, the boneless can't take this action again."
bonus_actions:
  - name: Unravelling Flesh (1/Day)
    desc: "*Wisdom Saving Throw:* DC 11, each creature within 30 feet that can see the boneless. *Failure:* The target has the Frightened condition. *Failure or Success:* The boneless moves up to its Speed without provoking Opportunity Attacks."
```
