---
title: Canoloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Fiend
size: Medium
habitat:
  - Coastal
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Canoloth
size: Medium
type: fiend
subtype: yugoloth
alignment: Typically Neutral Evil
ac: 16
ac_class: natural armour
hp: 120
hit_dice: 16d8 + 48
modifier: 0
speed: 50 ft.
stats: [ 18, 10, 17, 5, 17, 12 ]
skillsaves:
  - investigation: 3
  - perception: 9
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: poisoned
senses: truesight 120 ft., passive Perception 19
languages: Abyssal, Infernal, telepathy 60 ft.
cr: "8"
traits:
  - name: Dimensional Lock
    desc: Other creatures can't teleport to or from a space within 60 feet of the canoloth. Any attempt to do so is wasted.
  - name: Magic Resistance
    desc: The canoloth has advantage on saving throws against spells and other magical effects.
  - name: Uncanny Senses
    desc: The canoloth can't be surprised unless it's incapacitated.
actions:
  - name: Multiattack
    desc: The canoloth makes one Bite or Tongue attack and one Claw attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage plus 18 (4d8) force damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) slashing damage plus 9 (2d8) force damage."
  - name: Tongue
    desc: "*Melee Weapon Attack:* +7 to hit, reach 30 ft., one target. *Hit:* 10 (1d12 + 4) piercing damage plus 7 (2d6) acid damage. If the target is Medium or smaller, it is grappled (escape DC 15), pulled up to 30 feet toward the canoloth, and restrained until the grapple ends. The canoloth can grapple one target at a time with its tongue."
```
