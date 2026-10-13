---
title: Living Vitriolic Sphere
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
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
name: Living Vitriolic Sphere
size: Large
type: construct
alignment: Unaligned
ac: 15
hp: 76
hit_dice: 8d10 + 32
modifier: 2
speed: 25 ft., fly 25 ft.
stats: [ 10, 15, 18, 3, 10, 6 ]
damage_immunities: acid
condition_immunities: blinded, charmed, deafened, frightened, grappled, poisoned, prone, restrained
senses: passive Perception 10
cr: "5"
traits:
  - name: Amorphous
    desc: The living spell can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Magic Resistance
    desc: The living spell has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The living spell makes two Magical Strike attacks.
  - name: Magical Strike
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 21 (5d6 + 4) Acid damage."
  - name: Spell Mimicry (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 15, each creature in a 20-foot-radius Sphere centred on a point within 150 feet. *Failure:* 25 (10d4) Acid damage, and 12 (5d4) Acid damage at the end of the target's next turn. *Success:* Half initial damage only."
```
