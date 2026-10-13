---
title: Scarecrow
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Construct
size: Medium
habitat:
  - Grassland
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Scarecrow
size: Medium
type: construct
alignment: Chaotic Evil
ac: 11
hp: 27
hit_dice: 6d8
modifier: 3
speed: 30 ft.
stats: [ 11, 13, 11, 10, 10, 13 ]
damage_vulnerabilities: fire
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned, unconscious
senses: Darkvision 60 ft., passive Perception 10
languages: Common plus one other language
cr: "1"
actions:
  - name: Fearsome Claw
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 6 (2d4 + 1) Slashing damage, and the target has the Frightened condition until the end of the scarecrow's next turn."
  - name: Terrifying Glare
    desc: "*Wisdom Saving Throw:* DC 11, one creature the scarecrow can see within 30 feet. *Failure:* The target has the Frightened condition until the end of the scarecrow's next turn. While Frightened, the target has the Paralysed condition."
```
