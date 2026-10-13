---
title: Githzerai Anarch
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githzerai Anarch
size: Medium
type: humanoid
subtype: gith
alignment: Any alignment
ac: 20
ac_class: psychic defense
hp: 144
hit_dice: 17d8 + 68
modifier: 5
speed: 30 ft., fly 40 ft. (hover)
stats: [ 16, 21, 18, 18, 20, 14 ]
saves:
  - str: 8
  - dex: 10
  - int: 9
  - wis: 10
skillsaves:
  - arcana: 9
  - insight: 10
  - perception: 10
senses: passive Perception 20
languages: Gith
cr: "16"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the githzerai fails a saving throw, it can choose to succeed instead.
  - name: Psychic Defense
    desc: While the githzerai is wearing no armour and wielding no shield, its AC includes its Wisdom modifier.
actions:
  - name: Multiattack
    desc: The githzerai makes three Unarmed Strike attacks.
  - name: Unarmed Strike
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 9 (1d8 + 5) bludgeoning damage plus 18 (4d8) psychic damage."
  - name: Spellcasting (Psionics)
    desc: |-
      The githzerai casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 18):

      **At will:** *mage hand* (the hand is invisible)

      **3/day each:** *see invisibility*, *telekinesis*

      **1/day each:** *globe of invulnerability*, *plane shift*, *wall of force*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the githzerai anarch can expend a use to take one of the following actions. The githzerai anarch regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Strike
    desc: The githzerai makes one Unarmed Strike attack.
  - name: Teleport
    desc: The githzerai teleports, along with any equipment it is wearing or carrying, to an unoccupied space it can see within 30 feet of it.
  - name: Change Gravity (Costs 3 Actions)
    desc: The githzerai casts the *reverse gravity* spell, using Wisdom as the spellcasting ability. The spell has the normal effect, except that the githzerai can orient the area in any direction and creatures and objects fall toward the end of the area.
```
