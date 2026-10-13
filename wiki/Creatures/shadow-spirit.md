---
title: Shadow Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Tasha's Cauldron of Everything
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shadow Spirit
size: Medium
type: monstrosity
alignment: Unaligned
ac_class: 11 + the level of the spell (natural armour)
hp: 35 + 15 for each spell level above 3rd
modifier: 3
speed: 40 ft.
stats: [ 13, 16, 15, 4, 10, 16 ]
damage_resistances: necrotic
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 10
languages: understands the languages you speak
traits:
  - name: Terror Frenzy (Fury Only)
    desc: The spirit has advantage on attack rolls against frightened creatures.
  - name: Weight of Sorrow (Despair Only)
    desc: Any creature, other than you, that starts its turn within 5 feet of the spirit has its speed reduced by 20 feet until the start of that creature's next turn.
actions:
  - name: Multiattack
    desc: The spirit makes a number of attacks equal to half this spell's level (rounded down).
  - name: Chilling Rend
    desc: "*Melee Weapon Attack:* your spell attack modifier to hit, reach 5 ft., one target. *Hit:* 1d12 + 3 + the spell's level cold damage."
  - name: Dreadful Scream (1/Day)
    desc: The spirit screams. Each creature within 30 feet of it must succeed on a Wisdom saving throw against your spell save DC or be frightened for 1 minute. The frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
bonus_actions:
  - name: Shadow Stealth (Fear Only)
    desc: While in dim light or darkness, the spirit takes the Hide action.
```
