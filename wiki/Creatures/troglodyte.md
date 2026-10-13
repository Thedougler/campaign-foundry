---
title: Troglodyte
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Monstrosity
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Troglodyte
size: Medium
type: monstrosity
alignment: Chaotic Evil
ac: 11
hp: 13
hit_dice: 2d8 + 4
modifier: 0
speed: 30 ft., climb 30 ft.
stats: [ 14, 10, 14, 6, 10, 6 ]
skillsaves:
  - stealth: 4
senses: Darkvision 60 ft., passive Perception 10
languages: Troglodyte
cr: 1/4
traits:
  - name: Stench
    desc: "*Constitution Saving Throw:* DC 12, any creature (other than a troglodyte) that starts its turn in a 5-foot Emanation originating from the troglodyte. *Failure:* The target has the Poisoned condition until the start of its next turn. *Success:* The target is immune to the Stench of all troglodytes for 1 hour."
  - name: Sunlight Sensitivity
    desc: While in sunlight, the troglodyte has Disadvantage on ability checks and attack rolls.
actions:
  - name: Rend
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Slashing damage."
```
