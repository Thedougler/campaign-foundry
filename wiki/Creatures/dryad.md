---
title: Dryad
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fey
size: Medium
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dryad
size: Medium
type: fey
alignment: Neutral
ac: 16
hp: 22
hit_dice: 5d8
modifier: 1
speed: 30 ft.
stats: [ 10, 12, 11, 14, 15, 18 ]
skillsaves:
  - perception: 4
  - stealth: 5
senses: Darkvision 60 ft., passive Perception 14
languages: Elvish, Sylvan
cr: "1"
traits:
  - name: Magic Resistance
    desc: The dryad has Advantage on saving throws against spells and other magical effects.
  - name: Speak with Beasts and Plants
    desc: The dryad can communicate with Beasts and Plants as if they shared a language.
actions:
  - name: Multiattack
    desc: The dryad makes one Vine Lash or Thorn Burst attack, and it can use Spellcasting to cast *Charm Monster*.
  - name: Vine Lash
    desc: "*Melee Attack Roll:* +6, reach 10 ft. *Hit:* 8 (1d8 + 4) Slashing damage."
  - name: Thorn Burst
    desc: "*Ranged Attack Roll:* +6, range 60 ft. *Hit:* 7 (1d6 + 4) Piercing damage."
  - name: Spellcasting
    desc: |-
      The dryad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14):

      **At will:** *Animal Friendship*, *Charm Monster* (lasts 24 hours; ends early if the dryad casts the spell again), *Druidcraft*

      **1/day each:** *Entangle*, *Pass without Trace*
bonus_actions:
  - name: Tree Stride
    desc: If within 5 feet of a Large or bigger tree, the dryad teleports to an unoccupied space within 5 feet of a second Large or bigger tree that is within 60 feet of the previous tree.
```
