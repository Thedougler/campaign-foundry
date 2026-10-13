---
title: Advanced Detention Drone
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Advanced Detention Drone
size: Large
type: construct
alignment: Unaligned
ac: 17
ac_class: natural armour
hp: 142
hit_dice: 15d10 + 60
modifier: -1
speed: 30 ft., fly 30 ft. (hover)
stats: [ 18, 8, 18, 7, 10, 3 ]
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: blindsight 10 ft., darkvision 60 ft., passive Perception 10
languages: understands commands given in any language but can't speak
cr: "7"
traits:
  - name: Regeneration
    desc: The drone regains 10 hit points at the start of its turn if it has at least 1 hit point.
  - name: Spell Storing
    desc: A spellcaster who wears the drone's amulet can cause the drone to store one spell of 4th level or lower. To do so, the wearer must cast the spell on the drone. The spell has no effect but is stored within the drone. When commanded to do so by the wearer or when a situation arises that was predefined by the spellcaster, the drone casts the stored spell with any parameters set by the original caster, requiring no components. When the spell is cast or a new spell is stored, any previously stored spell is lost.
actions:
  - name: Multiattack
    desc: The drone makes two fist attacks.
  - name: Fist
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) bludgeoning damage."
  - name: Detention Orb
    desc: The drone launches a tiny orb of magical force at a creature it can see within 30 feet of itself. The creature must succeed on a DC 15 Constitution saving throw or be encased in the orb, which expands to a size just large enough to contain the creature. While encased, the creature doesn't need to breathe, eat, or drink, and it doesn't age. Nothing can pass through the orb, nor can any creature teleport or use planar travel to enter or exit the orb. As a bonus action, the drone can move the orb and its contents up to 30 feet in any direction. A successful casting of the *Dispel Magic* spell on the orb (DC 15) destroys it. The orb otherwise remains intact until the drone spends an action to end the effect or the drone is destroyed. A drone can have only one detention orb active at a time; if the drone creates a detention orb when it already has one active, the first orb disappears, freeing the creature inside.
reactions:
  - name: Shield
    desc: When a creature makes an attack against the wearer of the drone's amulet, the drone grants a +2 bonus to the wearer's AC if the drone is within 5 feet of the wearer.
```
