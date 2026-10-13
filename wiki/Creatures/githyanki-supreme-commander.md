---
title: Githyanki Supreme Commander
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Humanoid
size: Medium
habitat:
  - Desert
  - Mountain
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githyanki Supreme Commander
size: Medium
type: humanoid
subtype: gith
alignment: Any alignment
ac: 18
ac_class: plate
hp: 187
hit_dice: 22d8 + 88
modifier: 3
speed: 30 ft.
stats: [ 19, 17, 18, 16, 16, 18 ]
saves:
  - con: 9
  - int: 8
  - wis: 8
skillsaves:
  - intimidation: 9
  - perception: 8
senses: passive Perception 18
languages: Gith
cr: "14"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the githyanki fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The githyanki makes two Silver Greatsword attacks.
  - name: Silver Greatsword
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 14 (2d6 + 7) slashing damage plus 17 (5d6) psychic damage. On a critical hit against a target in an astral body (as with the *astral projection* spell), the githyanki can cut the silvery cord that tethers the target to its material body, instead of dealing damage."
  - name: Spellcasting (Psionics)
    desc: |-
      The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *mage hand* (the hand is invisible)

      **3/day each:** *levitate* (self only), *nondetection* (self only)

      **1/day each:** *Bigby's hand*, *mass suggestion*, *plane shift*, *telekinesis*
bonus_actions:
  - name: Astral Step
    desc: The githyanki teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see.
reactions:
  - name: Parry
    desc: The githyanki adds 5 to its AC against one melee attack that would hit it. To do so, the githyanki must see the attacker and be wielding a melee weapon.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the githyanki supreme commander can expend a use to take one of the following actions. The githyanki supreme commander regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Command Ally
    desc: The githyanki targets one ally it can see within 30 feet of it. If the target can see or hear the githyanki, the target can make one melee weapon attack using its reaction, if available, and has advantage on the attack roll.
  - name: Attack (2 Actions)
    desc: The githyanki makes one Silver Greatsword attack.
```
