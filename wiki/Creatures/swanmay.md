---
title: Swanmay
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fey
size: Medium
habitat:
  - Forest
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swanmay
size: Medium
type: fey
alignment: Neutral Good
ac: 14
hp: 71
hit_dice: 11d8 + 22
modifier: 4
speed: 30 ft., fly 40 ft. (swan form only)
stats: [ 10, 18, 14, 10, 16, 15 ]
saves:
  - con: 4
  - wis: 5
skillsaves:
  - nature: 4
  - perception: 5
gear:
  - longbow
  - scimitar
senses: passive Perception 15
languages: Common, Sylvan
cr: "3"
traits:
  - name: Flyby (Swan Form Only)
    desc: The swanmay doesn't provoke an Opportunity Attack action when it flies out of an enemy's reach.
actions:
  - name: Multiattack
    desc: The swanmay makes two attacks, using Beak, Longbow, or Scimitar in any combination.
  - name: Beak (Swan Form Only)
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 7 (1d6 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition."
  - name: Scimitar (Humanoid Form Only)
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 11 (2d6 + 4) Slashing damage."
  - name: Longbow (Humanoid Form Only)
    desc: "*Ranged Attack Roll:* +6, range 150/600 ft. *Hit:* 13 (2d8 + 4) Piercing damage."
  - name: Spellcasting
    desc: |-
      The swanmay casts one of the following spells, requiring no Somatic or Material components and using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *Druidcraft*, *Speak with Animals* (swan form only)

      **1/day each:** *Animal Friendship*, Beast Sense, *Spike Growth*
bonus_actions:
  - name: Shape-Shift
    desc: The swanmay shape-shifts into a Small swan, or it returns to its true humanoid form. Its game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.
```
