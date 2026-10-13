---
title: Reaper Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Reaper Spirit
size: Medium
type: undead
alignment: Neutral
ac_class: 11 + the level of the spell (natural armour)
hp: 40 + 10 for each spell level above 4th
modifier: 3
speed: 30 ft., fly 30 ft. (hover)
stats: [ 16, 16, 16, 16, 16, 16 ]
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: darkvision 60 ft., passive Perception 13
languages: understands the languages you speak
traits:
  - name: Incorporeal Movement
    desc: The spirit can move through other creatures and objects as if they were difficult terrain. If it ends its turn inside an object, it is shunted to the nearest unoccupied space and takes 1d10 force damage for every 5 feet shunted.
actions:
  - name: Multiattack
    desc: The spirit makes a number of Reaping Scythe attacks equal to half the level of the spell (rounded down).
  - name: Reaping Scythe
    desc: "*Melee Weapon Attack:* your spell attack modifier to hit (with advantage), reach 5 ft., the creature haunted by Haunt Creature. *Hit:* 1d8 + 3 + the spell's level necrotic damage."
bonus_actions:
  - name: Haunt Creature
    desc: The spirit targets a creature it can see within 10 feet of itself and begins haunting it. While the target is haunted, you and the spirit sense the direction and distance to the target if it is on the same plane of existence as you. Additionally, if the target starts its turn within 10 feet of the spirit, the target must succeed on a Wisdom saving throw against your spell save DC or have the frightened condition until the start of the target's next turn. The target remains haunted until it dies, the spirit disappears, or the spirit uses this action again.
```
