---
title: Yuan-ti Malison (Type 1)
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Medium
habitat:
  - Desert
  - Forest
  - Swamp
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yuan-ti Malison (Type 1)
size: Medium
type: monstrosity
alignment: Neutral Evil
ac: 12
hp: 66
hit_dice: 12d8 + 12
modifier: 2
speed: 30 ft., climb 30 ft. (snake form only)
stats: [ 16, 14, 13, 14, 16, 12 ]
skillsaves:
  - stealth: .nan
damage_immunities: poison
condition_immunities: poisoned
senses: Darkvision 60 ft., passive Perception 13
languages: Abyssal, Common, Draconic
cr: "3"
traits:
  - name: Magic Resistance
    desc: The yuan-ti has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The yuan-ti makes two attacks, using Bite or Poison Ray in any combination, and it can use Spellcasting to cast *Suggestion* if available.
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 5 (1d4 + 3) Piercing damage plus 7 (2d6) Poison damage."
  - name: Poison Ray (Yuan-ti Form Only)
    desc: "*Ranged Attack Roll:* +5, range 120 ft. *Hit:* 12 (2d8 + 3) Poison damage."
  - name: Spellcasting (Yuan-ti Form Only)
    desc: |-
      The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *Animal Friendship* (snakes only)

      **2/day:** *Suggestion*
bonus_actions:
  - name: Shape-Shift
    desc: The yuan-ti shape-shifts into a Medium snake or returns to its true form. If it dies, it stays in its current form. The yuan-ti's game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.
```
