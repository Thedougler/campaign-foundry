---
title: Manes Vaporspawn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fiend
size: Medium
habitat:
  - Planar (Abyss)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Manes Vaporspawn
size: Medium
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 13
hp: 19
hit_dice: 3d8 + 6
modifier: 1
speed: 30 ft.
stats: [ 14, 12, 15, 5, 8, 3 ]
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, grappled, poisoned, restrained
senses: Darkvision 60 ft., passive Perception 9
languages: understands Abyssal but can't speak
cr: "1"
traits:
  - name: Contortionist
    desc: The manes can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Sickening Vapours
    desc: "*Constitution Saving Throw:* DC 12, each creature in a 5-foot Emanation originating from the manes at the end of the manes's turn. *Failure:* The target has the Incapacitated condition until the end of its next turn. *Success:* The target is immune to this manes's Sickening Vapours for 24 hours."
actions:
  - name: Claw
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Slashing damage plus 5 (2d4) Necrotic damage."
bonus_actions:
  - name: Shadow Stealth
    desc: While in Dim Light or Darkness, the manes takes the Hide action.
```
