---
title: Archdruid
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Humanoid
size: Medium
habitat:
  - Forest
  - Mountain
  - Swamp
  - Underwater
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Archdruid
size: Medium
type: humanoid
subtype: druid
alignment: Any alignment
ac: 14
ac_class: hide armour
hp: 154
hit_dice: 28d8 + 28
modifier: 2
speed: 30 ft.
stats: [ 14, 14, 12, 12, 20, 11 ]
saves:
  - int: 5
  - wis: 9
skillsaves:
  - medicine: 9
  - nature: 5
  - perception: 9
senses: passive Perception 19
languages: Druidic plus any two languages
cr: "12"
actions:
  - name: Multiattack
    desc: The archdruid makes three Staff or Wildfire attacks. It can replace one attack with a use of Spellcasting.
  - name: Staff
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) bludgeoning damage plus 21 (6d6) poison damage."
  - name: Wildfire
    desc: "*Ranged Spell Attack:* +9 to hit, range 120 ft., one target. *Hit:* 26 (6d6 + 5) fire damage, and the target is blinded until the start of the druid's next turn."
  - name: Spellcasting
    desc: |-
      The archdruid casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 17):

      **At will:** beast sense, *entangle*, *speak with animals*

      **3/day each:** *animal messenger*, *dominate beast*, *faerie fire*, *tree stride*

      **1/day each:** *commune with nature* (as an action), *mass cure wounds*
bonus_actions:
  - name: Change Shape (2/Day)
    desc: |-
      The archdruid magically transforms into a Beast or an Elemental with a challenge rating of 6 or less and can remain in that form for up to 9 hours. The archdruid can choose whether its equipment falls to the ground, melds with its new form, or is worn by the new form. The archdruid reverts to its true form if it dies or falls unconscious. The archdruid can revert to its true form using a bonus action.

      While in a new form, the archdruid's stat block is replaced by the stat block of that form, except the archdruid keeps its current hit points, its hit point maximum, this bonus action, its languages and ability to speak, and its Spellcasting action.

      The new form's attacks count as magical for the purpose of overcoming resistances and immunity to nonmagical attacks.
```
