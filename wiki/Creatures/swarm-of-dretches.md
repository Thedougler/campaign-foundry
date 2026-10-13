---
title: Swarm of Dretches
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Fiend
size: Large
habitat:
  - Planar (Abyss)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Dretches
size: Large
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 12
hp: 45
hit_dice: 6d10 + 12
modifier: 0
speed: 40 ft.
stats: [ 14, 11, 14, 5, 8, 3 ]
damage_resistances: bludgeoning, cold, fire, lightning, piercing, slashing
damage_immunities: poison
condition_immunities: charmed, frightened, grappled, paralysed, petrified, poisoned, prone, restrained, stunned
senses: Darkvision 60 ft., passive Perception 9
languages: Abyssal; telepathy 60 ft. (works only with creatures that understand Abyssal)
cr: "4"
traits:
  - name: Fetid Aura
    desc: "*Constitution Saving Throw:* DC 12, any creature that starts its turn in a 10-foot Emanation originating from the swarm. *Failure:* The target has the Poisoned condition until the start of its next turn. While Poisoned, the target can take either an action or a Bonus Action on its turn, not both, and it can't take Reactions."
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Small creature. The swarm can't regain Hit Points or gain Temporary Hit Points.
actions:
  - name: Multiattack
    desc: The swarm makes two Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 12 (3d6 + 2) Slashing damage, or 9 (3d4 + 2) Slashing damage if the swarm is Bloodied."
```
