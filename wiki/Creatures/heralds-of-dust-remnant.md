---
title: Heralds of Dust Remnant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Heralds of Dust Remnant
size: Small or Medium
type: humanoid
alignment: Any alignment
ac: 12
ac_class: 15 with *mage armour*
hp: 45
hit_dice: 7d8 + 14
modifier: 2
speed: 30 ft.
stats: [ 8, 14, 15, 17, 14, 11 ]
skillsaves:
  - arcana: 5
  - perception: 4
  - stealth: 6
damage_resistances: necrotic
senses: passive Perception 14
languages: Common plus three more languages
cr: "4"
actions:
  - name: Multiattack
    desc: The remnant makes two Necrotic Surge attacks.
  - name: Necrotic Surge
    desc: "*Melee or Ranged Spell Attack:* +5 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 14 (2d10 + 3) necrotic damage."
  - name: Spellcasting
    desc: |-
      The remnant casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *mage armour*, *mage hand*, *prestidigitation*

      **1/day each:** *bane*, *dimension door*, *web*
bonus_actions:
  - name: Phase (2/Day)
    desc: The remnant becomes partially incorporeal for as long as it maintains concentration on the effect (as if concentrating on a spell). While partially incorporeal, the remnant has resistance to bludgeoning, piercing, and slashing damage.
```
