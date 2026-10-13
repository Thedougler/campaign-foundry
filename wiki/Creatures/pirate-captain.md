---
title: Pirate Captain
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Pirate Captain
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 17
hp: 84
hit_dice: 13d8 + 26
modifier: 7
speed: 30 ft.
stats: [ 10, 18, 14, 10, 14, 17 ]
saves:
  - str: 3
  - dex: 7
  - wis: 5
  - cha: 6
skillsaves:
  - acrobatics: 7
  - perception: 5
gear:
  - pistol
  - rapier
senses: passive Perception 15
languages: Common plus one other language
cr: "6"
actions:
  - name: Multiattack
    desc: The pirate makes three attacks, using Rapier or Pistol in any combination.
  - name: Rapier
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 13 (2d8 + 4) Piercing damage, and the pirate has Advantage on the next attack roll it makes before the end of this turn."
  - name: Pistol
    desc: "*Ranged Attack Roll:* +7, range 30/90 ft. *Hit:* 15 (2d10 + 4) Piercing damage."
bonus_actions:
  - name: Captain's Charm
    desc: "*Wisdom Saving Throw:* DC 14, one creature the pirate can see within 30 feet. *Failure:* The target has the Charmed condition until the start of the pirate's next turn."
reactions:
  - name: Riposte
    desc: "Trigger: The pirate is hit by a melee attack roll while holding a weapon. _Response:_ The pirate adds 3 to its AC against that attack, possibly causing it to miss. On a miss, the pirate makes one Rapier attack against the triggering creature if within range."
```
