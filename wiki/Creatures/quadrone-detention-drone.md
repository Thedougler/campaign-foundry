---
title: Quadrone Detention Drone
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
name: Quadrone Detention Drone
size: Medium
type: construct
alignment: Lawful Neutral
ac: 16
ac_class: natural armour
hp: 22
hit_dice: 4d8 + 4
modifier: 2
speed: 30 ft., fly 30 ft. (hover)
stats: [ 12, 14, 12, 10, 10, 11 ]
skillsaves:
  - perception: 2
gear:
  - shortbow
senses: truesight 120 ft., passive Perception 12
languages: Modron
cr: "1"
traits:
  - name: Axiomatic Mind
    desc: The drone can't be compelled to act in a manner contrary to its nature or its instructions.
  - name: Disintegration
    desc: If the drone dies, its body disintegrates into dust, leaving behind its weapons and anything else it was carrying.
actions:
  - name: Multiattack
    desc: The drone makes two fist attacks or four shortbow attacks.
  - name: Fist
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 3 (1d4 + 1) bludgeoning damage."
  - name: Shortbow
    desc: "*Ranged Weapon Attack:* +4 to hit, range 80/320 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage."
  - name: Detention Orb
    desc: The drone launches a tiny orb of magical force at a creature it can see within 30 feet of itself. The creature must succeed on a DC 15 Constitution saving throw or be encased in the orb, which expands to a size just large enough to contain the creature. While encased, the creature doesn't need to breathe, eat, or drink, and it doesn't age. Nothing can pass through the orb, nor can any creature teleport or use planar travel to enter or exit the orb. As a bonus action, the drone can move the orb and its contents up to 30 feet in any direction. A successful casting of the *Dispel Magic* spell on the orb (DC 15) destroys it. The orb otherwise remains intact until the drone spends an action to end the effect or the drone is destroyed. A drone can have only one detention orb active at a time; if the drone creates a detention orb when it already has one active, the first orb disappears, freeing the creature inside.
```
