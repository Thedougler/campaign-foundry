---
title: Helmed Horror Detention Drone
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Helmed Horror Detention Drone
size: Medium
type: construct
alignment: Neutral
ac: 20
ac_class: plate armour, shield
hp: 60
hit_dice: 8d8 + 24
modifier: 1
speed: 30 ft., fly 30 ft. (hover)
stats: [ 18, 13, 16, 10, 10, 10 ]
skillsaves:
  - perception: 4
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks that aren't adamantine
damage_immunities: force, necrotic, poison
condition_immunities: blinded, charmed, deafened, frightened, paralysed, petrified, poisoned, stunned
gear:
  - longsword
senses: blindsight 60 ft. (blind beyond this radius), passive Perception 14
languages: understands the languages of its creator but can't speak
cr: "4"
traits:
  - name: Magic Resistance
    desc: The drone has advantage on saving throws against spells and other magical effects.
  - name: Spell Immunity
    desc: The drone is immune to three spells chosen by its creator. Typical immunities include *fireball*, *heat metal*, and *lightning bolt*.
actions:
  - name: Multiattack
    desc: The drone makes two longsword attacks.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands."
  - name: Detention Orb
    desc: The drone launches a tiny orb of magical force at a creature it can see within 30 feet of itself. The creature must succeed on a DC 15 Constitution saving throw or be encased in the orb, which expands to a size just large enough to contain the creature. While encased, the creature doesn't need to breathe, eat, or drink, and it doesn't age. Nothing can pass through the orb, nor can any creature teleport or use planar travel to enter or exit the orb. As a bonus action, the drone can move the orb and its contents up to 30 feet in any direction. A successful casting of the *Dispel Magic* spell on the orb (DC 15) destroys it. The orb otherwise remains intact until the drone spends an action to end the effect or the drone is destroyed. A drone can have only one detention orb active at a time; if the drone creates a detention orb when it already has one active, the first orb disappears, freeing the creature inside.
```
