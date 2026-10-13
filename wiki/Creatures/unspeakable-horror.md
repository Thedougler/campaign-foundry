---
title: Unspeakable Horror
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Monstrosity
size: Huge
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Unspeakable Horror
size: Huge
type: monstrosity
alignment: Chaotic Evil
ac: 13
hp: 126
hit_dice: 12d12 + 48
modifier: 4
speed: 40 ft.
stats: [ 21, 13, 19, 3, 14, 17 ]
saves:
  - con: 7
  - wis: 5
damage_resistances: acid, cold, necrotic, poison
condition_immunities: frightened, grappled, prone, restrained
senses: Truesight 60 ft., passive Perception 12
cr: "8"
traits:
  - name: Incomprehensible Form
    desc: Attack rolls against the horror have Disadvantage. This trait is suppressed while the horror has the Incapacitated condition.
  - name: Regeneration
    desc: The horror regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
  - name: Terrifying Aura
    desc: The horror radiates an aura in a 15-foot Emanation while it doesn't have the Incapacitated condition. *Wisdom Saving Throw:* DC 15, any enemy that starts its turn in the aura. *Failure:* The target has the Frightened condition until the start of its next turn. While Frightened in this way, the target has the Paralysed condition. *Success:* The target is immune to this horror's aura for 24 hours.
actions:
  - name: Multiattack
    desc: The horror makes three Phantasmic Assault attacks.
  - name: Phantasmic Assault
    desc: "*Melee or Ranged Attack Roll:* +8, reach 5 ft. or range 60 ft. *Hit:* 14 (4d6) Cold, Necrotic, Poison, or Psychic damage (horror's choice)."
reactions:
  - name: Warp Mind
    desc: "Trigger: A creature the horror can see within 120 feet of itself takes the Study action or makes a Constitution saving throw to maintain Concentration. _Response, _*Wisdom Saving Throw:* DC 15, the triggering creature. *Failure:* 7 (2d6) Psychic damage, and the target has the Stunned condition until the end of its next turn."
```
