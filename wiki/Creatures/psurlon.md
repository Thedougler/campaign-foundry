---
title: Psurlon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Psurlon
size: Medium
type: aberration
alignment: typically Lawful Evil
ac: 15
ac_class: "*mage armour*"
hp: 45
hit_dice: 7d8 + 14
modifier: 2
speed: 30 ft.
stats: [ 14, 14, 14, 17, 11, 7 ]
damage_resistances: psychic
condition_immunities: blinded, charmed
senses: blindsight 120 ft. (blind beyond this radius), passive Perception 10
languages: Deep Speech, telepathy 120 ft.
cr: "2"
traits:
  - name: Aberrant Mind
    desc: Magic can't read the psurlon's thoughts or put the psurlon to sleep.
actions:
  - name: Multiattack
    desc: The psurlon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one creature. *Hit:* 6 (1d8 + 2) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) slashing damage."
  - name: Psychic Crush
    desc: The psurlon targets one creature it can see within 120 feet of itself. The target must make a DC 13 Wisdom saving throw, taking 14 (2d10 + 3) psychic damage on a failed save, or half as much damage on a successful one.
  - name: Spellcasting (Psionics)
    desc: |-
      The psurlon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 13):

      **2/day each:** *disguise self*, *mage armour* (self only)

      **1/day:** *suggestion*
```
