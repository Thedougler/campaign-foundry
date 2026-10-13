---
title: Aerosaur
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aerosaur
size: Gargantuan
type: monstrosity
subtype: dinosaur
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 155
hit_dice: 10d20 + 50
modifier: 0
speed: 20 ft., fly 120 ft.
stats: [ 26, 10, 21, 3, 10, 5 ]
skillsaves:
  - perception: 4
senses: passive Perception 14
cr: "10"
traits:
  - name: Magic Resistance
    desc: The aerosaur has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The aerosaur makes one Bite attack and one Talons attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 27 (3d12 + 8) piercing damage. If the target is a Huge or smaller creature, it has the grappled condition (escape DC 18). Until this grapple ends, the target has the restrained condition, and the aerosaur can't Bite another target."
  - name: Talons
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 24 (3d10 + 8) slashing damage."
  - name: Wing Gusts (Recharge 5–6)
    desc: The aerosaur beats its wings, creating bursts of thunderous force. Each creature within 10 feet of the aerosaur must make a DC 20 Strength saving throw. On a failed save, a creature takes 38 (7d10) thunder damage, is pushed up to 30 feet horizontally from the aerosaur, and has the prone condition. On a successful save, a creature takes half as much damage and is pushed up to 15 feet horizontally from the aerosaur.
```
