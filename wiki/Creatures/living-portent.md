---
title: Living Portent
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Celestial
size: Small or Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Living Portent
size: Small or Medium
type: celestial
alignment: typically Lawful Neutral
ac: 15
ac_class: natural armour
hp: 65
hit_dice: 10d8 + 20
modifier: 3
speed: 30 ft., fly 30 ft. (hover)
stats: [ 14, 16, 14, 14, 16, 15 ]
saves:
  - dex: 5
  - wis: 5
skillsaves:
  - arcana: 6
  - history: 6
  - insight: 5
  - perception: 5
damage_immunities: radiant
condition_immunities: exhaustion
senses: darkvision 120 ft., passive Perception 15
languages: all
cr: "3"
traits:
  - name: Brilliance (True Form Only)
    desc: The living portent sheds bright light for 30 feet and dim light for an additional 30 feet.
actions:
  - name: Multiattack
    desc: The living portent makes two Radiant Strike attacks.
  - name: Radiant Strike
    desc: "*Melee or Ranged Spell Attack:* +5 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 9 (1d12 + 3) radiant damage."
  - name: Prophetic Blessing
    desc: The living portent magically infuses the power of its prophecy into another willing creature the living portent can see within 30 feet of itself. The target's hit point maximum and current hit points increase by 7 (1d8 + 3), and it gains a prophecy die, a d8. Once during each of the creature's turns, when it fails an ability check or saving throw or misses an attack roll, it can roll the prophecy die and add the number rolled to the total, potentially changing the outcome. The blessing ends after 1 hour or when the living portent ends the blessing (no action required) or uses this action again.
  - name: Spellcasting
    desc: |-
      The living portent casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability:

      **2/day:** *Cure Wounds*

      **1/day each:** *Divination*, *Greater Restoration*
bonus_actions:
  - name: Change Shape
    desc: The living portent magically transforms into a Humanoid while retaining its game statistics (other than its size and Brilliance trait). The transformation ends if the living portent is reduced to 0 hit points or uses a bonus action to end it.
reactions:
  - name: Price of Defiance
    desc: When the living portent is damaged by a creature that it can see within 120 feet of itself, radiant power sears the creature. The creature must make a DC 13 Constitution saving throw, taking 10 (3d6) radiant damage on a failed save, or half as much damage on a successful one.
```
