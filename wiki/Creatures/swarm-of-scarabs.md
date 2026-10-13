---
title: Swarm of Scarabs
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Beast
size: Medium
habitat: []
sourcebooks:
  - Van Richten's Guide to Ravenloft
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Scarabs
size: Medium
type: beast
alignment: Unaligned
ac: 13
ac_class: natural armour
hp: 27
hit_dice: 5d8 + 5
modifier: 2
speed: 30 ft., burrow 30 ft., climb 30 ft.
stats: [ 3, 14, 13, 1, 12, 1 ]
damage_resistances: bludgeoning, piercing, slashing
condition_immunities: charmed, frightened, grappled, paralysed, petrified, prone, restrained, stunned
senses: tremorsense 60 ft., passive Perception 11
cr: "3"
traits:
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny scarab. The swarm can't regain hit points or gain temporary hit points.
  - name: Skeletonize
    desc: If the swarm starts its turn in the same space as a dead creature that is Large or smaller, the corpse is destroyed, leaving behind only equipment and bones (or exoskeleton).
  - name: Spider Climb
    desc: The swarm can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Ravenous Bites
    desc: "*Melee Weapon Attack:* +4 to hit, reach 0 ft., one target in the swarm's space. *Hit:* 14 (4d6) piercing damage, or 7 (2d6) piercing damage if the swarm has half of its hit points or fewer. If the target is a creature, scarabs burrow into its body, and the creature takes 3 (1d6) piercing damage at the start of each of its turns. Any creature can use an action to kill or remove the scarabs with fire or a weapon that deals piercing damage, causing 1 damage of the appropriate type to the target. A creature reduced to 0 hit points by the swarm's piercing damage dies."
```
