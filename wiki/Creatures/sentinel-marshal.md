---
title: Sentinel Marshal
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sentinel Marshal
size: Small or Medium
type: humanoid
subtype: human
alignment: Lawful Neutral
ac: 16
hp: 110
hit_dice: 20d8 + 20
modifier: 10
speed: 30 ft.
stats: [ 18, 19, 12, 11, 15, 10 ]
saves:
  - dex: 7
  - con: 4
skillsaves:
  - athletics: 7
  - insight: 5
  - perception: 8
gear:
  - longsword
  - pistol
  - studded leather armour
senses: passive Perception 18
languages: Common plus two other languages
cr: "6"
actions:
  - name: Multiattack
    desc: The marshal makes three attacks, using Longsword or Pistol in any combination.
  - name: Longsword
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 13 (2d8 + 4) Slashing damage, and the target has Disadvantage on the next attack roll it makes before the start of the marshal's next turn."
  - name: Pistol
    desc: "*Ranged Attack Roll:* +7, range 30/90 ft. *Hit:* 15 (2d10 + 4) Piercing damage."
reactions:
  - name: Shield (3/Day)
    desc: |
      The marshal casts *Shield* in response to the spell's trigger, using Wisdom as the spellcasting ability.
```
