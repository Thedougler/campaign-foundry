---
title: Caldron Magen
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Construct
size: Medium
habitat:
  - Any
sourcebooks:
  - Netheril's Fall
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Caldron Magen
size: Medium
type: construct
alignment: Unaligned
ac: 20
hp: 67
hit_dice: 9d8 + 27
modifier: 3
speed: 30 ft.
stats: [ 18, 13, 16, 10, 10, 10 ]
skillsaves:
  - perception: 4
damage_immunities: acid, poison
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, paralysed, petrified, poisoned
senses: passive Perception 14
languages: understands Common plus two other languages but can't speak
cr: "4"
traits:
  - name: Disintegration
    desc: If the magen dies, it disintegrates into dust, leaving behind anything it was wearing or carrying.
  - name: Magic Resistance
    desc: The magen has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The magen makes two attacks, using Extended Fist or Acid Spittle in any combination.
  - name: Extended Fist
    desc: "*Melee Attack Roll:* +6, reach 15 ft. *Hit:* 8 (1d8 + 4) Bludgeoning damage plus 5 (1d10) Acid damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 14) from one of two fists."
  - name: Acid Spittle
    desc: "*Ranged Attack Roll:* +6, range 60 ft. *Hit:* 13 (2d8 + 4) Acid damage."
```
