---
title: Kraul Death Priest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kraul Death Priest
size: Medium
type: humanoid
subtype: kraul
alignment: Neutral Evil
ac: 18
ac_class: natural armour
hp: 65
hit_dice: 10d8 + 20
modifier: 1
speed: 30 ft., climb 30 ft., fly 40 ft.
stats: [ 16, 12, 14, 12, 15, 10 ]
saves:
  - con: 4
  - wis: 4
skillsaves:
  - insight: 4
  - nature: 3
  - religion: 3
gear:
  - quarterstaff
senses: darkvision 60 ft., passive Perception 12
languages: Common, Kraul
cr: "4"
traits:
  - name: Innate Spellcasting
    desc: |-
      The kraul's innate spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The kraul can innately cast the following spells, requiring no material components:

      **At will:** *chill touch*, *poison spray*

      **3/day each:** *ray of enfeeblement*, *ray of sickness*

      **1/day each:** *animate dead*, *blight*, *vampiric touch*
  - name: Feed on Death
    desc: When a creature within 30 feet of the kraul drops to 0 hit points, the kraul or another creature of its choice within 30 feet of it gains 5 (1d10) temporary hit points, provided the kraul isn't incapacitated.
  - name: Hive Mind
    desc: The kraul is immune to the charmed and frightened conditions while within 30 feet of at least one other kraul.
  - name: Pack Tactics
    desc: The kraul has advantage on an attack roll against a creature if at least one of the kraul's allies is within 5 feet of the creature and the ally isn't incapacitated.
  - name: Spider Climb
    desc: The kraul can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The kraul makes one attack with its quarterstaff and casts one of its spells with a casting time of 1 action.
  - name: Quarterstaff
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) bludgeoning damage, or 7 (1d8 + 3) bludgeoning damage if used with two hands."
```
