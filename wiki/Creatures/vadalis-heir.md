---
title: Vadalis Heir
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vadalis Heir
size: Small or Medium
type: humanoid
subtype: human
alignment: Neutral
ac: 14
hp: 52
hit_dice: 8d8 + 16
modifier: 3
speed: 30 ft.
stats: [ 12, 16, 15, 10, 17, 13 ]
saves:
  - dex: 5
  - con: 4
  - wis: 5
skillsaves:
  - animal handling: 7
  - nature: 4
  - stealth: 5
gear:
  - leather armour
  - scimitar
senses: passive Perception 13
languages: Common, Sylvan
cr: "4"
traits:
  - name: Pack Tactics
    desc: The heir has Advantage on an attack roll against a creature if at least one of the heir's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The heir makes four attacks, using Scimitar or Lunar Wisp in any combination.
  - name: Scimitar
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Slashing damage plus 3 (1d6) Poison damage."
  - name: Lunar Wisp
    desc: "*Ranged Attack Roll:* +5, range 60 ft. *Hit:* 9 (2d8) Radiant damage, and the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition until the end of the heir's next turn."
  - name: Spellcasting
    desc: |-
      The heir casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *Druidcraft*, *Light*, *Speak with Animals*

      **3/day each:** *Animal Friendship*, *Animal Messenger*

      **1/day:** *Ice Storm*
bonus_actions:
  - name: Spur Beast
    desc: The heir targets a Beast it can see within 30 feet. The target can take a Reaction to move up to half its Speed and make one melee attack.
```
