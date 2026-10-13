---
title: Animated Armor Detention Drone
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Animated Armour Detention Drone
size: Medium
type: construct
alignment: Unaligned
ac: 18
ac_class: natural armour
hp: 33
hit_dice: 6d8 + 6
modifier: 0
speed: 30 ft., fly 30 ft. (hover)
stats: [ 14, 11, 13, 1, 3, 1 ]
damage_immunities: poison, psychic
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, paralysed, petrified, poisoned
senses: blindsight 60 ft. (blind beyond this radius), passive Perception 6
cr: "1"
traits:
  - name: Antimagic Susceptibility
    desc: The drone is incapacitated while in the area of an *antimagic field*. If targeted by *dispel magic*, the drone must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute.
  - name: False Appearance
    desc: While the drone remains motionless, it is indistinguishable from a normal suit of drone.
actions:
  - name: Multiattack
    desc: The drone makes two melee attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) bludgeoning damage."
  - name: Detention Orb
    desc: The drone launches a tiny orb of magical force at a creature it can see within 30 feet of itself. The creature must succeed on a DC 15 Constitution saving throw or be encased in the orb, which expands to a size just large enough to contain the creature. While encased, the creature doesn't need to breathe, eat, or drink, and it doesn't age. Nothing can pass through the orb, nor can any creature teleport or use planar travel to enter or exit the orb. As a bonus action, the drone can move the orb and its contents up to 30 feet in any direction. A successful casting of the *Dispel Magic* spell on the orb (DC 15) destroys it. The orb otherwise remains intact until the drone spends an action to end the effect or the drone is destroyed. A drone can have only one detention orb active at a time; if the drone creates a detention orb when it already has one active, the first orb disappears, freeing the creature inside.
```
