---
title: Drow Shadowblade
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
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
name: Drow Shadowblade
size: Medium
type: humanoid
subtype: Drow elf
alignment: Any alignment
ac: 17
ac_class: studded leather
hp: 150
hit_dice: 20d8 + 60
modifier: 5
speed: 30 ft.
stats: [ 14, 21, 16, 12, 14, 13 ]
saves:
  - dex: 9
  - con: 7
  - wis: 6
skillsaves:
  - perception: 6
  - stealth: 9
gear:
  - hand crossbow
senses: darkvision 120 ft., passive Perception 16
languages: Elvish, Undercommon
cr: "11"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the drow's darkvision.
  - name: Fey Ancestry
    desc: The drow has advantage on saving throws against being charmed, and magic can't put the drow to sleep.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The drow makes three Shadow Sword attacks. One of the attacks can be replaced by a Hand Crossbow attack. The drow can also use Spellcasting to cast darkness.
  - name: Shadow Sword
    desc: "*Melee or Ranged Weapon Attack:* +9 to hit, reach 5 ft. or range 30/60 ft., one target. *Hit:* 27 (7d6 + 5) necrotic damage."
  - name: Hand Crossbow
    desc: "*Ranged Weapon Attack:* +9 to hit, range 30/120 ft., one target. *Hit:* 8 (1d6 + 5) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 1 hour. If the saving throw fails by 5 or more, the target is also unconscious while poisoned in this way. The target regains consciousness if it takes damage or if another creature takes an action to shake it."
  - name: Spellcasting
    desc: |-
      The drow casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *dancing lights*, *darkness*

      **1/day each:** *faerie fire*, *levitate* (self only)
bonus_actions:
  - name: Shadow Step
    desc: While in dim light or darkness, the drow teleports, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see that is also in dim light or darkness. It then has advantage on the first melee attack it makes before the end of the turn.
```
