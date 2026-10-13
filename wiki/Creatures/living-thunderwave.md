---
title: Living Thunderwave
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Construct
size: Medium
habitat:
  - Any
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Living Thunderwave
size: Medium
type: construct
alignment: Unaligned
ac: 15
hp: 30
hit_dice: 4d8 + 12
modifier: 1
speed: 25 ft., fly 25 ft.
stats: [ 10, 13, 16, 3, 6, 6 ]
damage_immunities: thunder
condition_immunities: blinded, charmed, deafened, frightened, grappled, poisoned, prone, restrained
senses: passive Perception 8
cr: "1"
traits:
  - name: Amorphous
    desc: The living spell can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Magic Resistance
    desc: The living spell has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Magical Strike
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Thunder damage."
  - name: Spell Mimicry (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 13, each creature in a 15-foot Cube originating from the living spell. *Failure:* 9 (2d8) Thunder damage, and the target is pushed 10 feet away from the living spell. *Success:* Half damage only. *Failure or Success:* A thunderous boom is audible within 300 feet."
```
