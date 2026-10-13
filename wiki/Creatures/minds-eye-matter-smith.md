---
title: Mind's Eye Matter Smith
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
name: Mind's Eye Matter Smith
size: Small or Medium
type: humanoid
alignment: Any alignment
ac: 12
ac_class: 15 with *mage armour*
hp: 78
hit_dice: 12d8 + 24
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 14, 14, 14, 16 ]
saves:
  - int: 4
  - cha: 5
skillsaves:
  - investigation: 4
  - perception: 6
senses: passive Perception 16
languages: Common plus two more languages
cr: "4"
actions:
  - name: Multiattack
    desc: The matter smith makes two Manifested Force attacks.
  - name: Manifested Force
    desc: "*Melee or Ranged Spell Attack:* +5 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 10 (2d6 + 3) force damage."
  - name: Spellcasting
    desc: |-
      The matter smith casts one of the following spells, using Charisma as the spellcasting ability:

      **At will:** *mage armour*, *mage hand*, *prestidigitation*

      **1/day each:** *create food and water*, *fabricate* (as an action)
bonus_actions:
  - name: Planar Smithing
    desc: |-
      The matter smith magically manipulates the energy of the plane of existence it's on to produce one of the following effects (choose one or roll a d4):

      - **1–2 Chains.** The matter smith creates spectral bindings around a creature it can see within 30 feet of itself. The target must succeed on a DC 13 Dexterity saving throw or have the restrained condition until the end of its next turn.  
      - **3–4 Magic Shield.** The matter smith conjures a floating, spectral shield that grants the matter smith a +5 bonus to its AC until the shield disappears at the start of the matter smith's next turn. The first time a creature misses a melee attack roll against the matter smith while the shield is conjured, that creature takes 7 (2d6) force damage.
```
