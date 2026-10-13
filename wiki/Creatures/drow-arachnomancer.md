---
title: Drow Arachnomancer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
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
name: Drow Arachnomancer
size: Medium
type: humanoid
subtype: Drow elf
alignment: Typically Chaotic Evil
ac: 15
ac_class: studded leather
hp: 162
hit_dice: 25d8 + 50
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 11, 17, 14, 19, 14, 16 ]
saves:
  - con: 7
  - int: 9
  - cha: 8
skillsaves:
  - arcana: 9
  - nature: 9
  - perception: 7
  - stealth: 8
damage_resistances: poison
senses: blindsight 10 ft., darkvision 120 ft., passive Perception 17
languages: Elvish, Undercommon, can speak with spiders
cr: "13"
traits:
  - name: Fey Ancestry
    desc: The drow has advantage on saving throws against being charmed, and magic can't put the drow to sleep.
  - name: Spider Climb
    desc: The drow can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
  - name: Web Walker
    desc: The drow ignores movement restrictions caused by webbing.
actions:
  - name: Multiattack
    desc: The drow makes three attacks, using Bite, Poisonous Touch, Web, or a combination of them. One attack can be replaced by a use of Spellcasting.
  - name: Bite (Spider Form Only)
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 12 (2d8 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 31 (7d8) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralysed while poisoned in this way."
  - name: Poisonous Touch (Humanoid Form Only)
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 35 (10d6) poison damage."
  - name: Web (Spider Form Only; (Recharge 5–6))
    desc: "*Ranged Weapon Attack:* +8 to hit, range 30/60 ft., one target. *Hit:* The target is restrained by webbing. As an action, the restrained target can make a DC 15 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; hp 5; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage)."
  - name: Spellcasting
    desc: |-
      The drow casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 17):

      **At will:** *dancing lights*, *mage hand*

      **1/day each:** *darkness*, *dispel magic*, *etherealness*, *faerie fire*, *fly*, *insect plague*, *invisibility*
bonus_actions:
  - name: Change Shape (Recharges after a Short or Long Rest)
    desc: The drow magically transforms into a Large spider, remaining in that form for up to 1 hour, or back into its true form. Its statistics, other than its size, are the same in each form. It can speak and cast spells while in spider form. Any equipment it is wearing or carrying in Humanoid form melds into the spider form. It can't activate, use, wield, or otherwise benefit from any of its equipment. It reverts to its Humanoid form if it dies.
```
