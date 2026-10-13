---
title: Flumph
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.125
creature_type: Aberration
size: Small
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Flumph
size: Small
type: aberration
alignment: Lawful Good
ac: 12
hp: 7
hit_dice: 2d6
modifier: 2
speed: 5 ft., fly 30 ft. (hover)
stats: [ 6, 15, 10, 14, 14, 11 ]
skillsaves:
  - arcana: 4
  - history: 4
  - religion: 4
damage_vulnerabilities: psychic
senses: Darkvision 60 ft., passive Perception 12
languages: understands Undercommon but can't speak; telepathy 60 ft.
cr: 1/8
traits:
  - name: Advanced Telepathy
    desc: The flumph perceives the content of any telepathic communication within 60 feet of it.
  - name: Prone Deficiency
    desc: If the flumph receives the Prone condition, roll a die. On an odd number, it has the Incapacitated condition. At the end of each of its turns, the flumph makes a DC 10 Dexterity saving throw, ending the Incapacitated condition on a success.
  - name: Telepathic Shroud
    desc: The flumph's thoughts can't be read by any means, and magic can't detect its location or observe it remotely.
actions:
  - name: Tentacle
    desc: "*Melee Attack Roll:* +4, reach 5 feet. *Hit:* 4 (1d4 + 2) Acid damage."
  - name: Stench Spray (1/Day)
    desc: "*Dexterity Saving Throw:* DC 10, one creature the flumph can see within 15 feet. *Failure:* The target is coated in a foul-smelling liquid, exudes a stench for 1d4 hours, and has the Poisoned condition while the stench lasts. Other creatures have the Poisoned condition while in a 5-foot Emanation originating from the coated target. The target can remove the stench on itself if it bathes during a Short or Long Rest."
```
