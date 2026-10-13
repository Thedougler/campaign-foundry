---
title: Dhergoloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Fiend
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
name: Dhergoloth
size: Medium
type: fiend
subtype: yugoloth
alignment: Typically Neutral Evil
ac: 15
ac_class: natural armour
hp: 119
hit_dice: 14d8 + 56
modifier: 0
speed: 30 ft.
stats: [ 17, 10, 19, 7, 10, 9 ]
saves:
  - str: 6
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: poisoned
senses: blindsight 60 ft., darkvision 60 ft., passive Perception 10
languages: Abyssal, Infernal, telepathy 60 ft.
cr: "7"
traits:
  - name: Magic Resistance
    desc: The dhergoloth has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The dhergoloth makes two Claw attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 12 (2d8 + 3) force damage."
  - name: Flailing Claws (Recharge 5–6)
    desc: The dhergoloth moves up to its speed in a straight line and targets each creature within 5 feet of it during its movement. Each target must succeed on a DC 14 Dexterity saving throw or take 22 (3d12 + 3) force damage.
  - name: Teleport
    desc: The dhergoloth teleports, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see.
  - name: Spellcasting
    desc: |-
      The dhergoloth casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 10):

      **At will:** *darkness*, *fear*
```
