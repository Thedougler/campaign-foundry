---
title: Jorasco Medic
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Small
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Jorasco Medic
size: Small
type: humanoid
subtype: halfling
alignment: Neutral
ac: 16
hp: 58
hit_dice: 9d6 + 27
modifier: 4
speed: 30 ft.
stats: [ 12, 15, 16, 14, 17, 14 ]
saves:
  - con: 5
  - wis: 5
skillsaves:
  - insight: 5
  - medicine: 5
  - perception: 5
  - stealth: 4
gear:
  - breastplate
senses: passive Perception 15
languages: Common, Halfling
cr: "4"
traits:
  - name: Lucky
    desc: When the medic rolls a 1 on the d20 of a D20 Test, it can reroll the die, and it must use the new roll.
actions:
  - name: Multiattack
    desc: The medic makes two Radiant Burst attacks.
  - name: Radiant Burst
    desc: "*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 30 ft. *Hit:* 7 (2d6) Radiant damage, and the creature has the Blinded condition until the start of the medic's next turn."
bonus_actions:
  - name: Mark of Healing (2/Day)
    desc: |
      The medic casts *Cure Wounds* or *Lesser Restoration*, using Wisdom as the spellcasting ability.
```
