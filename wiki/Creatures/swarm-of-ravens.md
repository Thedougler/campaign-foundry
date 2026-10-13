---
title: Swarm of Ravens
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Beast
size: Medium
habitat:
  - Hill
  - Swamp
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Ravens
size: Medium
type: beast
alignment: Unaligned
ac: 12
hp: 11
hit_dice: 2d8 + 2
modifier: 2
speed: 10 ft., fly 50 ft.
stats: [ 6, 14, 12, 5, 12, 6 ]
skillsaves:
  - perception: 5
damage_resistances: bludgeoning, piercing, slashing
condition_immunities: charmed, frightened, grappled, paralysed, petrified, prone, restrained, stunned
senses: passive Perception 15
cr: 1/4
traits:
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny raven. The swarm can't regain Hit Points or gain Temporary Hit Points.
actions:
  - name: Beaks
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Piercing damage, or 2 (1d4) Piercing damage if the swarm is Bloodied."
  - name: Cacophony (Recharge 6)
    desc: "*Wisdom Saving Throw:* DC 10, one creature in the swarm's space. *Failure:* The target has the Deafened condition until the start of the swarm's next turn. While Deafened, the target also has Disadvantage on ability checks and attack rolls."
```
