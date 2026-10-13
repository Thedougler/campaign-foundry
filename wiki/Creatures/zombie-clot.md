---
title: Zombie Clot
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Undead
size: Huge
habitat:
  - Planar (Shadowfell)
  - Underdark
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Zombie Clot
size: Huge
type: undead
alignment: Neutral Evil
ac: 12
hp: 104
hit_dice: 11d12 + 33
modifier: 0
speed: 40 ft.
stats: [ 20, 10, 16, 3, 8, 10 ]
saves:
  - con: 6
damage_immunities: poison
condition_immunities: charmed, exhaustion, paralysed, petrified, poisoned, prone, stunned
senses: Darkvision 60 ft., passive Perception 9
languages: understands Common plus one other language but can't speak
cr: "6"
traits:
  - name: Deathly Stench
    desc: "*Constitution Saving Throw:* DC 14, any creature that starts its turn in a 10-foot Emanation originating from the zombie. *Failure:* 9 (2d8) Poison damage, and the target has the Poisoned condition until the start of its next turn."
  - name: Undead Fortitude
    desc: If damage reduces the zombie to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the zombie drops to 1 Hit Point instead.
actions:
  - name: Multiattack
    desc: The zombie makes two Slam attacks.
  - name: Slam
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 15 (3d6 + 5) Bludgeoning damage."
  - name: Flesh Entomb (Recharge 5–6)
    desc: |-
      *Strength Saving Throw:* DC 16, one creature the zombie can see within 30 feet. *Failure:* 16 (3d10) Bludgeoning damage. If the target is a Large or smaller creature, it is entombed in a pile of dead flesh. While entombed, the target has the Restrained condition, has Total Cover against attacks and other effects outside the dead flesh, and takes 10 (3d6) Necrotic damage at the start of each of its turns.

      The target can be freed if the dead flesh is destroyed (AC 10; HP 25; Immunity to Necrotic, Poison, and Psychic damage).
```
