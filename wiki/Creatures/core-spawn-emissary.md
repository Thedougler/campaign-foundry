---
title: Core Spawn Emissary
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Core Spawn Emissary
size: Medium
type: aberration
alignment: Chaotic Evil
ac: 15
ac_class: natural armour
hp: 102
hit_dice: 12d8 + 48
modifier: 2
speed: 40 ft., fly 60 ft. (hover)
stats: [ 17, 15, 18, 8, 13, 8 ]
saves:
  - dex: 5
  - wis: 4
  - cha: 2
skillsaves:
  - perception: 4
damage_immunities: psychic
condition_immunities: blinded
senses: blindsight 30 ft., tremorsense 60 ft., passive Perception 14
languages: telepathy 120 ft., understands Deep Speech but can't speak
cr: "6"
traits:
  - name: Magic Resistance
    desc: The emissary has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The emissary makes three talons attacks.
  - name: Talons
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one creature. *Hit:* 14 (2d10 + 3) slashing damage."
  - name: Alluring Thrum (Recharge 5–6)
    desc: The emissary emits a dreadful yet alluring hum. Each creature within 20 feet of the emissary that can hear it and that isn't an aberration must succeed on a DC 14 Constitution saving throw or be charmed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Crystal Spores (Recharge 6)
    desc: A 15-foot-radius cloud of toxic crystalline spores extends out from the emissary. The spores spread around corners. Each creature in the area must succeed on a DC 14 Constitution saving throw or become poisoned. While poisoned in this way, a creature takes 11 (2d10) poison damage at the start of each of its turns. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```
