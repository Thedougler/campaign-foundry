---
title: Living Cone of Cold
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Construct
size: Large
habitat:
  - Any
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Living Cone of Cold
size: Large
type: construct
alignment: Unaligned
ac: 15
hp: 105
hit_dice: 10d10 + 50
modifier: 2
speed: 25 ft., fly 25 ft.
stats: [ 10, 15, 20, 3, 11, 6 ]
damage_immunities: cold
condition_immunities: blinded, charmed, deafened, frightened, grappled, poisoned, prone, restrained
senses: passive Perception 10
cr: "7"
traits:
  - name: Amorphous
    desc: The living spell can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Magic Resistance
    desc: The living spell has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The living spell makes two Magical Strike attacks.
  - name: Magical Strike
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 27 (5d8 + 5) Cold damage."
  - name: Spell Mimicry (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 16, each creature in a 60-foot Cone. *Failure:* 36 (8d8) Cold damage. *Success:* Half damage."
```
