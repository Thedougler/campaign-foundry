---
title: Decaton Modron
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Decaton Modron
size: Large
type: construct
alignment: typically Lawful Neutral
ac: 16
ac_class: natural armour
hp: 144
hit_dice: 17d10 + 51
modifier: 1
speed: 30 ft., fly 30 ft. (hover)
stats: [ 18, 12, 16, 15, 15, 11 ]
saves:
  - int: 5
  - wis: 5
skillsaves:
  - perception: 8
condition_immunities: charmed, frightened
senses: truesight 120 ft., passive Perception 18
languages: Modron, telepathy 120 ft.
cr: "8"
traits:
  - name: Axiomatic Mind
    desc: The decaton can't be compelled to act in a manner contrary to its nature or its instructions.
  - name: Combat Ready
    desc: The decaton has advantage on initiative rolls.
  - name: Disintegration
    desc: If the decaton dies, its body disintegrates into dust, leaving behind anything it was carrying.
actions:
  - name: Multiattack
    desc: The decaton makes three Tentacle attacks.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 15 (2d10 + 4) piercing damage, and if the target is a Medium or smaller creature, it has the grappled condition (escape DC 14). Until this grapple ends, the decaton can't use this tentacle against other targets. The decaton has ten tentacles, each of which can grapple one target."
  - name: Lightning Rays (Recharge 6)
    desc: The decaton unleashes a barrage of lightning bolts from its eyes. Each creature within 30 feet of the decaton must make a DC 13 Dexterity saving throw, taking 38 (7d10) lightning damage on a failed save, or half as much damage on a successful save.
  - name: Spellcasting
    desc: |-
      The decaton casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *detect magic*, *dispel magic*, *mending* (as an action)

      **1/day each:** *plane shift* (self only), *protection from evil and good*
```
