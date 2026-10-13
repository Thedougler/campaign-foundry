---
title: Swarm of Ravenous Insects
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Beast
size: Medium
habitat:
  - Coastal
  - Forest
  - Grassland
  - Swamp
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Ravenous Insects
size: Medium
type: beast
alignment: Unaligned
ac: 13
hp: 39
hit_dice: 6d8 + 12
modifier: 2
speed: 30 ft., burrow 30 ft., climb 30 ft.
stats: [ 3, 15, 14, 1, 12, 1 ]
damage_resistances: bludgeoning, piercing, slashing
condition_immunities: charmed, frightened, grappled, paralysed, petrified, prone, restrained, stunned
senses: Tremorsense 60 ft., passive Perception 11
cr: "3"
traits:
  - name: Skeletonize
    desc: If the swarm starts its turn in the same space as a Large or smaller corpse, the corpse is destroyed, leaving behind only what it was wearing or carrying.
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.
actions:
  - name: Ravenous Bites
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 20 (4d8 + 2) Piercing damage, or 11 (2d8 + 2) Piercing damage if the swarm is Bloodied, and the target has the Poisoned condition for 1 minute as insects burrow inside it. The condition ends early if a spell or effect restores Hit Points to the target. While Poisoned, the target takes 4 (1d8) Piercing damage at the start of each of its turns. A creature reduced to 0 Hit Points by this damage dies."
```
