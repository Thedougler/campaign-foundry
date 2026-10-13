---
title: Assassin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
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
name: Assassin
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 16
hp: 97
hit_dice: 15d8 + 30
modifier: 10
speed: 30 ft.
stats: [ 11, 18, 14, 16, 11, 10 ]
saves:
  - dex: 7
  - int: 6
skillsaves:
  - acrobatics: 7
  - perception: 6
  - stealth: 10
damage_resistances: poison
gear:
  - light crossbow
  - shortsword
  - studded leather armour
senses: passive Perception 16
languages: Common, Thieves' cant
cr: "8"
traits:
  - name: Evasion
    desc: If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The assassin makes three attacks, using Shortsword or Light Crossbow in any combination.
  - name: Shortsword
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 7 (1d6 + 4) Piercing damage plus 17 (5d6) Poison damage, and the target has the Poisoned condition until the start of the assassin's next turn."
  - name: Light Crossbow
    desc: "*Ranged Attack Roll:* +7, range 80/320 ft. *Hit:* 8 (1d8 + 4) Piercing damage plus 21 (6d6) Poison damage."
bonus_actions:
  - name: Cunning Action
    desc: The assassin takes the Dash, Disengage, or Hide action.
```
