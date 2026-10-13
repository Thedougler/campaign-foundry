---
title: Githzerai Traveler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githzerai Traveller
size: Medium
type: aberration
subtype: gith
alignment: Any alignment
ac: 15
ac_class: psychic defense
hp: 44
hit_dice: 8d8 + 8
modifier: 2
speed: 30 ft.
stats: [ 12, 15, 12, 14, 16, 10 ]
saves:
  - str: 3
  - dex: 4
  - int: 4
  - wis: 5
skillsaves:
  - perception: 5
  - survival: 5
senses: passive Perception 15
languages: Common, Gith
cr: "3"
traits:
  - name: Psychic Defense
    desc: While the githzerai is wearing no armour and wielding no shield, its AC includes its Wisdom modifier.
actions:
  - name: Multiattack
    desc: The githzerai makes three Unarmed Strike attacks.
  - name: Unarmed Strike
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) bludgeoning damage plus 4 (1d8) psychic damage."
  - name: Spellcasting (Psionics)
    desc: |-
      The githzerai casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *mage hand* (the hand is invisible)

      **1/day each:** *jump*, *plane shift* (self only), *see invisibility*
bonus_actions:
  - name: Matter Manipulation (Recharge 4–6)
    desc: |-
      The githzerai manipulates the energy of the plane of existence it's on to produce one of the following effects (choose one or roll a d6):

      - **1–2 Astral Step.** The githzerai can teleport, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. In addition, its walking speed increases to 40 feet until the start of its next turn.  
      - **3–4 Growth.** Flowers and vines grow around the githzerai until the start of its next turn, then vanish; the ground within 15 feet of the githzerai is difficult terrain for other creatures while the flowers and vines are present.  
      - **5–6 Retaliating Light.** Multicoloured lights surround the githzerai until the start of its next turn. For the effect's duration, whenever a creature within 5 feet of the githzerai hits it with a melee attack roll, that creature takes 3 (1d6) force damage, as magic lashes out in retribution.
```
