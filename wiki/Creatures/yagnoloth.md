---
title: Yagnoloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Fiend
size: Large
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yagnoloth
size: Large
type: fiend
subtype: yugoloth
alignment: Typically Neutral Evil
ac: 17
ac_class: natural armour
hp: 147
hit_dice: 14d10 + 70
modifier: 2
speed: 40 ft.
stats: [ 19, 14, 21, 16, 15, 18 ]
saves:
  - dex: 6
  - int: 7
  - wis: 6
  - cha: 8
skillsaves:
  - deception: 8
  - insight: 6
  - perception: 6
  - persuasion: 8
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: poisoned
senses: blindsight 60 ft., darkvision 60 ft., passive Perception 16
languages: Abyssal, Infernal, telepathy 60 ft.
cr: "11"
traits:
  - name: Magic Resistance
    desc: The yagnoloth has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The yagnoloth makes one Electrified Touch attack and one Massive Arm attack, or it makes one Massive Arm attack and uses Battlefield Cunning, if available, or Teleport.
  - name: Electrified Touch
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 27 (6d8) lightning damage."
  - name: Massive Arm
    desc: "*Melee Weapon Attack:* +8 to hit, reach 15 ft., one target. *Hit:* 23 (3d12 + 4) force damage. If the target is a creature, it must succeed on a DC 16 Constitution saving throw or become stunned until the end of the yagnoloth's next turn."
  - name: Battlefield Cunning (Recharge 4–6)
    desc: Up to two allied yugoloths within 60 feet of the yagnoloth that can hear it can use their reactions to make one melee attack each.
  - name: Life Leech
    desc: The yagnoloth touches one incapacitated creature within 15 feet of it. The target takes 36 (7d8 + 4) necrotic damage, and the yagnoloth gains temporary hit points equal to half the damage dealt. The target must succeed on a DC 16 Constitution saving throw, or its hit point maximum is reduced by an amount equal to half the necrotic damage taken. This reduction lasts until the target finishes a long rest, and the target dies if its hit point maximum is reduced to 0.
  - name: Teleport
    desc: The yagnoloth teleports, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see.
  - name: Spellcasting
    desc: |-
      The yagnoloth casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *darkness*, *detect magic*, *dispel magic*, *invisibility* (self only), *suggestion*

      **3/day:** *lightning bolt*
```
