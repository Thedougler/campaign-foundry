---
title: Black Abishai
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Fiend
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Black Abishai
size: Medium
type: fiend
subtype: devil
alignment: Typically Lawful Evil
ac: 15
ac_class: natural armour
hp: 58
hit_dice: 9d8 + 18
modifier: 3
speed: 30 ft., fly 40 ft.
stats: [ 14, 17, 14, 13, 16, 11 ]
saves:
  - dex: 6
  - wis: 6
skillsaves:
  - perception: 6
  - stealth: 6
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: acid, fire, poison
condition_immunities: poisoned
gear:
  - scimitar
senses: darkvision 120 ft., passive Perception 16
languages: Draconic, Infernal, telepathy 120 ft.
cr: "7"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the abishai's darkvision.
  - name: Magic Resistance
    desc: The abishai has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The abishai makes one Bite attack and two Scimitar attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d10 + 3) piercing damage plus 9 (2d8) acid damage."
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) force damage."
  - name: Creeping Darkness (Recharge 6)
    desc: |
      The abishai casts *darkness* at a point within 120 feet of it, requiring no spell components or concentration. Wisdom is its spellcasting ability for this spell. While the spell persists, the abishai can move the area of darkness up to 60 feet as a bonus action.
bonus_actions:
  - name: Shadow Stealth
    desc: While in dim light or darkness, the abishai takes the Hide action.
```
