---
title: Dullahan
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Undead
size: Medium
habitat:
  - Grassland
  - Hill
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dullahan
size: Medium
type: undead
alignment: Chaotic Evil
ac: 15
hp: 127
hit_dice: 17d8 + 51
modifier: 2
speed: 30 ft.
stats: [ 18, 14, 16, 11, 15, 16 ]
saves:
  - con: 7
skillsaves:
  - perception: 6
damage_resistances: cold, necrotic, poison
condition_immunities: blinded, charmed, deafened, frightened, poisoned
senses: Truesight 120 ft., passive Perception 16
languages: understands Common plus one other language but can't speak
cr: "10"
traits:
  - name: Mounted Adept
    desc: While mounted and without the Incapacitated condition, the dullahan and its mount have Advantage on Dexterity saving throws, and the dullahan can force an attack targeted at its mount to target the dullahan instead.
  - name: Terrorizer
    desc: The dullahan has Advantage on attack rolls against targets that have the Frightened condition.
actions:
  - name: Multiattack
    desc: The dullahan makes two attacks, using Beheading Blade or Fiery Skull in any combination, and uses Headless Wail.
  - name: Beheading Blade
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 9 (1d10 + 4) Slashing damage plus 11 (2d10) Necrotic damage. If the target is reduced to 0 Hit Points by this attack, it dies and its head is lopped off. The head rises as a Death's Head in the space of the target's corpse or in the nearest unoccupied space. The head is under the dullahan's control. The dullahan can control no more than seven heads at a time."
  - name: Fiery Skull
    desc: "*Ranged Attack Roll:* +7, range 120 ft. *Hit:* 18 (4d8) Fire damage."
  - name: Headless Wail
    desc: "*Constitution Saving Throw:* DC 15, up to three creatures within 120 feet of the dullahan that aren't Constructs or Undead. *Failure:* 13 (2d12) Psychic damage, and the target has the Frightened condition until the start of the dullahan's next turn. *Success:* Half damage only."
```
