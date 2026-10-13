---
title: Grell
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Aberration
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Grell
size: Medium
type: aberration
alignment: Neutral Evil
ac: 12
hp: 55
hit_dice: 10d8 + 10
modifier: 6
speed: 10 ft., fly 30 ft. (hover)
stats: [ 15, 14, 13, 12, 11, 9 ]
skillsaves:
  - perception: 4
  - stealth: 6
damage_immunities: lightning
condition_immunities: blinded, prone
senses: Blindsight 60 ft., passive Perception 14
languages: Deep Speech
cr: "3"
traits:
  - name: Abduct
    desc: The grell needn't spend extra movement to move a creature it is grappling.
actions:
  - name: Multiattack
    desc: The grell makes one Beak attack and one Paralysing Tentacles attack.
  - name: Beak
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 11 (2d8 + 2) Piercing damage."
  - name: Paralysing Tentacles
    desc: "*Melee Attack Roll:* +4, reach 10 ft. *Hit:* 7 (1d10 + 2) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12) from two of ten tentacles. The target is also subjected to the following effect. *Constitution Saving Throw:* DC 11. *Failure:* The target has the Poisoned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While Poisoned, the target has the Paralysed condition."
```
