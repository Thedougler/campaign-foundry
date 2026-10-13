---
title: Fomorian Noble
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fomorian Noble
size: Huge
type: giant
subtype: wizard
alignment: typically Chaotic Evil
ac: 14
ac_class: 17 with *mage armour*
hp: 253
hit_dice: 22d12 + 110
modifier: 4
speed: 30 ft.
stats: [ 23, 18, 20, 19, 14, 16 ]
saves:
  - int: 9
  - wis: 7
  - cha: 8
skillsaves:
  - arcana: 14
  - perception: 7
  - stealth: 9
condition_immunities: charmed
senses: passive Perception 17
languages: Giant plus any three languages
cr: "15"
actions:
  - name: Multiattack
    desc: The fomorian makes three Rod attacks.
  - name: Rod
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 16 (3d6 + 6) bludgeoning damage plus 11 (2d10) force damage."
  - name: Spellcasting
    desc: |-
      The fomorian casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17):

      **At will:** *mage armour* (self only), *mage hand*, *prestidigitation*

      **1/day each:** *chain lightning*, *cone of cold* (6th-level version), *fireball* (6th-level version), *fly*, *plane shift* (self only)
bonus_actions:
  - name: Beguiling Presence
    desc: The fomorian targets a creature it can see within 60 feet of itself. The target must succeed on a DC 17 Wisdom saving throw or have the charmed condition for 1 minute. An affected target can repeat the saving throw at the end of each of its turns and whenever it takes damage, ending the effect on itself on a success. If a target's saving throw is successful or the effect ends for it, the target becomes immune to all fomorians' Beguiling Presence for the next 24 hours.
```
