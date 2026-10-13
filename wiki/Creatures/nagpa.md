---
title: Nagpa
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Monstrosity
size: Medium
habitat:
  - Coastal
  - Desert
  - Forest
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nagpa
size: Medium
type: monstrosity
subtype: wizard
alignment: Typically Neutral Evil
ac: 19
ac_class: natural armour
hp: 203
hit_dice: 37d8 + 37
modifier: 2
speed: 30 ft.
stats: [ 9, 15, 12, 23, 18, 21 ]
saves:
  - int: 12
  - wis: 10
  - cha: 11
skillsaves:
  - arcana: 12
  - deception: 11
  - history: 12
  - insight: 10
  - perception: 10
senses: truesight 120 ft., passive Perception 20
languages: Common plus up to five other languages
cr: "17"
actions:
  - name: Multiattack
    desc: The nagpa makes three Staff or Deathly Ray attacks. It can replace one attack with a use of Spellcasting.
  - name: Staff
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 9 (2d6 + 2) bludgeoning damage plus 24 (7d6) necrotic damage."
  - name: Deathly Ray
    desc: "*Ranged Spell Attack:* +12 to hit, range 120 ft., one target. *Hit:* 30 (7d6 + 6) necrotic damage."
  - name: Spellcasting
    desc: |-
      The nagpa casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20):

      **At will:** *detect magic*, *mage hand*, *message*, *minor illusion*

      **2/day each:** *fireball*, *fly*, *hold person*, *suggestion*, *wall of fire*

      **1/day each:** *dominate person*, *etherealness*, *feeblemind*
bonus_actions:
  - name: Corruption
    desc: The nagpa targets one creature it can see within 90 feet of it. The target must make a DC 20 Charisma saving throw. An evil creature makes the save with disadvantage. On a failed save, the target is charmed by the nagpa until the start of the nagpa's next turn. On a successful save, the target becomes immune to the nagpa's Corruption for the next 24 hours.
  - name: Paralysis (Recharge 6–6)
    desc: The nagpa forces each creature within 30 feet of it to make a DC 20 Wisdom saving throw, excluding Undead and Constructs. On a failed save, a target is paralysed for 1 minute. A paralysed target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```
