---
title: Dragon Speaker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Small
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dragon Speaker
size: Small
type: humanoid
alignment: Any alignment
ac: 13
ac_class: leather armour
hp: 36
hit_dice: 8d6 + 8
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 12, 13, 11, 17 ]
saves:
  - dex: 4
  - cha: 5
skillsaves:
  - persuasion: 5
  - religion: 3
condition_immunities: charmed, frightened
senses: darkvision 60 ft., passive Perception 10
languages: Common, Draconic, and any two languages
cr: "2"
actions:
  - name: Multiattack
    desc: The speaker makes two Thunder Bolt attacks.
  - name: Thunder Bolt
    desc: "*Melee or Ranged Spell Attack:* +5 to hit, reach 5 ft. or range 60 ft., one target. *Hit:* 13 (3d8) thunder damage, and the target is pushed horizontally up to 10 feet away from the speaker."
  - name: Spellcasting
    desc: |-
      The speaker casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *dancing lights*

      **1/day each:** *calm emotions*, *charm person*, *command*, *comprehend languages*
reactions:
  - name: Disarming Words (3/Day)
    desc: When a creature the speaker can see within 60 feet of it makes a damage roll, the speaker can roll a d6 and subtract the number rolled from that damage roll.
```
