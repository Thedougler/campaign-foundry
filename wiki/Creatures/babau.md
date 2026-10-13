---
title: Babau
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Fiend
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Babau
size: Medium
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 82
hit_dice: 11d8 + 33
modifier: 3
speed: 40 ft.
stats: [ 19, 16, 16, 11, 12, 13 ]
skillsaves:
  - perception: 5
  - stealth: 5
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 120 ft., passive Perception 15
languages: Abyssal
cr: "4"
actions:
  - name: Multiattack
    desc: The babau makes two Claw attacks. It can replace one attack with a use of Spellcasting or Weakening Gaze.
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 6 (1d4 + 4) slashing damage plus 2 (1d4) acid damage."
  - name: Weakening Gaze
    desc: The babau targets one creature that it can see within 20 feet of it. The target must make a DC 13 Constitution saving throw. On a failed save, the target deals only half damage with weapon attacks that use Strength for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Spellcasting
    desc: |-
      The babau casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 11):

      **At will:** *darkness*, *dispel magic*, *fear*, *heat metal*, *levitate*
```
