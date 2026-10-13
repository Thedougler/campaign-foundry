---
title: Peryton
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Monstrosity
size: Medium
habitat:
  - Hill
  - Mountain
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Peryton
size: Medium
type: monstrosity
alignment: Chaotic Evil
ac: 13
hp: 33
hit_dice: 6d8 + 6
modifier: 3
speed: 20 ft., fly 60 ft.
stats: [ 16, 12, 13, 9, 12, 10 ]
skillsaves:
  - perception: 5
  - stealth: 3
senses: passive Perception 15
languages: understands Common and Elvish but can't speak
cr: "2"
traits:
  - name: Flyby
    desc: The peryton doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
actions:
  - name: Multiattack
    desc: The peryton makes one Gore attack and one Talons attack.
  - name: Gore
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Piercing damage. If the peryton moved 30+ feet straight toward the target immediately before the hit, the target takes an extra 9 (2d8) Piercing damage."
  - name: Talons
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 8 (2d4 + 3) Piercing damage. If the attack reduces a Humanoid target to 0 Hit Points, the peryton kills the target by removing its heart."
```
