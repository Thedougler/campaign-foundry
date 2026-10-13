---
title: Vlazok
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
name: Vlazok
size: Large
type: fiend
subtype: demon
alignment: typically Chaotic Evil
ac: 17
ac_class: natural armour
hp: 136
hit_dice: 16d10 + 48
modifier: 4
speed: 30 ft., climb 30 ft.
stats: [ 21, 18, 16, 6, 9, 9 ]
saves:
  - str: 9
  - con: 7
skillsaves:
  - perception: 3
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: darkvision 120 ft., passive Perception 13
languages: Abyssal, telepathy 120 ft.
cr: "11"
traits:
  - name: All-Around Vision
    desc: The vlazok can't be surprised.
  - name: Blood Frenzy
    desc: The vlazok has advantage on melee attack rolls against any creature that doesn't have all its hit points.
  - name: Magic Resistance
    desc: The vlazok has advantage on saving throws against spells and other magical effects.
  - name: Spider Climb
    desc: The vlazok can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The vlazok makes two Gore attacks.
  - name: Gore
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 23 (4d8 + 5) piercing damage, and if the target is a Large or smaller creature, it has the prone condition."
bonus_actions:
  - name: Stomp
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one prone creature. *Hit:* 27 (4d10 + 5) bludgeoning damage."
```
