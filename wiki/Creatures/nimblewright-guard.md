---
title: Nimblewright Guard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Construct
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nimblewright Guard
size: Medium
type: construct
alignment: Neutral
ac: 16
hp: 67
hit_dice: 9d8 + 27
modifier: 6
speed: 60 ft.
stats: [ 12, 18, 16, 8, 12, 6 ]
saves:
  - dex: 6
skillsaves:
  - acrobatics: 6
  - perception: 3
damage_immunities: poison, psychic
condition_immunities: charmed, exhaustion, paralysed, petrified, poisoned
gear:
  - scimitar
senses: Darkvision 60 ft., passive Perception 13
languages: understands Common plus one other language but can't speak
cr: "3"
traits:
  - name: Evasion
    desc: If the nimblewright is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the save and only half damage if it fails, provided it doesn't have the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The nimblewright makes three attacks, using Scimitar or Clockwork Crossbow in any combination.
  - name: Scimitar
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 7 (1d6 + 4) Slashing damage."
  - name: Clockwork Crossbow
    desc: "*Ranged Attack Roll:* +6, range 80/320 ft. *Hit:* 8 (1d8 + 4) Piercing damage."
reactions:
  - name: Parry
    desc: "Trigger: The nimblewright is hit by a melee attack roll while holding a weapon. _Response:_ The nimblewright adds 2 to its AC against that attack, potentially causing it to miss."
```
