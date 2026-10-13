---
title: Core Spawn Crawler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Aberration
size: Small
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Core Spawn Crawler
size: Small
type: aberration
alignment: Chaotic Evil
ac: 12
hp: 21
hit_dice: 6d6
modifier: 2
speed: 30 ft.
stats: [ 7, 14, 10, 9, 12, 6 ]
skillsaves:
  - perception: 5
damage_immunities: psychic
condition_immunities: blinded
senses: blindsight 30 ft. (blind beyond this radius), tremorsense 60 ft., passive Perception 15
languages: understands Deep Speech but can't speak
cr: "1"
traits:
  - name: Pack Tactics
    desc: The crawler has advantage on an attack roll against a creature if at least one of the crawler's allies is within 5 feet of the creature and the ally isn't incapacitated.
actions:
  - name: Multiattack
    desc: "The crawler makes four attacks: one with its bite, two with its claws, and one with its tail."
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one creature. *Hit:* 4 (1d4 + 2) piercing damage and the target must succeed on a DC 11 Wisdom saving throw or become frightened until the start of the crawler's next turn."
  - name: Claws
    desc: "*Melee Weapon Attack:* +4 to hit, reach 15 ft., one target. *Hit:* 4 (1d4 + 2) slashing damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +4 to hit, reach 15 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage."
```
