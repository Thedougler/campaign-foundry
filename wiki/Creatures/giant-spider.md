---
title: Giant Spider
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Beast
size: Large
habitat:
  - Desert
  - Forest
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giant Spider
size: Large
type: beast
alignment: Unaligned
ac: 14
hp: 26
hit_dice: 4d10 + 4
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 14, 16, 12, 2, 11, 4 ]
skillsaves:
  - perception: 4
  - stealth: 7
senses: Darkvision 60 ft., passive Perception 14
cr: "1"
traits:
  - name: Spider Climb
    desc: The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - name: Web Walker
    desc: The spider ignores movement restrictions caused by webs, and it knows the location of any other creature in contact with the same web.
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Piercing damage plus 7 (2d6) Poison damage."
  - name: Web (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 13, one creature the spider can see within 60 feet. *Failure:* The target has the Restrained condition until the web is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Poison and Psychic damage)."
```
