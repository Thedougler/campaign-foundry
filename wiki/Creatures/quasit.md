---
title: Quasit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fiend
size: Tiny
habitat:
  - Planar (Abyss)
sourcebooks:
  - Monster Manual (2025)
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Quasit
size: Tiny
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 13
hp: 25
hit_dice: 10d4
modifier: 3
speed: 40 ft.
stats: [ 5, 17, 10, 7, 10, 10 ]
skillsaves:
  - stealth: 5
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: Darkvision 120 ft., passive Perception 10
languages: Abyssal, Common
cr: "1"
traits:
  - name: Magic Resistance
    desc: The quasit has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Rend
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 5 (1d4 + 3) Slashing damage, and the target has the Poisoned condition until the start of the quasit's next turn."
  - name: Scare (1/Day)
    desc: "*Wisdom Saving Throw:* DC 10, one creature within 20 feet. *Failure:* The target has the Frightened condition. At the end of each of its turns, the target repeats the save, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
  - name: Shape-Shift
    desc: The quasit shape-shifts to resemble a bat (Speed 10 ft., Fly 40 ft.), a centipede (40 ft., Climb 40 ft.), or a toad (40 ft., Swim 40 ft.), or it returns to its true form. Its game statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.
  - name: Invisibility
    desc: |
      The quasit casts *Invisibility* on itself, requiring no spell components and using Charisma as the spellcasting ability.
```
