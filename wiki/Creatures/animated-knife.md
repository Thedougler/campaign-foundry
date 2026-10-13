---
title: Animated Knife
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.125
creature_type: Construct
size: Tiny
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Animated Knife
size: Tiny
type: construct
alignment: Unaligned
ac: 17
ac_class: natural armour
hp: 12
hit_dice: 5d4
modifier: 2
speed: 0 ft., fly 50 ft. (hover)
stats: [ 12, 15, 11, 1, 5, 1 ]
saves:
  - dex: 4
damage_immunities: poison, psychic
condition_immunities: blinded, charmed, deafened, frightened, paralysed, petrified, poisoned
gear:
  - longsword
senses: blindsight 60 ft. (blind beyond this radius), passive Perception 7
cr: 1/8
traits:
  - name: Antimagic Susceptibility
    desc: The knife is incapacitated while in the area of an *antimagic field*. If targeted by *dispel magic*, the knife must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute.
  - name: False Appearance
    desc: While the knife remains motionless and isn't flying, it is indistinguishable from a normal knife.
actions:
  - name: Dagger
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 3 (1d4 + 1) piercing damage."
```
