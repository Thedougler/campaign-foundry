---
title: Pseudodragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Dragon
size: Tiny
habitat:
  - Coastal
  - Desert
  - Forest
  - Hill
  - Mountain
  - Urban
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Pseudodragon
size: Tiny
type: dragon
alignment: Neutral Good
ac: 14
hp: 10
hit_dice: 3d4 + 3
modifier: 2
speed: 15 ft., fly 60 ft.
stats: [ 6, 15, 13, 10, 12, 10 ]
skillsaves:
  - perception: 5
  - stealth: 4
senses: Blindsight 10 ft., Darkvision 60 ft., passive Perception 15
languages: understands Common and Draconic but can't speak
cr: 1/4
traits:
  - name: Magic Resistance
    desc: The pseudodragon has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The pseudodragon makes two Bite attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 4 (1d4 + 2) Piercing damage."
  - name: Sting
    desc: "*Constitution Saving Throw:* DC 12, one creature the pseudodragon can see within 5 feet. *Failure:* 5 (2d4) Poison damage, and the target has the Poisoned condition for 1 hour. While Poisoned, the target also has the Unconscious condition, which ends early if the target takes damage or a creature within 5 feet of it takes an action to wake it."
```
