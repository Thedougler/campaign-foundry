---
title: Frost Giant of Evil Water
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Frost Giant of Evil Water
size: Huge
type: giant
alignment: typically Neutral Evil
ac: 16
ac_class: scale mail
hp: 172
hit_dice: 15d12 + 75
modifier: 3
speed: 40 ft., swim 40 ft.
stats: [ 23, 16, 21, 9, 14, 12 ]
saves:
  - dex: 7
  - con: 9
  - wis: 6
skillsaves:
  - athletics: 10
  - perception: 6
damage_immunities: cold
gear:
  - battleaxe
senses: passive Perception 16
languages: Aquan, Common, Giant
cr: "11"
traits:
  - name: Amphibious
    desc: The giant can breathe air and water.
actions:
  - name: Multiattack
    desc: The giant makes two Battleaxe attacks and one Harpoon attack.
  - name: Battleaxe
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 19 (3d8 + 6) slashing damage, or 22 (3d10 + 6) slashing damage if used with two hands, plus 7 (2d6) cold damage."
  - name: Harpoon
    desc: "*Ranged Weapon Attack:* +7 to hit, range 50/200 ft., one creature. *Hit:* 14 (2d10 + 3) piercing damage, and the target has the grappled condition (escape DC 16). While the target is grappled this way, its speed isn't reduced, but it can't move farther from the giant. The target takes 5 (1d10) slashing damage if it escapes from the grapple or if it tries and fails. The giant can grapple only one target at a time with its harpoon."
bonus_actions:
  - name: Reel In
    desc: The giant pulls the target grappled by its Harpoon up to 20 feet toward itself.
```
