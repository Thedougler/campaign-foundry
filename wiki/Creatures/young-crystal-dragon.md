---
title: Young Crystal Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Dragon
size: Large
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Young Crystal Dragon
size: Large
type: dragon
subtype: gem
alignment: typically Chaotic Neutral
ac: 15
ac_class: natural armour
hp: 95
hit_dice: 10d10 + 40
modifier: 1
speed: 40 ft., burrow 20 ft., climb 40 ft., fly 80 ft.
stats: [ 17, 12, 18, 16, 14, 17 ]
saves:
  - dex: 4
  - con: 7
  - wis: 5
  - cha: 6
skillsaves:
  - perception: 8
  - stealth: 7
  - survival: 5
damage_resistances: cold, radiant
senses: blindsight 30 ft., darkvision 120 ft., passive Perception 18
languages: Common, Draconic, telepathy 120 ft.
cr: "5"
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 10 ft., one target. *Hit:* 14 (2d10 + 3) piercing damage plus 4 (1d8) radiant damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage."
  - name: Scintillating Breath (Recharge 5–6)
    desc: The dragon exhales a burst of brilliant radiance in a 30-foot cone. Each creature in that area must make a DC 15 Constitution saving throw, taking 27 (6d8) radiant damage on a failed save, or half as much damage on a successful one. The dragon then gains 10 temporary hit points by absorbing a portion of the radiant energy.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *dancing lights*, *guidance*

      **1/day each:** *hypnotic pattern*, *lesser restoration*
```
