---
title: Carrion Crawler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Monstrosity
size: Large
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Carrion Crawler
size: Large
type: monstrosity
alignment: Unaligned
ac: 13
hp: 51
hit_dice: 6d10 + 18
modifier: 1
speed: 30 ft., climb 30 ft.
stats: [ 14, 13, 16, 1, 12, 5 ]
skillsaves:
  - perception: 5
senses: Darkvision 60 ft., passive Perception 15
cr: "2"
traits:
  - name: Spider Climb
    desc: The carrion crawler can climb difficult surfaces, including along ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The carrion crawler uses Paralysing Tentacles and makes one Bite attack.
  - name: Bite
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 7 (2d4 + 2) Piercing damage plus 3 (1d6) Poison damage."
  - name: Paralysing Tentacles
    desc: "*Constitution Saving Throw:* DC 12, one creature the carrion crawler can see within 10 feet. *Failure:* The target has the Poisoned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While Poisoned, the target has the Paralysed condition."
```
