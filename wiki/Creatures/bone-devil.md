---
title: Bone Devil
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Fiend
size: Large
habitat:
  - Planar (Nine Hells)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bone Devil
size: Large
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 16
hp: 161
hit_dice: 17d10 + 68
modifier: 7
speed: 40 ft., fly 40 ft.
stats: [ 18, 16, 18, 13, 14, 16 ]
saves:
  - str: 8
  - int: 5
  - wis: 6
  - cha: 7
skillsaves:
  - deception: 7
  - insight: 6
damage_resistances: cold
damage_immunities: fire, poison
condition_immunities: poisoned
senses: Darkvision 120 ft. (unimpeded by magical Darkness), passive Perception 12
languages: Infernal; telepathy 120 ft.
cr: "9"
traits:
  - name: Diabolical Restoration
    desc: If the devil dies outside the Nine Hells, its body disappears in sulphurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - name: Magic Resistance
    desc: The devil has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The devil makes two Claw attacks and one Infernal Sting attack.
  - name: Claw
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 13 (2d8 + 4) Slashing damage."
  - name: Infernal Sting
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 15 (2d10 + 4) Piercing damage plus 18 (4d8) Poison damage, and the target has the Poisoned condition until the start of the devil's next turn. While Poisoned, the target can't regain Hit Points."
```
