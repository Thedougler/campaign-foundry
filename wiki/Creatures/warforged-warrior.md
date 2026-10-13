---
title: Warforged Warrior
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Warforged Warrior
size: Medium
type: construct
alignment: Any alignment
ac: 16
ac_class: natural armour
hp: 30
hit_dice: 4d8 + 12
modifier: 1
speed: 30 ft.
stats: [ 16, 12, 16, 10, 14, 11 ]
skillsaves:
  - athletics: 5
  - perception: 4
  - survival: 4
damage_resistances: poison
condition_immunities: poisoned
gear:
  - javelin
senses: passive Perception 14
languages: Common
cr: "1"
actions:
  - name: Multiattack
    desc: The warforged makes two Armblade attacks.
  - name: Armblade
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage."
  - name: Javelin
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
reactions:
  - name: Protection
    desc: When an attacker the warforged can see makes an attack roll against a creature within 5 feet of the warforged, the warforged can impose disadvantage on the attack roll.
```
