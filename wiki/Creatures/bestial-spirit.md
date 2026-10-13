---
title: Bestial Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Beast
size: Small
habitat: []
sourcebooks:
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bestial Spirit
size: Small
type: beast
alignment: Neutral
ac_class: 11 + the spell's level
hp: 20 (Air only) or 30 (Land and Water only) + 5 for each spell level above 2
modifier: 0
speed: 30 ft., climb 30 ft. (Land only), fly 60 ft. (Air only), swim 30 ft. (Water only)
stats: [ 18, 11, 16, 4, 14, 5 ]
senses: Darkvision 60 ft., passive Perception 12
languages: understands the languages you know
traits:
  - name: Flyby (Air Only)
    desc: The spirit doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.
  - name: Pack Tactics (Land and Water Only)
    desc: The spirit has Advantage on an attack roll against a creature if at least one of the spirit's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - name: Water Breathing (Water Only)
    desc: The spirit can breathe only underwater.
actions:
  - name: Multiattack
    desc: The spirit makes a number of Rend attacks equal to half this spell's level (round down).
  - name: Rend
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d8 + 4 + the spell's level Piercing damage."
```
