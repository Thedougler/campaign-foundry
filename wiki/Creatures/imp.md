---
title: Imp
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fiend
size: Tiny
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Imp
size: Tiny
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 13
hp: 21
hit_dice: 6d4 + 6
modifier: 3
speed: 20 ft., fly 40 ft.
stats: [ 6, 17, 13, 11, 12, 14 ]
skillsaves:
  - deception: 4
  - insight: 3
  - stealth: 5
damage_resistances: cold
damage_immunities: fire, poison
condition_immunities: poisoned
senses: Darkvision 120 ft. (unimpeded by magical Darkness), passive Perception 11
languages: Common, Infernal
cr: "1"
traits:
  - name: Magic Resistance
    desc: The imp has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Sting
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Piercing damage plus 7 (2d6) Poison damage."
  - name: Shape-Shift
    desc: The imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.
  - name: Invisibility
    desc: |
      The imp casts *Invisibility* on itself, requiring no spell components and using Charisma as the spellcasting ability.
```
