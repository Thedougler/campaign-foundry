---
title: Primeval Owlbear
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Monstrosity
size: Huge
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Primeval Owlbear
size: Huge
type: monstrosity
alignment: Unaligned
ac: 16
hp: 126
hit_dice: 12d12 + 48
modifier: 5
speed: 40 ft., climb 40 ft., fly 5 ft.
stats: [ 22, 14, 19, 8, 15, 7 ]
saves:
  - con: 7
  - wis: 5
skillsaves:
  - perception: 8
senses: Darkvision 120 ft., passive Perception 18
cr: "7"
traits:
  - name: Magic Resistance
    desc: The owlbear has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The owlbear makes two Ravage attacks.
  - name: Ravage
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 15 (2d8 + 6) Slashing damage. If the target is a Huge or smaller creature and the owlbear moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Slashing damage and has the Prone condition."
  - name: Screech (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 15, each creature in a 30-foot Emanation originating from the owlbear. *Failure:* 27 (6d8) Thunder damage, and the target has the Incapacitated condition until the end of its next turn. *Success:* Half damage only."
```
