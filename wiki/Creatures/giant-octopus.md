---
title: Giant Octopus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Beast
size: Large
habitat:
  - Underwater
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giant Octopus
size: Large
type: beast
alignment: Unaligned
ac: 11
hp: 45
hit_dice: 7d10 + 7
modifier: 1
speed: 10 ft., swim 60 ft.
stats: [ 17, 13, 13, 5, 10, 4 ]
skillsaves:
  - perception: 4
  - stealth: 5
senses: Darkvision 60 ft., passive Perception 14
cr: "1"
traits:
  - name: Water Breathing
    desc: The octopus can breathe only underwater. It can hold its breath for 1 hour outside water.
actions:
  - name: Tentacles
    desc: "*Melee Attack Roll:* +5, reach 10 ft. *Hit:* 10 (2d6 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from all eight tentacles. While Grappled, the target has the Restrained condition."
reactions:
  - name: Ink Cloud (1/Day)
    desc: "Trigger: The octopus takes damage while underwater. _Response:_ The octopus releases ink that fills a 10-foot Cube centred on itself, and the octopus moves up to its Swim Speed. The Cube is Heavily Obscured for 1 minute or until a strong current or similar effect disperses the ink."
```
