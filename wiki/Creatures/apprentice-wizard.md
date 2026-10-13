---
title: Apprentice Wizard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Humanoid
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Apprentice Wizard
size: Medium
type: humanoid
alignment: Any alignment
ac: 10
ac_class: 13 with *mage armour*
hp: 13
hit_dice: 3d8
modifier: 0
speed: 30 ft.
stats: [ 10, 10, 10, 14, 10, 11 ]
skillsaves:
  - arcana: 4
  - history: 4
senses: passive Perception 10
languages: any one language (usually Common)
cr: 1/4
actions:
  - name: Arcane Burst
    desc: "*Melee or Ranged Spell Attack:* +4 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 7 (1d10 + 2) force damage."
  - name: Spellcasting
    desc: |-
      The apprentice casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12)

      **At will:** *mage hand*, *prestidigitation*

      **1/day each:** *burning hands*, *disguise self*, *mage armour*
```
