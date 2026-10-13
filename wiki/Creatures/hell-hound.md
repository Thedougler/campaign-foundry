---
title: Hell Hound
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fiend
size: Medium
habitat:
  - Mountain
  - Planar (Lower)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hell Hound
size: Medium
type: fiend
alignment: Lawful Evil
ac: 15
hp: 58
hit_dice: 9d8 + 18
modifier: 1
speed: 50 ft.
stats: [ 17, 12, 14, 6, 13, 6 ]
skillsaves:
  - perception: 5
damage_immunities: fire
senses: Darkvision 60 ft., passive Perception 15
languages: understands Infernal but can't speak
cr: "3"
traits:
  - name: Pack Tactics
    desc: The hound has Advantage on an attack roll against a creature if at least one of the hound's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The hound makes two Bite attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Piercing damage plus 3 (1d6) Fire damage."
  - name: Fire Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 12, each creature in a 15-foot Cone. *Failure:* 17 (5d6) Fire damage. *Success:* Half damage."
```
