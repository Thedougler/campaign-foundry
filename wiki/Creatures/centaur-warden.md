---
title: Centaur Warden
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
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
name: Centaur Warden
size: Large
type: fey
alignment: Neutral Good
ac: 16
hp: 105
hit_dice: 14d10 + 28
modifier: 2
speed: 50 ft.
stats: [ 18, 14, 14, 9, 18, 11 ]
saves:
  - con: 5
  - wis: 7
skillsaves:
  - athletics: 7
  - nature: 5
  - perception: 7
senses: passive Perception 17
languages: Druidic, Elvish, Sylvan
cr: "7"
actions:
  - name: Multiattack
    desc: The centaur makes two attacks, using Forest Staff or Sun Ray in any combination.
  - name: Forest Staff
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 13 (2d8 + 4) Bludgeoning damage plus 14 (4d6) Poison damage."
  - name: Sun Ray
    desc: "*Ranged Attack Roll:* +7, range 90 ft. *Hit:* 14 (3d6 + 4) Radiant damage, and the target has the Blinded condition until the start of the centaur's next turn."
  - name: Spellcasting
    desc: |-
      The centaur casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 15):

      **At will:** *Druidcraft*, *Speak with Animals*
bonus_actions:
  - name: Entangling Trail (Recharge 5–6)
    desc: The centaur moves up to its Speed without provoking Opportunity Attacks. Each creature within 5 feet of the centaur as it moves is targeted once by the following effect. *Strength Saving Throw:* DC 15. *Failure:* 11 (2d6 + 4) Bludgeoning damage, and the target has the Restrained condition until the end of its next turn.
```
