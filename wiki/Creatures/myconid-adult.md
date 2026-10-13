---
title: Myconid Adult
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Plant
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Myconid Adult
size: Medium
type: plant
alignment: Lawful Neutral
ac: 12
hp: 16
hit_dice: 3d8 + 3
modifier: 0
speed: 20 ft.
stats: [ 10, 10, 12, 10, 13, 7 ]
senses: Darkvision 120 ft., passive Perception 11
languages: telepathy 240 ft.
cr: 1/2
traits:
  - name: Sun Sickness
    desc: While in sunlight, the myconid has Disadvantage on D20 Tests. The myconid dies if it spends more than 1 hour in sunlight.
actions:
  - name: Slam
    desc: "*Melee Attack Roll:* +2, reach 5 ft. *Hit:* 4 (1d8) Bludgeoning damage plus 3 (1d6) Poison damage."
  - name: Pacifying Spores (1/Day)
    desc: "*Constitution Saving Throw:* DC 11, one creature the myconid can see within 10 feet. *Failure:* The target has the Stunned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
  - name: Rapport Spores
    desc: The myconid expels spores in a 30-foot Emanation originating from itself. Creatures in that area with an Intelligence score of 2 or higher that aren't Constructs, Elementals, or Undead gain telepathy with a range of 30 feet for 1 hour.
```
