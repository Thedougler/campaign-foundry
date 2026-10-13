---
title: Swarm of Lemures
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fiend
size: Large
habitat:
  - Planar (Nine Hells)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Lemures
size: Large
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 12
hp: 45
hit_dice: 6d10 + 12
modifier: -2
speed: 40 ft.
stats: [ 14, 7, 14, 1, 12, 3 ]
damage_resistances: bludgeoning, cold, piercing, slashing
damage_immunities: fire, poison
condition_immunities: charmed, frightened, grappled, paralysed, petrified, poisoned, prone, restrained, stunned
senses: Darkvision 120 ft. (unimpeded by magical Darkness), passive Perception 11
languages: understands Infernal but can't speak
cr: "3"
traits:
  - name: Hellish Restoration
    desc: If the swarm dies in the Nine Hells, it revives with all its Hit Points in 1d10 days unless it is killed by a creature under the effects of a *Bless* spell or its remains are sprinkled with Holy Water.
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through an opening large enough for a Medium creature. The swarm can't regain Hit Points or gain Temporary Hit Points.
actions:
  - name: Multiattack
    desc: The swarm makes two Vile Slime attacks.
  - name: Vile Slime
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 11 (2d8 + 2) Poison damage, or 9 (2d6 + 2) Poison damage if the swarm is Bloodied."
```
