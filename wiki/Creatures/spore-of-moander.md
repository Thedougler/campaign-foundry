---
title: Spore of Moander
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Plant
size: Huge
habitat:
  - Forest
  - Swamp
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Spore of Moander
size: Huge
type: plant
alignment: Chaotic Evil
ac: 19
hp: 230
hit_dice: 20d12 + 100
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 22, 9, 20, 4, 10, 6 ]
saves:
  - str: 10
  - con: 9
damage_resistances: acid, cold, lightning
damage_immunities: fire, poison
condition_immunities: blinded, deafened, exhaustion, paralysed, poisoned, prone
senses: Blindsight 120 ft., passive Perception 10
languages: understands Abyssal but can't speak
cr: "12"
traits:
  - name: Explosive Core
    desc: When the spore is subjected to Fire damage, each creature in a 5-foot Emanation originating from the spore takes 7 (2d6) Fire damage.
  - name: Rolling Mass
    desc: The spore doesn't need to expend extra movement to move through Difficult Terrain.
actions:
  - name: Multiattack
    desc: The spore makes four Tendril attacks. Alternatively, it makes two Tendril attacks and uses Consume once.
  - name: Tendril
    desc: "*Melee Attack Roll:* +10, reach 20 ft. *Hit:* 11 (1d10 + 6) Piercing damage plus 10 (3d6) Acid damage. If the target is Large or smaller, the spore pulls the target 5 feet straight toward itself."
  - name: Consume
    desc: "*Strength Saving Throw:* DC 18, one Large or smaller creature within 5 feet. *Failure:* The target is pulled into the spore's space and has the Grappled condition (escape DC 16). Until the grapple ends, the target has the Blinded and Restrained conditions, and it takes 17 (5d6) Acid damage at the start of each of the spore's turns. When the spore moves, the Grappled target moves with it, costing it no extra movement. The spore can have one Large creature or up to nine Medium or smaller creatures Grappled at a time."
```
