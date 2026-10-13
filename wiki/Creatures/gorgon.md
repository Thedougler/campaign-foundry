---
title: Gorgon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Construct
size: Large
habitat:
  - Forest
  - Grassland
  - Hill
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gorgon
size: Large
type: construct
alignment: Unaligned
ac: 19
hp: 114
hit_dice: 12d10 + 48
modifier: 0
speed: 40 ft.
stats: [ 20, 11, 18, 2, 12, 7 ]
skillsaves:
  - perception: 7
condition_immunities: exhaustion, petrified
senses: Darkvision 60 ft., passive Perception 17
cr: "5"
actions:
  - name: Gore
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 18 (2d12 + 5) Piercing damage. If the target is a Large or smaller creature and the gorgon moved 20+ feet straight toward it immediately before the hit, the target has the Prone condition."
  - name: Petrifying Breath (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 15, each creature in a 30-foot Cone. *1St Failure:* The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. *2Nd Failure:* The target has the Petrified condition instead of the Restrained condition."
bonus_actions:
  - name: Trample
    desc: "*Dexterity Saving Throw:* DC 16, one creature within 5 feet that has the Prone condition. *Failure:* 16 (2d10 + 5) Bludgeoning damage. *Success:* Half damage."
```
