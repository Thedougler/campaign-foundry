---
title: Aberrant Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aberrant Spirit
size: Medium
type: aberration
alignment: Neutral
ac_class: 11 + the spell's level
hp: 40 + 10 for each spell level above 4
modifier: 0
speed: 30 ft., fly 30 ft. (hover; Beholderkin only)
stats: [ 16, 10, 15, 16, 10, 6 ]
damage_immunities: psychic
senses: Darkvision 60 ft., passive Perception 10
languages: Deep Speech, understands the languages you know
traits:
  - name: Regeneration (Slaad Only)
    desc: The spirit regains 5 Hit Points at the start of its turn if it has at least 1 Hit Point.
  - name: Whispering Aura (Mind Flayer Only)
    desc: At the start of each of the spirit's turns, the spirit emits psionic energy if it doesn't have the Incapacitated condition. *Wisdom Saving Throw:* DC equals your spell save DC, each creature (other than you) within 5 feet of the spirit. *Failure:* 2d6 Psychic damage.
actions:
  - name: Multiattack
    desc: The spirit makes a number of attacks equal to half this spell's level (round down).
  - name: Claw (Slaad Only)
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d10 + 3 + the spell's level Slashing damage, and the target can't regain Hit Points until the start of the spirit's next turn."
  - name: Eye Ray (Beholderkin Only)
    desc: "*Ranged Attack Roll:* Bonus equals your spell attack modifier, range 150 ft. *Hit:* 1d8 + 3 + the spell's level Psychic damage."
  - name: Psychic Slam (Mind Flayer Only)
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d8 + 3 + the spell's level Psychic damage."
```
