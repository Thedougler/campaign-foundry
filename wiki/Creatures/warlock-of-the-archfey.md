---
title: Warlock of the Archfey
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Medium
habitat:
  - Arctic
  - Forest
  - Mountain
  - Swamp
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Warlock of the Archfey
size: Medium
type: humanoid
alignment: Any alignment
ac: 13
ac_class: 16 with *mage armour*
hp: 67
hit_dice: 15d8
modifier: 3
speed: 30 ft.
stats: [ 9, 16, 11, 11, 12, 18 ]
saves:
  - wis: 3
  - cha: 6
skillsaves:
  - arcana: 2
  - deception: 6
  - nature: 2
  - persuasion: 6
condition_immunities: charmed
gear:
  - rapier
senses: passive Perception 11
languages: any two languages (usually Sylvan)
cr: "4"
actions:
  - name: Multiattack
    desc: The warlock makes two Rapier attacks, or it uses Bewildering Word twice.
  - name: Rapier
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) piercing damage plus 7 (2d6) force damage."
  - name: Bewildering Word
    desc: The warlock utters a magical bewilderment, targeting one creature it can see within 60 feet of it. The target must succeed on a DC 14 Wisdom saving throw or take 9 (2d8) psychic damage and have disadvantage on attack rolls until the end of the warlock's next turn.
  - name: Spellcasting
    desc: |-
      The warlock casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 14): 

      **At will:** *dancing lights*, *disguise self*, *mage armour* (self only), *mage hand*, *minor illusion*, *prestidigitation*, *speak with animals*

      **1/day each:** *charm person*, *dimension door*, *hold monster*
reactions:
  - name: Misty Escape (Recharges after a Short or Long Rest)
    desc: In response to taking damage, the warlock turns invisible and teleports, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see. It remains invisible until the start of its next turn or until it attacks, makes a damage roll, or casts a spell.
```
