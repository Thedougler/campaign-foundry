---
title: Living Cloudkill
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Living Cloudkill
size: Large
type: construct
alignment: Unaligned
ac: 15
ac_class: natural armour
hp: 73
hit_dice: 7d10 + 35
modifier: 2
speed: 25 ft., fly 25 ft.
stats: [ 10, 15, 20, 3, 11, 6 ]
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, grappled, poisoned, prone
senses: darkvision 60 ft., passive Perception 10
cr: "7"
traits:
  - name: Amorphous
    desc: The living spell can move through a space as narrow as 1 inch wide without squeezing.
  - name: Magic Resistance
    desc: The living spell has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The living spell makes two Magical Strike attacks.
  - name: Magical Strike
    desc: "*Melee Spell Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 22 (5d6 + 5) poison damage."
  - name: Spell Mimicry (Recharge 5–6)
    desc: |-
      The living spell creates a 40-foot-diameter sphere of fog within 60 feet of it (the fog spreads around corners). When a creature enters the fog for the first time on a turn or starts its turn there, it must make a DC 16 Constitution saving throw, taking 22 (5d8) poison damage on a failed save, or half as much damage on a successful one.

      The fog moves 10 feet away from the living spell at the start of each of its turns, rolling along the ground and through openings. The fog lasts for 10 minutes or until the living spell's concentration ends (as if concentrating on a spell).
```
