---
title: Storm Giant Quintessent
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Giant
size: Huge
habitat:
  - Coastal
  - Desert
  - Mountain
  - Underwater
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Storm Giant Quintessent
size: Huge
type: giant
alignment: Typically Chaotic Good
ac: 12
hp: 230
hit_dice: 20d12 + 100
modifier: 2
speed: 50 ft., fly 50 ft. (hover), swim 50 ft.
stats: [ 29, 14, 20, 17, 20, 19 ]
saves:
  - str: 14
  - con: 10
  - wis: 10
  - cha: 9
skillsaves:
  - arcana: 8
  - history: 8
  - perception: 10
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: lightning, thunder
senses: truesight 60 ft., passive Perception 20
languages: Common, Giant
cr: "16"
traits:
  - name: Amphibious
    desc: The giant can breathe air and water.
  - name: Legendary Resistance (1/Day)
    desc: If the giant fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The giant makes two Lightning Sword attacks, or it uses Wind Javelin twice.
  - name: Lightning Sword
    desc: "*Melee Weapon Attack:* +14 to hit, reach 15 ft., one target. *Hit:* 40 (9d6 + 9) lightning damage."
  - name: Wind Javelin
    desc: The giant coalesces wind into a javelin-like form and hurls it at a creature it can see within 600 feet of it. The javelin deals 19 (3d6 + 9) force damage to the target, striking unerringly. The javelin disappears after it hits.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the storm giant quintessent can expend a use to take one of the following actions. The storm giant quintessent regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Gust
    desc: The giant targets a creature it can see within 60 feet of it and creates a magical gust of wind around the target, who must succeed on a DC 18 Strength saving throw or be moved up to 20 feet in any horizontal direction the giant chooses.
  - name: Thunderbolt (Costs 2 Actions)
    desc: The giant hurls a thunderbolt at a creature it can see within 600 feet of it. The target must make a DC 18 Dexterity saving throw, taking 22 (4d10) thunder damage on a failed save, or half as much damage on a successful one.
  - name: One with the Storm (Costs 3 Actions)
    desc: The giant vanishes, dispersing itself into the storm surrounding its lair. The giant can end this effect at the start of any of its turns, becoming a giant once more and appearing in any location it chooses within its lair. While dispersed, the giant can't take any actions other than lair actions, and it can't be targeted by attacks, spells, or other effects. The giant can't use this ability outside its lair, nor can it use this ability if another creature is using a *control weather* spell or similar magic to quell the storm.
```
