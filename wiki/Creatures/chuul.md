---
title: Chuul
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Aberration
size: Large
habitat:
  - Coastal
  - Swamp
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Chuul
size: Large
type: aberration
alignment: Chaotic Evil
ac: 16
hp: 76
hit_dice: 9d10 + 27
modifier: 0
speed: 30 ft., swim 30 ft.
stats: [ 19, 10, 16, 5, 11, 5 ]
skillsaves:
  - perception: 4
damage_immunities: poison
condition_immunities: poisoned
senses: Darkvision 60 ft., passive Perception 14
languages: understands Deep Speech but can't speak
cr: "4"
traits:
  - name: Amphibious
    desc: The chuul can breathe air and water.
  - name: Sense Magic
    desc: The chuul senses magic within 120 feet of itself. This trait otherwise works like the *Detect Magic* spell but isn't itself magical.
actions:
  - name: Multiattack
    desc: The chuul makes two Pincer attacks and uses Paralysing Tentacles.
  - name: Pincer
    desc: "*Melee Attack Roll:* +6, reach 10 ft. *Hit:* 9 (1d10 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of two pincers."
  - name: Paralysing Tentacles
    desc: "*Constitution Saving Throw:* DC 13, one creature Grappled by the chuul. *Failure:* The target has the Poisoned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While Poisoned, the target has the Paralysed condition."
```
