---
title: Mind Mage
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mind Mage
size: Medium
type: humanoid
subtype: any race
alignment: Neutral Evil
ac: 12
ac_class: 15 with *mage armour*
hp: 49
hit_dice: 11d8
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 10, 20, 15, 16 ]
saves:
  - int: 8
  - wis: 5
skillsaves:
  - arcana: 8
  - deception: 6
  - insight: 5
  - persuasion: 6
gear:
  - dagger
senses: passive Perception 12
languages: Common plus any four languages
cr: "5"
traits:
  - name: Innate Spellcasting (Psionics)
    desc: |-
      The mage's spellcasting ability is Intelligence (spell save DC 16). It can innately cast the following spells, requiring no components:

      **At will:** encode thoughts (see chapter 2), friends

      **3/day each:** *charm person*, *detect thoughts*, *mage armour*, *sleep*, *suggestion*

      **1/day each:** *dominate person*, *mass suggestion*, *modify memory*
  - name: Special Equipment
    desc: The mage wears a spies' murmur (see chapter 5).
actions:
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."
```
