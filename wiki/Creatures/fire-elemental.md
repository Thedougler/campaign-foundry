---
title: Fire Elemental
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Elemental
size: Large
habitat:
  - Desert
  - Planar (Fire)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fire Elemental
size: Large
type: elemental
alignment: Neutral
ac: 13
hp: 93
hit_dice: 11d10 + 33
modifier: 3
speed: 50 ft.
stats: [ 10, 17, 16, 6, 10, 7 ]
damage_resistances: bludgeoning, piercing, slashing
damage_immunities: fire, poison
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Darkvision 60 ft., passive Perception 10
languages: Primordial (Ignan)
cr: "5"
traits:
  - name: Fire Aura
    desc: At the end of each of the elemental's turns, each creature in a 10-foot Emanation originating from the elemental takes 5 (1d10) Fire damage. Creatures and flammable objects in the Emanation start burning.
  - name: Fire Form
    desc: The elemental can move through a space as narrow as 1 inch without expending extra movement to do so, and it can enter a creature's space and stop there. The first time it enters a creature's space on a turn, that creature takes 5 (1d10) Fire damage.
  - name: Illumination
    desc: The elemental sheds Bright Light in a 30-foot radius and Dim Light for an additional 30 feet.
  - name: Water Susceptibility
    desc: The elemental takes 3 (1d6) Cold damage for every 5 feet the elemental moves in water or for every gallon of water splashed on it.
actions:
  - name: Multiattack
    desc: The elemental makes two Burn attacks.
  - name: Burn
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 10 (2d6 + 3) Fire damage. If the target is a creature or a flammable object, it starts burning."
```
