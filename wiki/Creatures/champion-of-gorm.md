---
title: Champion of Gorm
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
name: Champion of Gorm
size: Medium
type: humanoid
alignment: typically Lawful Good
ac: 19
ac_class: splint armour, shield
hp: 33
hit_dice: 6d8 + 6
modifier: 0
speed: 30 ft.
stats: [ 17, 10, 12, 12, 15, 16 ]
saves:
  - str: 5
  - wis: 4
skillsaves:
  - athletics: 5
  - insight: 4
  - religion: 3
gear:
  - handaxe
senses: passive Perception 12
languages: Common
cr: "2"
traits:
  - name: Brave
    desc: The champion has advantage on saving throws against the frightened condition.
actions:
  - name: Multiattack
    desc: The champion makes two Lightning Mace attacks or three Handaxe attacks.
  - name: Lightning Mace
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage plus 5 (2d4) lightning damage."
  - name: Handaxe
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage."
bonus_actions:
  - name: Aura of Resilience (1/Day)
    desc: The champion exudes an aura of ghostly lightning that fills a 10-foot-radius sphere centred on itself. While this aura is active, the champion and each creature of its choice within the aura have advantage on saving throws. The aura moves with the champion and lasts for 1 minute, until the champion has the incapacitated condition, or until the champion uses another bonus action to end the aura.
```
