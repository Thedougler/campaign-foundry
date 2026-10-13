---
title: Myconid Sovereign
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Plant
size: Large
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Myconid Sovereign
size: Large
type: plant
alignment: Lawful Neutral
ac: 13
hp: 45
hit_dice: 6d10 + 12
modifier: 0
speed: 30 ft.
stats: [ 12, 10, 14, 13, 15, 10 ]
senses: Darkvision 120 ft., passive Perception 12
languages: telepathy 240 ft.
cr: "2"
traits:
  - name: Sun Sickness
    desc: While in sunlight, the myconid has Disadvantage on D20 Tests. The myconid dies if it spends more than 1 hour in sunlight.
actions:
  - name: Multiattack
    desc: The myconid makes one Slam attack and uses Pacifying Spores.
  - name: Slam
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 6 (2d4 + 1) Bludgeoning damage plus 5 (2d4) Poison damage."
  - name: Animating Spores (3/Day)
    desc: The myconid releases spores at a Medium or Small corpse within 5 feet of it that wasn't a Construct or an Undead. In 24 hours, the corpse rises as a Myconid Spore Servant. The corpse stays animate for 1d4 + 1 weeks or until destroyed, and it can't be animated again in this way.
  - name: Pacifying Spores
    desc: "*Constitution Saving Throw:* DC 12, one creature the myconid can see within 10 feet. *Failure:* The target has the Stunned condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
  - name: Rapport Spores
    desc: The myconid expels spores in a 30-foot Emanation originating from itself. Creatures in that area with an Intelligence score of 2 or higher that aren't Constructs, Elementals, or Undead gain telepathy with a range of 30 feet for 1 hour.
```
