---
title: Korred
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Fey
size: Small
habitat:
  - Forest
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Korred
size: Small
type: fey
alignment: Typically Chaotic Neutral
ac: 17
ac_class: natural armour
hp: 93
hit_dice: 11d6 + 55
modifier: 2
speed: 30 ft., burrow 30 ft.
stats: [ 23, 14, 20, 10, 15, 9 ]
skillsaves:
  - athletics: 9
  - perception: 5
  - stealth: 5
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
gear:
  - greatclub
senses: darkvision 120 ft., tremorsense 120 ft., passive Perception 15
languages: Dwarvish, Gnomish, Sylvan, Terran, Undercommon
cr: "7"
traits:
  - name: Stone Camouflage
    desc: The korred has advantage on Dexterity (Stealth) checks made to hide in rocky terrain.
actions:
  - name: Multiattack
    desc: The korred makes two Greatclub or Rock attacks.
  - name: Greatclub
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 10 (1d8 + 6) bludgeoning damage, or 19 (3d8 + 6) bludgeoning damage if the korred is on the ground."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +9 to hit, range 60/120 ft., one target. *Hit:* 10 (1d8 + 6) bludgeoning damage, or 19 (3d8 + 6) bludgeoning damage if the korred is on the ground."
  - name: Spellcasting
    desc: |-
      The korred casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *commune with nature* (as an action), *meld into stone*, *stone shape*

      **1/day:** *Otto's irresistible dance*
bonus_actions:
  - name: Command Hair
    desc: |-
      The korred has at least one 50-foot-long rope woven out of its hair. The korred commands one such rope within 30 feet of it to move up to 20 feet and entangle a Large or smaller creature that the korred can see. The target must succeed on a DC 13 Dexterity saving throw or become grappled by the rope (escape DC 13). Until this grapple ends, the target is restrained. The korred can use a bonus action to release the target, which is also freed if the korred dies or becomes incapacitated.

      A rope of korred hair has AC 20 and 20 hit points. It regains 1 hit point at the start of each of the korred's turns while the rope has at least 1 hit point and the korred is alive. If the rope drops to 0 hit points, it is destroyed.
```
