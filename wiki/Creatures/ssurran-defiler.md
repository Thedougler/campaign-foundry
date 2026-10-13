---
title: Ssurran Defiler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ssurran Defiler
size: Medium
type: monstrosity
subtype: lizardfolk
alignment: Any alignment
ac: 16
ac_class: natural armour, intellect fortress
hp: 52
hit_dice: 7d8 + 21
modifier: 1
speed: 30 ft., swim 30 ft.
stats: [ 13, 12, 16, 15, 15, 7 ]
saves:
  - con: 5
  - int: 4
skillsaves:
  - arcana: 4
  - perception: 4
  - stealth: 3
  - survival: 4
damage_resistances: necrotic
senses: passive Perception 14
languages: Draconic
cr: "3"
traits:
  - name: Hold Breath
    desc: The ssurran can hold its breath for 15 minutes.
  - name: Intellect Fortress
    desc: The ssurran's AC includes its Intelligence modifier.
actions:
  - name: Multiattack
    desc: The ssurran makes two Claw attacks and uses Defile (if available).
  - name: Claw
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d6 + 1) slashing damage plus 4 (1d8) necrotic damage."
  - name: Defile (Recharge 6)
    desc: Ordinary vegetation within 10 feet of the ssurran withers and dies. In addition, each creature within 10 feet of the ssurran must make a DC 11 Constitution saving throw, taking 22 (4d10) necrotic damage on a failed save, or half as much damage on a successful one. The ssurran regains 5 (1d10) hit points for each creature that fails the saving throw.
  - name: Spellcasting (Psionics)
    desc: |-
      The ssurran casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability:

      **At will:** *mage hand* (the hand is invisible)

      **1/day:** *invisibility* (self only)
```
