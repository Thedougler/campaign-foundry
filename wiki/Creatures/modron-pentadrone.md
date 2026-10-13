---
title: Modron Pentadrone
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Construct
size: Large
habitat:
  - Planar (Mechanus)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Modron Pentadrone
size: Large
type: construct
alignment: Lawful Neutral
ac: 16
hp: 32
hit_dice: 5d10 + 5
modifier: 2
speed: 40 ft.
stats: [ 15, 14, 12, 10, 10, 13 ]
skillsaves:
  - perception: 4
condition_immunities: charmed
senses: Truesight 120 ft., passive Perception 14
languages: Modron
cr: "2"
traits:
  - name: Disintegration
    desc: If the modron dies, it disintegrates into dust, leaving behind anything it was wearing or carrying.
actions:
  - name: Multiattack
    desc: The modron makes five Slam attacks or five Electrical Discharge attacks.
  - name: Slam
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Force damage."
  - name: Electrical Discharge
    desc: "*Ranged Attack Roll:* +4, range 120 ft. *Hit:* 5 (1d6 + 2) Lightning damage."
  - name: Paralysis Gas (Recharge 5–6)
    desc: "Constitution Saving Throws: DC 11, each creature in a 30-foot Cone. *Failure:* The target has the Paralysed condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
```
