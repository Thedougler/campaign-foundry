---
title: Ghallanda Troubleshooter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Small
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ghallanda Troubleshooter
size: Small
type: humanoid
subtype: halfling
alignment: Neutral
ac: 14
hp: 78
hit_dice: 12d6 + 36
modifier: 3
speed: 30 ft.
stats: [ 10, 16, 17, 13, 14, 17 ]
saves:
  - dex: 5
  - con: 5
  - wis: 4
  - cha: 5
skillsaves:
  - insight: 4
  - perception: 4
  - stealth: 5
condition_immunities: frightened
gear:
  - six daggers
  - leather armour
senses: passive Perception 14
languages: Common, Halfling
cr: "3"
traits:
  - name: Hustle
    desc: The troubleshooter can move through the space of any creature that is of a larger size, but it can't stop there.
actions:
  - name: Multiattack
    desc: The troubleshooter makes two Poisoned Dagger attacks.
  - name: Poisoned Dagger
    desc: "*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 20/60 ft. *Hit:* 5 (1d4 + 3) Piercing damage, and the target has the Poisoned condition until the start of the troubleshooter's next turn."
  - name: Spellcasting
    desc: |-
      The troubleshooter casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):

      **1/day each:** *Sleep*, *Unseen Servant*
bonus_actions:
  - name: Nimble Escape
    desc: The troubleshooter takes the Disengage or Hide action.
```
