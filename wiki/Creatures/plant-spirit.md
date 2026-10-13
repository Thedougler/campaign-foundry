---
title: Plant Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Plant
size: Large
habitat: []
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Plant Spirit
size: Large
type: plant
alignment: Neutral
ac_class: 11 + the spell's level + 2 (Tree only)
hp: 50 + 10 for each spell level above 5
modifier: 1
speed: 40 ft., climb 40 ft. (Vine only)
stats: [ 17, 13, 14, 10, 13, 10 ]
damage_vulnerabilities: fire (Tree only)
senses: passive Perception 11
languages: understands the languages you know
traits:
  - name: Siege Monster (Tree Only)
    desc: The spirit deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The spirit makes a number of attacks equal to half this spell's level (round down).
  - name: Slam (Tree or Vine Only)
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d10 + 3 + the spell's level Bludgeoning damage."
  - name: Spore Spray (Fungus Only)
    desc: "*Melee or Ranged Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. or range 30 ft. *Hit:* 1d4 + the spell's level Poison damage, and the target has the Poisoned condition until the end of its next turn. If the target already has the Poisoned condition, it instead takes an extra 3d4 Poison damage."
bonus_actions:
  - name: Twist Away (Vine Only)
    desc: The spirit takes the Dash or Disengage action.
```
