---
title: Dretch
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Fiend
size: Small
habitat:
  - Planar (Abyss)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dretch
size: Small
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 11
hp: 18
hit_dice: 4d6 + 4
modifier: 0
speed: 20 ft.
stats: [ 12, 11, 12, 5, 8, 3 ]
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: Darkvision 60 ft., passive Perception 9
languages: Abyssal; telepathy 60 ft. (works only with creatures that understand Abyssal)
cr: 1/4
actions:
  - name: Rend
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 4 (1d6 + 1) Slashing damage."
  - name: Fetid Cloud (1/Day)
    desc: "*Constitution Saving Throw:* DC 11, each creature in a 10-foot Emanation originating from the dretch. *Failure:* The target has the Poisoned condition until the end of its next turn. While Poisoned, the creature can take either an action or a Bonus Action on its turn, not both, and it can't take Reactions."
```
