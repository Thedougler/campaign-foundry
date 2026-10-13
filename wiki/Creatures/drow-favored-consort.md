---
title: Drow Favored Consort
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
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
name: Drow Favoured Consort
size: Medium
type: humanoid
subtype: Drow elf, wizard
alignment: Any alignment
ac: 15
hp: 240
hit_dice: 32d8 + 96
modifier: 5
speed: 30 ft.
stats: [ 15, 20, 16, 18, 15, 18 ]
saves:
  - dex: 11
  - con: 9
  - cha: 10
skillsaves:
  - acrobatics: 11
  - athletics: 8
  - perception: 8
  - stealth: 11
gear:
  - scimitar
senses: darkvision 120 ft., passive Perception 18
languages: Elvish, Undercommon
cr: "18"
traits:
  - name: Fey Ancestry
    desc: The drow has advantage on saving throws against being charmed, and magic can't put the drow to sleep.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The drow makes three Scimitar or Arcane Eruption attacks. The drow can replace one of the attacks with a use of Spellcasting.
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 8 (1d6 + 5) slashing damage plus 27 (6d8) poison damage."
  - name: Arcane Eruption
    desc: "*Ranged Spell Attack:* +10 to hit, range 120 ft., one target. *Hit:* 36 (8d8) force damage, and the drow can push the target up to 10 feet away if it is a Large or smaller creature."
  - name: Spellcasting
    desc: |-
      The drow casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *dancing lights*, *mage armour*, *mage hand*, *message*

      **3/day each:** *dimension door*, *fireball*, *invisibility*

      **1/day each:** *darkness*, *faerie fire*, *levitate* (self only)
reactions:
  - name: Protective Shield (3/Day)
    desc: When the drow or a creature within 10 feet of it is hit by an attack roll, the drow gives the target a +5 bonus to its AC until the start of the drow's next turn, which can cause the triggering attack roll to miss.
```
