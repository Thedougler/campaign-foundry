---
title: Wraith
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Undead
size: Small or Medium
habitat:
  - Planar (Shadowfell)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Wraith
size: Small or Medium
type: undead
alignment: Neutral Evil
ac: 13
hp: 67
hit_dice: 9d8 + 27
modifier: 3
speed: 5 ft., fly 60 ft. (hover)
stats: [ 6, 16, 16, 12, 14, 15 ]
damage_resistances: acid, bludgeoning, cold, fire, piercing, slashing
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Darkvision 60 ft., passive Perception 12
languages: Common plus two other languages
cr: "5"
traits:
  - name: Incorporeal Movement
    desc: The wraith can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the wraith has Disadvantage on ability checks and attack rolls.
actions:
  - name: Life Drain
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 21 (4d8 + 3) Necrotic damage. If the target is a creature, its Hit Point maximum decreases by an amount equal to the damage taken."
  - name: Create Spectre
    desc: The wraith targets a Humanoid corpse within 10 feet of itself that has been dead for no longer than 1 minute. The target's spirit rises as a Spectre in the space of its corpse or in the nearest unoccupied space. The spectre is under the wraith's control. The wraith can have no more than seven spectres under its control at a time.
```
