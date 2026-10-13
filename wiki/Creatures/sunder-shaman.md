---
title: Sunder Shaman
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sunder Shaman
size: Huge
type: giant
alignment: Chaotic Neutral
ac: 20
ac_class: stone armour
hp: 138
hit_dice: 12d12 + 60
modifier: 2
speed: 40 ft.
stats: [ 23, 15, 21, 10, 12, 9 ]
saves:
  - dex: 6
  - con: 9
  - wis: 5
skillsaves:
  - athletics: 10
  - perception: 5
senses: darkvision 60 ft., passive Perception 15
languages: Giant
cr: "10"
traits:
  - name: Reckless
    desc: At the start of its turn, the giant can gain advantage on all melee weapon attack rolls it makes during that turn, but attack rolls against it have advantage until the start of its next turn.
  - name: Siege Monster
    desc: The giant deals double damage to objects and structures.
  - name: Stone Camouflage
    desc: The giant has advantage on Dexterity (Stealth) checks made to hide in rocky terrain.
actions:
  - name: Multiattack
    desc: The giant makes two slam attacks. The first of those attacks that hits deals an extra 18 (4d8) damage if the giant has taken damage since its last turn.
  - name: Slam
    desc: "*Melee Weapon Attack:* +10 to hit, reach 15 ft., one target. *Hit:* 24 (4d8 + 6) bludgeoning damage."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +10 to hit, range 60/240 ft., one target. *Hit:* 28 (4d10 + 6) bludgeoning damage. If the target is a creature, it must succeed on a DC 18 Strength saving throw or be knocked prone."
```
