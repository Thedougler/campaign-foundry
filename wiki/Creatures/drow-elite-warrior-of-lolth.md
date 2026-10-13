---
title: Drow Elite Warrior of Lolth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Drow Elite Warrior of Lolth
size: Medium
type: humanoid
subtype: Drow elf
alignment: Chaotic Evil
ac: 18
hp: 71
hit_dice: 11d8 + 22
modifier: 4
speed: 30 ft.
stats: [ 13, 18, 14, 11, 13, 12 ]
saves:
  - dex: 7
  - con: 5
  - wis: 4
skillsaves:
  - perception: 4
  - stealth: 10
gear:
  - shield
  - shortsword
  - studded leather armour
senses: Darkvision 120 ft., passive Perception 14
languages: Common, Elvish, Undercommon
cr: "5"
traits:
  - name: Fey Ancestry
    desc: The drow has Advantage on saving throws it makes to avoid or end the Charmed condition, and magic can't put the drow to sleep.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drow has Disadvantage on attack rolls.
actions:
  - name: Multiattack
    desc: The drow makes two attacks using Shortsword or Drow Hand Crossbow in any combination
  - name: Shortsword
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 11 (2d6 + 4) Piercing damage plus 10 (3d6) Poison damage."
  - name: Drow Hand Crossbow
    desc: "*Ranged Attack Roll:* +7, range 30/120 ft. *Hit:* 7 (1d6 + 4) Piercing damage, and the target makes a saving throw. *Constitution Saving Throw:* DC 15. *Failure:* The target has the Poisoned condition for 1 hour. While Poisoned in this way, the target also has the Unconscious condition. The target wakes up if it takes damage or if a creature within 5 feet of it takes an action to wake it."
bonus_actions:
  - name: Underdark Magic (3/Day)
    desc: |
      The drow casts *Darkness*, *Faerie Fire*, or *Levitate* (self only), requiring no Material components and using Charisma as the spellcasting ability (spell save DC 12).
```
