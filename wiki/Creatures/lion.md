---
title: Lion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Beast
size: Large
habitat:
  - Desert
  - Grassland
  - Hill
  - Mountain
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lion
size: Large
type: beast
alignment: Unaligned
ac: 12
hp: 22
hit_dice: 4d10
modifier: 2
speed: 50 ft.
stats: [ 17, 15, 11, 3, 12, 8 ]
skillsaves:
  - perception: 3
  - stealth: 4
senses: Darkvision 60 ft., passive Perception 13
cr: "1"
traits:
  - name: Pack Tactics
    desc: The lion has Advantage on an attack roll against a creature if at least one of the lion's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
  - name: Running Leap
    desc: With a 10-foot running start, the lion can Long Jump up to 25 feet.
actions:
  - name: Multiattack
    desc: The lion makes two Rend attacks. It can replace one attack with a use of Roar.
  - name: Rend
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Slashing damage."
  - name: Roar
    desc: "*Wisdom Saving Throw:* DC 11, one creature within 15 feet. *Failure:* The target has the Frightened condition until the start of the lion's next turn."
```
