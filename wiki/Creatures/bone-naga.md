---
title: Bone Naga
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Undead
size: Large
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bone Naga
size: Large
type: undead
alignment: Neutral Evil
ac: 15
hp: 65
hit_dice: 10d10 + 10
modifier: 3
speed: 40 ft.
stats: [ 15, 16, 12, 16, 15, 15 ]
damage_immunities: poison
condition_immunities: charmed, exhaustion, paralysed, poisoned
senses: Darkvision 60 ft., passive Perception 12
languages: Common plus one other language
cr: "4"
actions:
  - name: Multiattack
    desc: The naga makes two Bite attacks. It can replace any attack with a use of Serpentine Gaze.
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 10 ft. *Hit:* 10 (2d6 + 3) Piercing damage plus 7 (2d6) Necrotic damage."
  - name: Serpentine Gaze
    desc: "*Wisdom Saving Throw:* DC 13, one creature the naga can see within 60 feet. *Failure:* 13 (3d6 + 3) Psychic damage, and the target has the Charmed condition until the start of the naga's next turn."
  - name: Spellcasting
    desc: |-
      The naga casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *Mage Hand*, *Thaumaturgy*

      **1/day each:** *Command*, *Detect Thoughts*, *Lightning Bolt*
```
