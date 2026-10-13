---
title: Otyugh
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Aberration
size: Large
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Otyugh
size: Large
type: aberration
alignment: Neutral
ac: 14
hp: 104
hit_dice: 11d10 + 44
modifier: 0
speed: 30 ft.
stats: [ 16, 11, 19, 6, 13, 6 ]
saves:
  - con: 7
senses: Darkvision 120 ft., passive Perception 11
languages: Otyugh; telepathy 120 ft. (doesn't allow the receiving creature to respond telepathically)
cr: "5"
actions:
  - name: Multiattack
    desc: The otyugh makes one Bite attack and two Tentacle attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 12 (2d8 + 3) Piercing damage, and the target has the Poisoned condition. Whenever the Poisoned target finishes a Long Rest, it is subjected to the following effect. *Constitution Saving Throw:* DC 15. *Failure:* The target's Hit Point maximum decreases by 5 (1d10) and doesn't return to normal until the Poisoned condition ends on the target. *Success:* The Poisoned condition ends."
  - name: Tentacle
    desc: "*Melee Attack Roll:* +6, reach 10 ft. *Hit:* 12 (2d8 + 3) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from one of two tentacles."
  - name: Tentacle Slam
    desc: "*Constitution Saving Throw:* DC 14, each creature Grappled by the otyugh. *Failure:* 16 (3d8 + 3) Bludgeoning damage, and the target has the Stunned condition until the start of the otyugh's next turn. *Success:* Half damage only."
```
