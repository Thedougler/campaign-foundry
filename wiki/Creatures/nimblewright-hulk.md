---
title: Nimblewright Hulk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Construct
size: Large
habitat:
  - Urban
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nimblewright Hulk
size: Large
type: construct
alignment: Neutral
ac: 18
hp: 104
hit_dice: 11d10 + 44
modifier: 7
speed: 50 ft.
stats: [ 19, 18, 19, 10, 12, 6 ]
saves:
  - str: 7
  - dex: 7
skillsaves:
  - acrobatics: 7
  - perception: 7
damage_immunities: poison, psychic
condition_immunities: charmed, exhaustion, paralysed, petrified, poisoned
senses: Darkvision 60 ft., passive Perception 17
languages: understands Common plus one other language but can't speak
cr: "7"
traits:
  - name: Evasion
    desc: If the nimblewright is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the save and only half damage if it fails, provided it doesn't have the Incapacitated condition.
  - name: Magic Resistance
    desc: The nimblewright has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The nimblewright makes four attacks, using Halting Slam or Radiant Ray in any combination.
  - name: Halting Slam
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 15 (2d10 + 4) Bludgeoning damage, and the target's Speed is reduced to 0 until the end of its next turn."
  - name: Radiant Ray
    desc: "*Ranged Attack Roll:* +7, range 60 ft. *Hit:* 14 (4d6) Radiant damage."
```
