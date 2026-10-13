---
title: Thri-kreen Gladiator
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Thri-kreen Gladiator
size: Medium
type: monstrosity
alignment: Any alignment
ac: 17
ac_class: natural armour
hp: 142
hit_dice: 19d8 + 57
modifier: 4
speed: 30 ft.
stats: [ 18, 18, 16, 10, 15, 11 ]
saves:
  - str: 7
  - dex: 7
  - wis: 5
skillsaves:
  - acrobatics: 7
  - athletics: 7
  - perception: 5
condition_immunities: frightened
senses: darkvision 60 ft., passive Perception 15
languages: telepathy 60 ft., Thri-kreen
cr: "7"
actions:
  - name: Multiattack
    desc: The thri-kreen makes two Gythka attacks and one Chatkcha attack.
  - name: Gythka
    desc: "*Melee Weapon Attack:* +7 to hit (with advantage if the thri-kreen is missing any hit points), reach 5 ft., one target. *Hit:* 13 (2d8 + 4) slashing damage."
  - name: Chatkcha
    desc: "*Ranged Weapon Attack:* +7 to hit (with advantage if the thri-kreen is missing any hit points), range 30/120 ft., one target. *Hit:* 7 (1d6 + 4) slashing damage."
bonus_actions:
  - name: Leap
    desc: The thri-kreen leaps up to 20 feet in any direction, provided its speed isn't 0.
reactions:
  - name: Parry
    desc: The thri-kreen adds 3 to its AC against one melee attack that would hit it. To do so, the thri-kreen must see the attacker and be wielding a melee weapon.
```
