---
title: Drow of Lolth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
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
name: Drow of Lolth
size: Medium
type: humanoid
subtype: Drow elf
alignment: Chaotic Evil
ac: 15
hp: 13
hit_dice: 3d8
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 10, 11, 11, 12 ]
skillsaves:
  - perception: 2
  - stealth: 4
gear:
  - chain shirt
  - rapier
senses: Darkvision 120 ft., passive Perception 12
languages: Common, Elvish, Undercommon
cr: 1/4
traits:
  - name: Fey Ancestry
    desc: The drow has Advantage on saving throws it makes to avoid or end the Charmed condition, and magic can't put the drow to sleep.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drow has Disadvantage on attack rolls.
actions:
  - name: Rapier
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 6 (1d8 + 2) Piercing damage."
  - name: Drow Hand Crossbow
    desc: "*Ranged Attack Roll:* +4, range 30/120 ft. *Hit:* 4 (1d4 + 2) Piercing damage, and the target makes a saving throw. *Constitution Saving Throw:* DC 12. *Failure:* The target has the Poisoned condition for 1 hour. If the target fails the save by 5 or more, it also has the Unconscious condition while Poisoned in this way. The target wakes up if it takes damage or if a creature within 5 feet of it takes an action to wake it."
  - name: Spellcasting
    desc: |-
      The drow casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 11):

      **At will:** *Dancing Lights*

      **1/day:** *Faerie Fire*
```
