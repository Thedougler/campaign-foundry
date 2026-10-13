---
title: Green Abishai
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
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
name: Green Abishai
size: Medium
type: fiend
subtype: devil
alignment: Typically Lawful Evil
ac: 18
ac_class: natural armour
hp: 195
hit_dice: 26d8 + 78
modifier: 3
speed: 30 ft., fly 40 ft.
stats: [ 12, 17, 16, 17, 12, 19 ]
saves:
  - int: 8
  - cha: 9
skillsaves:
  - deception: 9
  - insight: 6
  - perception: 6
  - persuasion: 9
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: poisoned
senses: darkvision 120 ft., passive Perception 16
languages: Draconic, Infernal, telepathy 120 ft.
cr: "15"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the abishai's darkvision.
  - name: Magic Resistance
    desc: The abishai has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The abishai makes two Fiendish Claw attacks, or it makes one Fiendish Claw attack and uses Spellcasting.
  - name: Fiendish Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 12 (2d8 + 3) force damage. If the target is a creature, it must succeed on a DC 16 Constitution saving throw or take 16 (3d10) poison damage and become poisoned for 1 minute. The poisoned target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Spellcasting
    desc: |-
      The abishai casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *alter self*, *major image*

      **3/day each:** *charm person*, *detect thoughts*, *fear*

      **1/day each:** *confusion*, *dominate person*, *mass suggestion*
```
