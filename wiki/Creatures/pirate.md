---
title: Pirate
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Pirate
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 14
hp: 33
hit_dice: 6d8 + 6
modifier: 5
speed: 30 ft.
stats: [ 10, 16, 12, 8, 12, 14 ]
saves:
  - dex: 5
  - cha: 4
gear:
  - six daggers
  - leather armour
senses: passive Perception 11
languages: Common plus one other language
cr: "1"
actions:
  - name: Multiattack
    desc: The pirate makes two Dagger attacks. It can replace one attack with a use of Enthralling Panache.
  - name: Dagger
    desc: "*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 20/60 ft. *Hit:* 5 (1d4 + 3) Piercing damage."
  - name: Enthralling Panache
    desc: "*Wisdom Saving Throw:* DC 12, one creature the pirate can see within 30 feet. *Failure:* The target has the Charmed condition until the start of the pirate's next turn."
```
