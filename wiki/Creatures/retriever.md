---
title: Retriever
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Construct
size: Large
habitat:
  - Desert
  - Forest
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Retriever
size: Large
type: construct
alignment: Typically Lawful Evil
ac: 19
ac_class: natural armour
hp: 210
hit_dice: 20d10 + 100
modifier: 3
speed: 40 ft., climb 40 ft.
stats: [ 22, 16, 20, 3, 11, 4 ]
saves:
  - dex: 8
  - con: 10
  - wis: 5
skillsaves:
  - perception: 5
  - stealth: 8
damage_immunities: necrotic; poison; psychic; bludgeoning, piercing, slashing from nonmagical attacks that aren't adamantine
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: blindsight 30 ft., darkvision 60 ft., passive Perception 15
languages: understands Abyssal, Elvish, and Undercommon but can't speak
cr: "14"
traits:
  - name: Faultless Tracker
    desc: The retriever is given a quarry by its master. The quarry can be a specific creature or object the master is personally acquainted with, or it can be a general type of creature or object the master has seen before. The retriever knows the direction and distance to its quarry as long as the two of them are on the same plane of existence. The retriever can have only one such quarry at a time. The retriever also always knows the location of its master.
actions:
  - name: Multiattack
    desc: The retriever makes two Foreleg attacks, and it uses Force Beam or Paralysing Beam, if available.
  - name: Foreleg
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 15 (2d8 + 6) slashing damage."
  - name: Force Beam
    desc: The retriever targets one creature it can see within 60 feet of it. The target must make a DC 16 Dexterity saving throw, taking 27 (5d10) force damage on a failed save, or half as much damage on a successful one.
  - name: Paralysing Beam (Recharge 5–6)
    desc: |-
      The retriever targets one creature it can see within 60 feet of it. The target must succeed on a DC 18 Constitution saving throw or be paralysed for 1 minute. The paralysed target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.

      If the paralysed creature is Medium or smaller, the retriever can pick it up as part of the retriever's move and walk or climb with it at full speed.
  - name: Spellcasting
    desc: |-
      The retriever casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 13):

      **3/day each:** *plane shift* (only self and up to one incapacitated creature, which is considered willing for the spell), *web*
```
