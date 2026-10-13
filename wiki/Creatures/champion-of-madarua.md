---
title: Champion of Madarua
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Champion of Madarua
size: Medium
type: humanoid
alignment: typically Chaotic Good
ac: 13
ac_class: hide armour
hp: 39
hit_dice: 6d8 + 12
modifier: 1
speed: 30 ft.
stats: [ 17, 12, 15, 12, 12, 14 ]
saves:
  - str: 5
  - dex: 3
skillsaves:
  - acrobatics: 3
  - religion: 3
gear:
  - longsword
senses: passive Perception 11
languages: Common
cr: "2"
actions:
  - name: Multiattack
    desc: The champion makes three Longsword attacks.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) piercing damage, or 8 (1d10 + 3) piercing damage if used with two hands."
bonus_actions:
  - name: Aura of Fury (1/Day)
    desc: The champion summons an aura of ghostly animals that fills a 10-foot-radius sphere centred on itself. While this aura is active, the champion and all its allies in the aura have advantage on attack rolls. The aura moves with the champion and lasts for 1 minute, until the champion has the incapacitated condition, or until the champion uses another bonus action to end the aura.
reactions:
  - name: Parry
    desc: The champion adds 2 to its AC against one melee attack that would hit it. To do so, the champion must see the attacker and be wielding a melee weapon.
```
