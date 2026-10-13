---
title: Abjurer Wizard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Abjurer Wizard
size: Medium
type: humanoid
alignment: Any alignment
ac: 12
ac_class: 15 with *mage armour*
hp: 104
hit_dice: 16d8 + 32
modifier: 2
speed: 30 ft.
stats: [ 9, 14, 14, 18, 12, 11 ]
saves:
  - int: 8
  - wis: 5
skillsaves:
  - arcana: 8
  - history: 8
senses: passive Perception 11
languages: any four languages
cr: "9"
actions:
  - name: Multiattack
    desc: The abjurer makes three Arcane Burst attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Spell Attack:* +8 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 20 (3d10 + 4) force damage."
  - name: Force Blast
    desc: Each creature in a 20-foot cube originating from the abjurer must make a DC 16 Constitution saving throw. On a failed save, a creature takes 36 (8d8) force damage and is pushed up to 10 feet away from the abjurer. On a successful save, a creature takes half as much damage and isn't pushed.
  - name: Spellcasting
    desc: |-
      The abjurer casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *dancing lights*, *mage hand*, *message*, *prestidigitation*

      **2/day each:** *dispel magic*, *lightning bolt*, *mage armour*

      **1/day each:** *arcane lock*, *banishment*, *globe of invulnerability*, *invisibility*, *wall of force*
reactions:
  - name: Arcane Ward (Recharge 4–6)
    desc: When the abjurer or a creature it can see within 30 feet of it takes damage, the abjurer magically creates a protective barrier around itself or the other creature. The barrier reduces the damage to the protected creature by 26 (4d10 + 4), to a minimum of 0, and then vanishes.
```
