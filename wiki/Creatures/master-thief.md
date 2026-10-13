---
title: Master Thief
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Master Thief
size: Medium
type: humanoid
alignment: Any alignment
ac: 16
ac_class: studded leather
hp: 84
hit_dice: 13d8 + 26
modifier: 4
speed: 30 ft.
stats: [ 11, 18, 14, 11, 11, 12 ]
saves:
  - dex: 7
  - int: 3
skillsaves:
  - acrobatics: 7
  - athletics: 3
  - perception: 3
  - sleight of hand: 7
  - stealth: 7
gear:
  - shortbow
  - shortsword
senses: passive Perception 13
languages: any one language (usually Common) plus thieves' cant
cr: "5"
traits:
  - name: Evasion
    desc: If the thief is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the thief instead takes no damage if it succeeds on the saving throw and only half damage if it fails, provided the thief isn't incapacitated.
actions:
  - name: Multiattack
    desc: The thief makes three Shortsword or Shortbow attacks.
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage plus 3 (1d6) poison damage."
  - name: Shortbow
    desc: "*Ranged Weapon Attack:* +7 to hit, range 80/320 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage plus 3 (1d6) poison damage."
bonus_actions:
  - name: Cunning Action
    desc: The thief takes the Dash, Disengage, or Hide action.
reactions:
  - name: Uncanny Dodge
    desc: The thief halves the damage that it takes from an attack that hits it. The thief must be able to see the attacker.
```
