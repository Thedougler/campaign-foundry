---
title: Warforged Soldier
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Warforged Soldier
size: Medium
type: humanoid
subtype: warforged
alignment: Any alignment
ac: 16
ac_class: natural armour, shield
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
condition_immunities: disease
gear:
  - javelin
senses: passive Perception 14
languages: Common
cr: "1"
traits:
  - name: Warforged Resilience
    desc: The warforged has advantage on saving throws against being poisoned and is immune to disease. Magic can't put it to sleep.
actions:
  - name: Multiattack
    desc: The warforged makes two armblade attacks.
  - name: Armblade
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage."
  - name: Javelin
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
reactions:
  - name: Protection
    desc: When an attacker the warforged can see makes an attack roll against a creature within 5 feet of the warforged, the warforged can impose disadvantage on the attack roll.
```
