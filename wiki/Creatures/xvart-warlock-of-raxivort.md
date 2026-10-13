---
title: Xvart Warlock of Raxivort
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Monstrosity
size: Small
habitat:
  - Hill
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Xvart Warlock of Raxivort
size: Small
type: monstrosity
alignment: Typically Chaotic Evil
ac: 12
hp: 22
hit_dice: 5d6 + 5
modifier: 2
speed: 30 ft.
stats: [ 8, 14, 12, 8, 11, 12 ]
skillsaves:
  - stealth: 3
gear:
  - scimitar
senses: darkvision 30 ft., passive Perception 10
languages: Abyssal
cr: "1"
traits:
  - name: Raxivort's Blessing
    desc: When the xvart reduces an enemy to 0 hit points, the xvart gains 4 temporary hit points.
  - name: Raxivort's Tongue
    desc: The xvart can communicate with ordinary bats and rats, as well as giant bats and giant rats.
actions:
  - name: Multiattack
    desc: The xvart makes two Scimitar or Raxivort's Bite attacks.
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage."
  - name: Raxivort's Bite
    desc: "*Ranged Spell Attack:* +3 to hit, range 30 ft., one creature. *Hit:* 7 (1d10 + 2) poison damage."
  - name: Spellcasting
    desc: |-
      The xvart casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 11):

      **At will:** *detect magic*, *mage armour* (self only), *mage hand*, *minor illusion*, *prestidigitation*

      **1/day each:** *burning hands*, *invisibility*
bonus_actions:
  - name: Low Cunning
    desc: The xvart takes the Disengage action.
```
