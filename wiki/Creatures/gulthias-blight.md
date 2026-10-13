---
title: Gulthias Blight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Plant
size: Gargantuan
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gulthias Blight
size: Gargantuan
type: plant
alignment: Neutral Evil
ac: 20
hp: 264
hit_dice: 16d20 + 96
modifier: 5
speed: 50 ft.
stats: [ 25, 10, 22, 10, 18, 12 ]
skillsaves:
  - perception: 9
damage_resistances: fire, necrotic
condition_immunities: deafened
senses: Blindsight 120 ft., passive Perception 19
languages: Common, Druidic
cr: "16"
traits:
  - name: Blight Seeds
    desc: "When it finishes a Long Rest, the blight expels 1d6 seeds into unoccupied spaces on the ground within 30 feet of itself. After 24 hours, the seeds become creatures under the blight's control. Roll 1d8 for each seed to determine the creature it becomes: on 1–4, Twig Blight; on 5–6, Needle Blight; on 7–8, Vine Blight."
actions:
  - name: Multiattack
    desc: The blight makes two attacks, using Slam or Thorn Volley in any combination. It also uses Life-Draining Root.
  - name: Slam
    desc: "*Melee Attack Roll:* +12, reach 10 ft. *Hit:* 25 (4d8 + 7) Bludgeoning damage."
  - name: Thorn Volley
    desc: "*Ranged Attack Roll:* +12, range 60/180 ft. *Hit:* 20 (3d8 + 7) Piercing damage."
  - name: Life-Draining Root
    desc: "*Constitution Saving Throw:* DC 20, one Huge or smaller creature the blight can see within 30 feet. *Failure:* 14 (2d6 + 7) Necrotic damage, and the target has the Grappled condition (escape DC 17) from one of six roots. Until the grapple ends, the target has the Restrained condition and takes 14 (4d6) Necrotic damage at the start of each of its turns. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the blight regains Hit Points equal to that amount."
```
