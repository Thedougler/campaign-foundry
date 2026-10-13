---
title: Nimblewright Steed
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
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
name: Nimblewright Steed
size: Large
type: construct
alignment: Neutral
ac: 16
hp: 47
hit_dice: 5d10 + 20
modifier: 6
speed: 60 ft.
stats: [ 17, 18, 18, 6, 10, 6 ]
saves:
  - dex: 6
damage_immunities: poison, psychic
condition_immunities: charmed, exhaustion, paralysed, petrified, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: understands Common plus one other language but can't speak
cr: "2"
traits:
  - name: Evasion
    desc: If the nimblewright is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the save and only half damage if it fails, provided it doesn't have the Incapacitated condition.
actions:
  - name: Hooves
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 7 (1d8 + 3) Bludgeoning damage. If the nimblewright moved at least 20 feet straight toward the target immediately before the hit, the target takes an extra 4 (1d8) Bludgeoning damage and, if it is Huge or smaller, has the Prone condition."
bonus_actions:
  - name: Nimble Movement
    desc: The nimblewright takes the Disengage action.
```
