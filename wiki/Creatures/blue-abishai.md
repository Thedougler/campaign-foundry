---
title: Blue Abishai
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Fiend
size: Medium
habitat:
  - Coastal
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Blue Abishai
size: Medium
type: fiend
subtype: devil, wizard
alignment: Typically Lawful Evil
ac: 19
ac_class: natural armour
hp: 202
hit_dice: 27d8 + 81
modifier: 2
speed: 30 ft., fly 50 ft.
stats: [ 15, 14, 17, 22, 23, 18 ]
saves:
  - int: 12
  - wis: 12
skillsaves:
  - arcana: 12
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, lightning, poison
condition_immunities: poisoned
senses: darkvision 120 ft., passive Perception 16
languages: Draconic, Infernal, telepathy 120 ft.
cr: "17"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the abishai's darkvision.
  - name: Magic Resistance
    desc: The abishai has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The abishai makes three Bite or Lightning Strike attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 13 (2d10 + 2) piercing damage plus 14 (4d6) lightning damage."
  - name: Lightning Strike
    desc: "*Ranged Spell Attack:* +12 to hit, range 120 ft., one target. *Hit:* 36 (8d8) lightning damage."
  - name: Spellcasting
    desc: |-
      The abishai casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20):

      **At will:** *disguise self*, *mage hand*, *minor illusion*

      **2/day each:** *charm person*, *dispel magic*, *greater invisibility*, *wall of force*
bonus_actions:
  - name: Teleport
    desc: The abishai teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space that it can see.
```
