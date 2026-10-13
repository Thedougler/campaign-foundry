---
title: Octopus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0
creature_type: Beast
size: Small
habitat:
  - Underwater
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Octopus
size: Small
type: beast
alignment: Unaligned
ac: 12
hp: 3
hit_dice: 1d6
modifier: 2
speed: 5 ft., swim 30 ft.
stats: [ 4, 15, 11, 3, 10, 4 ]
skillsaves:
  - perception: 2
  - stealth: 6
senses: Darkvision 30 ft., passive Perception 12
cr: "0"
traits:
  - name: Compression
    desc: The octopus can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Water Breathing
    desc: The octopus can breathe only underwater.
actions:
  - name: Tentacles
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 1 Bludgeoning damage."
reactions:
  - name: Ink Cloud (1/Day)
    desc: "Trigger: A creature ends its turn within 5 feet of the octopus while underwater. _Response:_ The octopus releases ink that fills a 5-foot Cube centred on itself, and the octopus moves up to its Swim Speed. The Cube is Heavily Obscured for 1 minute or until a strong current or similar effect disperses the ink."
```
