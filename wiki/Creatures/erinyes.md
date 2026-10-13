---
title: Erinyes
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
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
name: Erinyes
size: Medium
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 18
hp: 178
hit_dice: 21d8 + 84
modifier: 7
speed: 30 ft., fly 60 ft.
stats: [ 18, 16, 18, 14, 14, 18 ]
saves:
  - dex: 7
  - con: 8
  - cha: 8
skillsaves:
  - perception: 6
  - persuasion: 8
damage_resistances: cold
damage_immunities: fire, poison
condition_immunities: poisoned
senses: Truesight 120 ft., passive Perception 16
languages: Infernal; telepathy 120 ft.
cr: "12"
traits:
  - name: Diabolical Restoration
    desc: If the erinyes dies outside the Nine Hells, its body disappears in sulphurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - name: Magic Resistance
    desc: The erinyes has Advantage on saving throws against spells and other magical effects.
  - name: Magic Rope
    desc: The erinyes has a magic rope. While bearing it, the erinyes can use the Entangling Rope action. The rope has AC 20, HP 90, and Immunity to Poison and Psychic damage. The rope turns to dust if reduced to 0 Hit Points, if it is 5+ feet away from the erinyes for 1 hour or more, or if the erinyes dies. If the rope is damaged or destroyed, the erinyes can fully restore it when finishing a Short or Long Rest.
actions:
  - name: Multiattack
    desc: The erinyes makes three Withering Sword attacks and can use Entangling Rope.
  - name: Withering Sword
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 13 (2d8 + 4) Slashing damage plus 11 (2d10) Necrotic damage."
  - name: Entangling Rope (Requires Magic Rope)
    desc: "*Strength Saving Throw:* DC 16, one creature the erinyes can see within 120 feet. *Failure:* 14 (4d6) Force damage, and the target has the Restrained condition until the rope is destroyed, the erinyes uses a Bonus Action to release the target, or the erinyes uses Entangling Rope again."
reactions:
  - name: Parry
    desc: "Trigger: The erinyes is hit by a melee attack roll while holding a weapon. _Response:_ The erinyes adds 4 to its AC against that attack, possibly causing it to miss."
```
