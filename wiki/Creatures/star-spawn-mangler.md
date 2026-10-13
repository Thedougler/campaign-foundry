---
title: Star Spawn Mangler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Star Spawn Mangler
size: Medium
type: aberration
alignment: Typically Chaotic Evil
ac: 14
hp: 71
hit_dice: 13d8 + 13
modifier: 4
speed: 40 ft., climb 40 ft.
stats: [ 8, 18, 12, 11, 12, 7 ]
saves:
  - dex: 7
  - con: 4
skillsaves:
  - stealth: 7
damage_resistances: cold
damage_immunities: psychic
condition_immunities: charmed, frightened, prone
senses: darkvision 60 ft., passive Perception 11
languages: Deep Speech
cr: "5"
traits:
  - name: Ambusher
    desc: The mangler has advantage on initiative rolls.
actions:
  - name: Multiattack
    desc: The mangler makes two Claw attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) slashing damage. If the attack roll has advantage, the target also takes 7 (2d6) psychic damage."
  - name: Flurry of Claws (Recharge 5–6)
    desc: The mangler makes six Claw attacks. Either before or after these attacks, it can move up to its speed without provoking opportunity attacks.
bonus_actions:
  - name: Shadow Stealth
    desc: While in dim light or darkness, the mangler takes the Hide action.
```
