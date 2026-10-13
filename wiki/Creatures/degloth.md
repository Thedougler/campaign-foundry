---
title: Degloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Degloth
size: Large
type: fiend
subtype: demon
alignment: typically Chaotic Evil
ac: 18
ac_class: natural armour
hp: 133
hit_dice: 14d10 + 56
modifier: 3
speed: 40 ft., climb 40 ft.
stats: [ 23, 17, 18, 6, 11, 9 ]
saves:
  - str: 10
  - con: 8
skillsaves:
  - athletics: 10
  - perception: 4
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: darkvision 120 ft., passive Perception 14
languages: Abyssal, telepathy 120 ft.
cr: "11"
traits:
  - name: Magic Resistance
    desc: The degloth has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The degloth makes two Razor Fist attacks.
  - name: Razor Fist
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 17 (2d10 + 6) slashing damage, and if the target is a Medium or smaller creature, the target has the grappled condition (escape DC 18). Until this grapple ends, the target has the restrained condition, and the degloth can't use this fist to grapple another target. The degloth has two fists."
bonus_actions:
  - name: Crush
    desc: The degloth targets one creature currently grappled by it. The target must make a DC 18 Strength saving throw, taking 15 (2d8 + 6) bludgeoning damage on a failed save or half as much damage on a successful one.
```
