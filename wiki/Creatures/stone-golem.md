---
title: Stone Golem
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Construct
size: Large
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Stone Golem
size: Large
type: construct
alignment: Unaligned
ac: 18
hp: 220
hit_dice: 21d10 + 105
modifier: 3
speed: 30 ft.
stats: [ 22, 9, 20, 3, 11, 1 ]
damage_immunities: poison, psychic
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: Darkvision 120 ft., passive Perception 10
languages: understands Common plus two other languages but can't speak
cr: "10"
traits:
  - name: Immutable Form
    desc: The golem can't shape-shift.
  - name: Magic Resistance
    desc: The golem has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The golem makes two attacks, using Slam or Force Bolt in any combination.
  - name: Slam
    desc: "*Melee Attack Roll:* +10, reach 5 ft. *Hit:* 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage."
  - name: Force Bolt
    desc: "*Ranged Attack Roll:* +9, range 120 ft. *Hit:* 22 (4d10) Force damage."
bonus_actions:
  - name: Slow (Recharge 5–6)
    desc: |
      The golem casts the *Slow* spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).
```
