---
title: Cultist of Bane
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Small or Medium
habitat:
  - Urban
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cultist of Bane
size: Small or Medium
type: humanoid
alignment: Neutral Evil
ac: 16
hp: 142
hit_dice: 19d8 + 57
modifier: 6
speed: 30 ft.
stats: [ 18, 14, 16, 13, 19, 15 ]
saves:
  - con: 7
  - wis: 8
  - cha: 6
skillsaves:
  - intimidation: 6
  - perception: 8
gear:
  - breastplate
  - holy symbol
senses: passive Perception 18
languages: Common
cr: "9"
traits:
  - name: Determined Survivor
    desc: The cultist regains 10 Hit Points at the start of each of its turns if it is Bloodied and has at least 1 Hit Point.
actions:
  - name: Multiattack
    desc: The cultist makes three attacks, using Gauntlet or Oppressive Burst in any combination. It can replace one attack with a use of Spellcasting to cast *Dominate Person*, if available.
  - name: Gauntlet
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 17 (3d8 + 4) Bludgeoning damage."
  - name: Oppressive Burst
    desc: "*Ranged Attack Roll:* +8, range 120 ft. *Hit:* 16 (2d10 + 5) Psychic damage, and the target can't take Reactions until the start of the cultist's next turn."
  - name: Spellcasting
    desc: |-
      The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 16):

      **2/day each:** *Calm Emotions*, *Detect Thoughts*

      **1/day:** *Dominate Person*
reactions:
  - name: Counterattack
    desc: "Trigger: The cultist is hit by an attack roll. _Response:_ The cultist makes one Gauntlet or Oppressive Burst attack against the triggering creature."
```
