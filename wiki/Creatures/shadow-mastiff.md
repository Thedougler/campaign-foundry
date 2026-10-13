---
title: Shadow Mastiff
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Monstrosity
size: Medium
habitat:
  - Forest
  - Hill
  - Swamp
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shadow Mastiff
size: Medium
type: monstrosity
alignment: Typically Neutral Evil
ac: 12
hp: 33
hit_dice: 6d8 + 6
modifier: 2
speed: 40 ft.
stats: [ 16, 14, 13, 5, 12, 5 ]
skillsaves:
  - perception: 5
  - stealth: 6
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks while in dim light or darkness
senses: darkvision 60 ft., passive Perception 15
cr: "2"
traits:
  - name: Ethereal Awareness
    desc: The shadow mastiff can see ethereal creatures and objects.
  - name: Sunlight Weakness
    desc: While in bright light created by sunlight, the shadow mastiff has disadvantage on attack rolls, ability checks, and saving throws.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
bonus_actions:
  - name: Shadow Blend
    desc: While in dim light or darkness, the shadow mastiff becomes invisible, along with anything it is wearing or carrying. The invisibility lasts until the shadow mastiff uses a bonus action to end it or until the shadow mastiff attacks, is in bright light, or is incapacitated.
```
