---
title: Vulkoori Venom Priest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vulkoori Venom Priest
size: Medium
type: humanoid
subtype: elf
alignment: Neutral Evil
ac: 15
hp: 44
hit_dice: 8d8 + 8
modifier: 3
speed: 30 ft.
stats: [ 15, 16, 12, 10, 16, 13 ]
saves:
  - con: 3
  - wis: 5
skillsaves:
  - perception: 5
  - religion: 2
  - stealth: 5
damage_resistances: poison
gear:
  - holy symbol
  - quarterstaff
  - studded leather armour
senses: Darkvision 120 ft., passive Perception 15
languages: Common, Elvish, Giant
cr: "2"
traits:
  - name: Fey Ancestry
    desc: Magic can't put the priest to sleep.
actions:
  - name: Venom Staff
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 9 (2d6 + 2) Bludgeoning damage, and the target has the Poisoned condition until the end of the priest's next turn."
  - name: Spellcasting
    desc: |-
      The priest casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13, +5 to hit with spell attacks):

      **At will:** *Dancing Lights*, *Ray of Sickness*, *Thaumaturgy*

      **1/day each:** *Cure Wounds*, *Hold Person*, *Protection from Poison*
bonus_actions:
  - name: Intensify Poison
    desc: Each creature with the Poisoned condition within a 30-foot Emanation originating from the priest takes 3 (1d6) Poison damage.
```
