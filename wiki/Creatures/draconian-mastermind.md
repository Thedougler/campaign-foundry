---
title: Draconian Mastermind
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Draconian Mastermind
size: Medium
type: monstrosity
alignment: Any alignment
ac: 17
ac_class: natural armour
hp: 67
hit_dice: 9d8 + 27
modifier: 2
speed: 35 ft.
stats: [ 13, 14, 16, 15, 11, 17 ]
saves:
  - int: 5
  - wis: 3
  - cha: 6
skillsaves:
  - perception: 3
condition_immunities: charmed
senses: truesight 60 ft., passive Perception 13
languages: Common, Draconic
cr: "6"
traits:
  - name: Death Throes
    desc: When the draconian is reduced to 0 hit points, its magical essence lashes out as a ball of lightning at the closest creature within 30 feet of it before arcing out to up to two other creatures within 15 feet of the first. Each creature must make a DC 14 Dexterity saving throw. On a failed save, the creature takes 9 (2d8) lightning damage and is stunned until the end of its next turn. On a successful save, the creature takes half as much damage and isn't stunned.
actions:
  - name: Multiattack
    desc: The draconian makes three Rend or Energy Ray attacks.
  - name: Rend
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage."
  - name: Energy Ray
    desc: "*Ranged Spell Attack:* +6 to hit, range 60 ft., one target. *Hit:* 8 (1d10 + 3) force damage."
  - name: Noxious Breath (Recharge 5–6)
    desc: The draconian exhales a 15-foot cone of noxious gas. Each creature in that area must make a DC 14 Constitution saving throw. On a failed save, the creature takes 21 (6d6) poison damage and gains 1 level of exhaustion. On a successful save, the creature takes half as much damage, doesn't gain exhaustion, and is immune to all draconians' Noxious Breath for 24 hours.
  - name: Spellcasting
    desc: |-
      The draconian casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 14):

      **At will:** *invisibility*, *mage hand*

      **2/day each:** *dimension door*, *disguise self*, *sending*
reactions:
  - name: Magic Shield (3/Day)
    desc: When the draconian is hit by an attack roll, it can create an invisible barrier of magical force around itself, granting it a +5 bonus to its AC against that attack and potentially causing the attack to miss.
```
