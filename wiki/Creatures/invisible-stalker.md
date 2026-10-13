---
title: Invisible Stalker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Elemental
size: Large
habitat:
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Invisible Stalker
size: Large
type: elemental
alignment: Neutral
ac: 14
hp: 97
hit_dice: 13d10 + 26
modifier: 7
speed: 50 ft., fly 50 ft. (hover)
stats: [ 16, 19, 14, 10, 15, 11 ]
skillsaves:
  - perception: 8
  - stealth: 10
damage_resistances: bludgeoning, piercing, slashing
damage_immunities: poison
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Darkvision 60 ft., passive Perception 18
languages: Common, Primordial (Auran)
cr: "6"
traits:
  - name: Air Form
    desc: The stalker can enter an enemy's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Invisibility
    desc: The stalker has the Invisible condition.
actions:
  - name: Multiattack
    desc: The stalker makes three Wind Swipe attacks. It can replace one attack with a use of Vortex.
  - name: Wind Swipe
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 11 (2d6 + 4) Force damage."
  - name: Vortex
    desc: "*Constitution Saving Throw:* DC 14, one Large or smaller creature in the stalker's space. *Failure:* 7 (1d8 + 3) Thunder damage, and the target has the Grappled condition (escape DC 13). Until the grapple ends, the target can't cast spells with a Verbal component and takes 7 (2d6) Thunder damage at the start of each of the stalker's turns."
```
