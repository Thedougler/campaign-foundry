---
title: Nightgaunt
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Aberration
size: Large
habitat:
  - Mountain
  - Underdark
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nightgaunt
size: Large
type: aberration
alignment: Chaotic Evil
ac: 16
hp: 136
hit_dice: 16d10 + 48
modifier: 8
speed: 30 ft., fly 40 ft.
stats: [ 17, 20, 16, 13, 16, 10 ]
saves:
  - dex: 8
  - wis: 6
damage_resistances: lightning, poison, psychic
condition_immunities: blinded, deafened, exhaustion
senses: Blindsight 60 ft., passive Perception 13
languages: understands Deep Speech but can't speak
cr: "8"
traits:
  - name: Flyby
    desc: The nightgaunt doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
actions:
  - name: Multiattack
    desc: The nightgaunt makes two attacks, using Claw or Barb in any combination. It can replace one attack with a use of Ascend.
  - name: Claw
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13)."
  - name: Barb
    desc: "*Ranged Attack Roll:* +8, range 60 ft. *Hit:* 21 (6d6) Piercing damage, and the target has the Poisoned condition until the end of its next turn."
  - name: Ascend
    desc: The nightgaunt flies upward in a straight line, moving up to its Fly Speed. If the nightgaunt is grappling a creature, it ignores the extra movement cost to carry the creature with it.
bonus_actions:
  - name: Tickle
    desc: "*Wisdom Saving Throw:* DC 16, one creature Grappled by the nightgaunt. *Failure:* The target has the Incapacitated condition until the start of the nightgaunt's next turn."
```
