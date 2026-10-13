---
title: Drow House Captain
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Drow House Captain
size: Medium
type: humanoid
subtype: Drow elf
alignment: Any alignment
ac: 16
ac_class: chain mail
hp: 162
hit_dice: 25d8 + 50
modifier: 4
speed: 30 ft.
stats: [ 14, 19, 15, 12, 14, 13 ]
saves:
  - dex: 8
  - con: 6
  - wis: 6
skillsaves:
  - perception: 6
  - stealth: 8
gear:
  - hand crossbow
  - scimitar
  - whip
senses: darkvision 120 ft., passive Perception 16
languages: Elvish, Undercommon
cr: "9"
traits:
  - name: Fey Ancestry
    desc: The drow has advantage on saving throws against being charmed, and magic can't put the drow to sleep.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The drow makes two Scimitar attacks and one Whip or Hand Crossbow attack.
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) slashing damage plus 14 (4d6) poison damage."
  - name: Whip
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 6 (1d4 + 4) slashing damage."
  - name: Hand Crossbow
    desc: "*Ranged Weapon Attack:* +8 to hit, range 30/120 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 1 hour. If the saving throw fails by 5 or more, the target is also unconscious while poisoned in this way. The target regains consciousness if it takes damage or if another creature takes an action to shake it."
  - name: Spellcasting
    desc: |-
      The drow casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *dancing lights*

      **1/day each:** *darkness*, *faerie fire*, *levitate* (self only)
bonus_actions:
  - name: Battle Command
    desc: Choose one creature within 30 feet of the drow that the drow can see. If the chosen creature can see or hear the drow, that creature can use its reaction to make one melee attack or to take the Dodge or Hide action.
reactions:
  - name: Parry
    desc: The drow adds 3 to its AC against one melee attack roll that would hit it. To do so, the drow must see the attacker and be wielding a melee weapon.
```
