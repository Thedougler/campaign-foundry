---
title: Leprechaun
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Fey
size: Small
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Leprechaun
size: Small
type: fey
alignment: typically Neutral
ac: 13
hp: 52
hit_dice: 8d6 + 24
modifier: 3
speed: 30 ft.
stats: [ 6, 17, 16, 12, 14, 18 ]
saves:
  - con: 5
  - wis: 4
skillsaves:
  - perception: 4
  - sleight of hand: 7
  - stealth: 5
senses: darkvision 60 ft., passive Perception 14
languages: Common, Sylvan
cr: "4"
traits:
  - name: Industrious
    desc: The leprechaun is proficient with all artisan's tools and adds double its proficiency bonus to ability checks made with them.
  - name: Reluctant Refusal
    desc: When a creature offers the leprechaun the chance to partake in merriment or revelry such as a song, a dance, or a good meal, the leprechaun must succeed on a DC 15 Wisdom saving throw or have the charmed condition for 24 hours. While charmed in this way, the leprechaun partakes of the offering, treats the creature as a trusted friend, and seeks to defend it from harm. The charmed condition ends if the creature or any of its allies damage the leprechaun, force the leprechaun to make a saving throw, or steal from the leprechaun.
actions:
  - name: Multiattack
    desc: The leprechaun makes two Cobbler's Hammer attacks and can use Spellcasting.
  - name: Cobbler's Hammer
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) bludgeoning damage plus 13 (3d8) force damage. If the target is a creature, its speed is halved until the start of the leprechaun's next turn."
  - name: Gift of Luck (1/Day)
    desc: The leprechaun touches a creature and magically gifts the target a measure of luck. The creature gains the leprechaun's Astonishing Luck reaction. The creature can use the reaction three times, after which this gift goes away. The leprechaun can revoke this gift from a creature at any time (no action required). A creature can benefit from only one leprechaun's Gift of Luck at a time.
  - name: Spellcasting
    desc: |-
      The leprechaun casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 14):

      **At will:** *Mending* (as an action), *Prestidigitation*

      **2/day each:** *Invisibility*, *Phantasmal Force*

      **1/day each:** *Fabricate* (as an action), *Mislead*
bonus_actions:
  - name: Cunning Trick
    desc: The leprechaun takes the Disengage or Hide action or makes a Dexterity (Sleight of Hand) check.
reactions:
  - name: Astonishing Luck
    desc: When the leprechaun fails an ability check, an attack roll, or a saving throw, it can roll a new d20 and choose which roll to use, potentially turning the failure into a success.
```
