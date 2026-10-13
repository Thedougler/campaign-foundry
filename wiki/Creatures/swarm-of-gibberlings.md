---
title: Swarm of Gibberlings
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Gibberlings
size: Large
type: fiend
alignment: typically Chaotic Evil
ac: 12
hp: 38
hit_dice: 7d10
modifier: 2
speed: 30 ft.
stats: [ 18, 14, 11, 5, 7, 5 ]
damage_resistances: bludgeoning, piercing, slashing
condition_immunities: charmed, frightened, grappled, paralysed, petrified, prone, restrained, stunned
senses: darkvision 120 ft., passive Perception 8
languages: Gibberling
cr: "3"
traits:
  - name: Aversion to Fire
    desc: If the swarm takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn.
  - name: Incessant Gibberish
    desc: Any non-gibberling that is within 60 feet of the swarm and doesn't have the deafened condition has disadvantage on Constitution saving throws to maintain concentration on spells and similar effects.
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough to accommodate a Small gibberling. The swarm can't regain hit points or gain temporary hit points.
actions:
  - name: Multiattack
    desc: The swarm makes two Gnashing Teeth attacks.
  - name: Gnashing Teeth
    desc: "*Melee Weapon Attack:* +6 to hit, reach 0 ft., one target in the swarm's space. *Hit:* 14 (4d4 + 4) piercing damage, or 9 (2d4 + 4) piercing damage if the swarm has half of its hit points or fewer."
```
