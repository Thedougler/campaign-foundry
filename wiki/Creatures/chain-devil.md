---
title: Chain Devil
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Fiend
size: Medium
habitat:
  - Planar (Nine Hells)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Chain Devil
size: Medium
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 15
hp: 85
hit_dice: 10d8 + 40
modifier: 5
speed: 30 ft.
stats: [ 18, 15, 18, 11, 12, 14 ]
saves:
  - con: 7
  - wis: 4
damage_resistances: bludgeoning, cold, piercing, slashing
damage_immunities: fire, poison
condition_immunities: poisoned
senses: Darkvision 120 ft. (unimpeded by magical Darkness), passive Perception 11
languages: Infernal; telepathy 120 ft.
cr: "8"
traits:
  - name: Diabolical Restoration
    desc: If the devil dies outside the Nine Hells, its body disappears in sulphurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - name: Magic Resistance
    desc: The devil has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The devil makes two Chain attacks and uses Conjure Infernal Chain.
  - name: Chain
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 11 (2d6 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of two chains, and it has the Restrained condition until the grapple ends."
  - name: Conjure Infernal Chain
    desc: The devil conjures a fiery chain to bind a creature. *Dexterity Saving Throw:* DC 15, one creature the devil can see within 60 feet. *Failure:* 9 (2d4 + 4) Fire damage, and the target has the Restrained condition until the end of the devil's next turn, at which point the chain disappears. If the target is Large or smaller, the devil moves the target up to 30 feet straight toward itself. *Success:* The chain disappears.
reactions:
  - name: Unnerving Gaze
    desc: "Trigger: A creature the devil can see starts its turn within 30 feet of the devil and can see the devil. _Response, _*Wisdom Saving Throw:* DC 15, the triggering creature. *Failure:* The target has the Frightened condition until the end of its turn. *Success:* The target is immune to this devil's Unnerving Gaze for 24 hours."
```
