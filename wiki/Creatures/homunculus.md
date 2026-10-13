---
title: Homunculus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0
creature_type: Construct
size: Tiny
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Homunculus
size: Tiny
type: construct
alignment: Neutral
ac: 13
hp: 4
hit_dice: 1d4 + 2
modifier: 2
speed: 20 ft., fly 40 ft.
stats: [ 4, 15, 14, 10, 10, 7 ]
saves:
  - wis: 2
  - cha: 0
damage_immunities: poison
condition_immunities: charmed, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: understands Common plus one other language but can't speak
cr: "0"
traits:
  - name: Telepathic Bond
    desc: While the homunculus is on the same plane of existence as its master, the two of them can communicate telepathically with each other.
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 1 Piercing damage, and the target is subjected to the following effect. *Constitution Saving Throw:* DC 12. *Failure:* The target has the Poisoned condition until the end of the homunculus's next turn. *By 5Th Failure:* The target has the Poisoned condition for 1 minute. While Poisoned, the target has the Unconscious condition, which ends early if the target takes any damage."
```
