---
title: Medani Inquisitive
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Medani Inquisitive
size: Small or Medium
type: humanoid
subtype: khoravar
alignment: Neutral
ac: 14
hp: 45
hit_dice: 7d8 + 14
modifier: 0
speed: 30 ft.
stats: [ 14, 10, 14, 15, 16, 14 ]
saves:
  - con: 4
  - wis: 5
skillsaves:
  - insight: 5
  - investigation: 4
gear:
  - breastplate
  - quarterstaff
senses: Darkvision 60 ft., passive Perception 13
languages: Common, Elvish
cr: "3"
actions:
  - name: Multiattack
    desc: The inquisitive makes three Crooked Staff attacks. It can replace one attack with a use of Inquisitive Eye.
  - name: Crooked Staff
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 6 (1d8 + 2) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. If the target already has the Prone condition, the attack deals an extra 7 (2d6) Radiant damage."
  - name: Inquisitive Eye
    desc: "*Wisdom Saving Throw:* DC 13, one creature the inquisitive can see within 60 feet. *Failure:* 10 (3d6) Psychic damage, and the target is marked. The inquisitive has Advantage on attack rolls against a target it has marked. While marked, the target can't become hidden from the inquisitive, and if it has the Invisible condition, it gains no benefit from that condition against the inquisitive. The mark disappears after 1 minute or when the inquisitive uses this action again. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The inquisitive casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *Guidance*

      **1/day each:** *Detect Thoughts*, *See Invisibility*
reactions:
  - name: Spontaneous Barrier (Recharge 4–6)
    desc: "Trigger: The inquisitive or an ally it can see is hit with an attack roll. _Response:_ The inquisitive adds 2 to its or the ally's AC against that attack, possibly causing it to miss."
```
