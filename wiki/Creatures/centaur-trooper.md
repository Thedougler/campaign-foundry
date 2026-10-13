---
title: Centaur Trooper
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Fey
size: Large
habitat:
  - Forest
  - Grassland
  - Planar (Feywild)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Centaur Trooper
size: Large
type: fey
alignment: Neutral Good
ac: 16
hp: 45
hit_dice: 6d10 + 12
modifier: 2
speed: 50 ft.
stats: [ 18, 14, 14, 9, 13, 11 ]
skillsaves:
  - athletics: 6
  - perception: 3
gear:
  - breastplate
  - longbow
  - pike
senses: passive Perception 13
languages: Elvish, Sylvan
cr: "2"
actions:
  - name: Multiattack
    desc: The centaur makes two attacks, using Pike or Longbow in any combination.
  - name: Pike
    desc: "*Melee Attack Roll:* +6, reach 10 ft. *Hit:* 9 (1d10 + 4) Piercing damage."
  - name: Longbow
    desc: "*Ranged Attack Roll:* +4, range 150/600 ft. *Hit:* 6 (1d8 + 2) Piercing damage."
bonus_actions:
  - name: Trampling Charge (Recharge 5–6)
    desc: The centaur moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space the centaur enters is targeted once by the following effect. *Strength Saving Throw:* DC 14. *Failure:* 7 (1d6 + 4) Bludgeoning damage, and the target has the Prone condition.
```
