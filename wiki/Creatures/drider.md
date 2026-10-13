---
title: Drider
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Monstrosity
size: Large
habitat:
  - Forest
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Drider
size: Large
type: monstrosity
alignment: Chaotic Evil
ac: 19
hp: 123
hit_dice: 13d10 + 52
modifier: 4
speed: 30 ft., climb 30 ft.
stats: [ 16, 19, 18, 13, 16, 12 ]
skillsaves:
  - perception: 6
  - stealth: 10
senses: Darkvision 120 ft., passive Perception 16
languages: Elvish, Undercommon
cr: "6"
traits:
  - name: Spider Climb
    desc: The drider can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drider has Disadvantage on ability checks and attack rolls.
  - name: Web Walker
    desc: The drider ignores movement restrictions caused by webs, and the drider knows the location of any other creature in contact with the same web.
actions:
  - name: Multiattack
    desc: The drider makes three attacks, using Foreleg or Poison Burst in any combination.
  - name: Foreleg
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 13 (2d8 + 4) Piercing damage."
  - name: Poison Burst
    desc: "*Ranged Attack Roll:* +6, range 120 ft. *Hit:* 13 (3d6 + 3) Poison damage."
bonus_actions:
  - name: Magic of the Spider Queen (Recharge 5–6)
    desc: |
      The drider casts *Darkness*, *Faerie Fire*, or *Web*, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 14).
```
