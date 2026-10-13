---
title: Jiangshi
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Undead
size: Medium
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Jiangshi
size: Medium
type: undead
alignment: Lawful Evil
ac: 16
hp: 119
hit_dice: 14d8 + 56
modifier: -4
speed: 20 ft., fly 5 ft. (hover)
stats: [ 18, 3, 18, 17, 14, 12 ]
saves:
  - con: 8
  - int: 7
  - wis: 6
  - cha: 5
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: Darkvision 120 ft., passive Perception 16
languages: Common plus three other languages
cr: "9"
traits:
  - name: Jiangshi Weaknesses
    desc: |-
      The jiangshi has these weaknesses:

      - **Fear of Its Own Reflection.** If the jiangshi sees its reflection, it immediately takes its Reaction, if available, to move as far from the reflection as possible.  
      - **Susceptible to Holy Symbols.** While the jiangshi is wearing or touching a Holy Symbol, it loses its Immunity to the Frightened condition and automatically fails saving throws to avoid or end the Frightened condition.  
actions:
  - name: Multiattack
    desc: The jiangshi makes three Slam attacks and uses Consume Energy.
  - name: Slam
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 13 (2d8 + 4) Bludgeoning damage."
  - name: Consume Energy
    desc: "*Constitution Saving Throw:* DC 16, one creature the jiangshi can see within 30 feet. *Failure:* 18 (4d8) Necrotic damage. *Success:* Half damage. *Failure or Success:* The jiangshi regains Hit Points equal to the Necrotic damage taken, the jiangshi's Fly Speed increases to 20 feet until the end of its next turn, and it can take its Hungering Stride Bonus Action. A Humanoid reduced to 0 Hit Points by this damage rises at the end of the jiangshi's turn as a Wight under the jiangshi's control. If this wight kills a Humanoid with its Life Drain action, the wight transforms into an independent Jiangshi 5 days later."
bonus_actions:
  - name: Hungering Stride (Requires Consume Energy)
    desc: The jiangshi takes the Dash action.
  - name: Shape-Shift
    desc: The jiangshi shape-shifts into a Medium or Small Beast, Humanoid, or Undead creature, or it returns to its true form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```
