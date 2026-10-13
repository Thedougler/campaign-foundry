---
title: Bandit Crime Lord
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bandit Crime Lord
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 17
hp: 169
hit_dice: 26d8 + 52
modifier: 9
speed: 30 ft.
stats: [ 10, 20, 14, 18, 14, 15 ]
saves:
  - dex: 9
  - con: 6
skillsaves:
  - acrobatics: 9
  - perception: 10
  - stealth: 13
gear:
  - two pistols
  - scimitar
  - studded leather armour
senses: passive Perception 20
languages: Common, Thieves' cant
cr: "11"
traits:
  - name: Evasion
    desc: If the bandit is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the bandit instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The bandit makes three attacks, using Scimitar or Pistol in any combination.
  - name: Scimitar
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 12 (2d6 + 5) Slashing damage plus 14 (4d6) Poison damage."
  - name: Pistol
    desc: "*Ranged Attack Roll:* +9, range 30/90 ft. *Hit:* 10 (1d10 + 5) Piercing damage plus 14 (4d6) Poison damage."
bonus_actions:
  - name: Deadly Aim
    desc: The bandit gives itself Advantage on the next attack roll it makes during the current turn. If that attack hits, the target takes an extra 28 (8d6) Poison damage.
```
