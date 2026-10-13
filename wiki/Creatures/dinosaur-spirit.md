---
title: Dinosaur Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Beast
size: Huge
habitat: []
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dinosaur Spirit
size: Huge
type: beast
subtype: dinosaur
alignment: Neutral
ac_class: 11 + the spell's level + 2 (Ankylosaur only)
hp: 60 + 10 for each spell level above 6
modifier: 0
speed: 40 ft.
stats: [ 21, 11, 15, 4, 12, 9 ]
senses: passive Perception 11
languages: understands the languages you know
traits:
  - name: Siege Monster (Ankylosaur Only)
    desc: The spirit deals double damage to objects and structures.
  - name: Tough
    desc: Add half the spell's level (round down) to any Strength or Constitution saving throw the spirit makes.
actions:
  - name: Multiattack
    desc: The spirit makes a number of attacks equal to half this spell's level (round down).
  - name: Bite (Tyrannosaur Only)
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 10 ft. *Hit:* 2d10 + 5 + the spell's level Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC equals your spell save DC), and it has the Restrained condition until the grapple ends."
  - name: Gore (Triceratops Only)
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d10 + 5 + the spell's level Piercing damage. If the target is a Huge or smaller creature and the spirit moved 20+ feet straight toward it immediately before the hit, the target takes an extra 1d10 Piercing damage and has the Prone condition."
  - name: Slam
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 10 ft. *Hit:* 1d10 + 5 + the spell's level Bludgeoning damage."
```
