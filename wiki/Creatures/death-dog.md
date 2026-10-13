---
title: Death Dog
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Monstrosity
size: Medium
habitat:
  - Desert
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Death Dog
size: Medium
type: monstrosity
alignment: Neutral Evil
ac: 12
hp: 39
hit_dice: 6d8 + 12
modifier: 2
speed: 40 ft.
stats: [ 15, 14, 14, 3, 13, 6 ]
skillsaves:
  - perception: 5
  - stealth: 4
condition_immunities: blinded, charmed, deafened, frightened, stunned, unconscious
senses: Darkvision 120 ft., passive Perception 15
cr: "1"
actions:
  - name: Multiattack
    desc: The death dog makes two Bite attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 4 (1d4 + 2) Piercing damage. If the target is a creature, it is subjected to the following effect. *Constitution Saving Throw:* DC 12. *1St Failure:* The target has the Poisoned condition. While Poisoned, the target's Hit Point maximum doesn't return to normal when finishing a Long Rest, and it repeats the save every 24 hours that elapse, ending the effect on itself on a success. Subsequent Failures: The Poisoned target's Hit Point maximum decreases by 5 (1d10)."
```
