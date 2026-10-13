---
title: Nonaton Modron
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nonaton Modron
size: Large
type: construct
alignment: typically Lawful Neutral
ac: 16
ac_class: natural armour
hp: 161
hit_dice: 19d10 + 57
modifier: 1
speed: 30 ft., fly 30 ft. (hover)
stats: [ 18, 13, 16, 16, 16, 13 ]
saves:
  - int: 7
  - wis: 7
skillsaves:
  - investigation: 7
  - perception: 11
senses: truesight 120 ft., passive Perception 21
languages: Modron, telepathy 120 ft.
cr: "10"
traits:
  - name: Axiomatic Mind
    desc: The nonaton can't be compelled to act in a manner contrary to its nature or its instructions.
  - name: Combat Ready
    desc: The nonaton has advantage on initiative rolls.
  - name: Disintegration
    desc: If the nonaton dies, its body disintegrates into dust, leaving behind anything it was carrying.
actions:
  - name: Multiattack
    desc: The nonaton makes three Arm attacks and uses Pillar of Truth or Spellcasting.
  - name: Arm
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 13 (2d8 + 4) piercing damage, and if the target is a Medium or smaller creature, it has the grappled condition (escape DC 14). Until this grapple ends, the nonaton can't use this arm against other targets. The nonaton has nine arms, each of which can grapple one target."
  - name: Pillar of Truth
    desc: The nonaton chooses a point on the ground that it can see within 60 feet of itself. A 60-foot-tall, 20-foot-radius cylinder of magical force rises from that point. Each creature in that area must make a DC 15 Dexterity saving throw. On a failed save, a creature takes 21 (6d6) force damage, and the creature reverts to its original form (if it's in a different form) and can't assume a different form until the end of its next turn. On a successful save, a creature takes half as much damage only.
  - name: Spellcasting
    desc: |-
      The nonaton casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *detect magic*, *dispel magic*, *mending* (as an action)

      **1/day each:** *plane shift* (self only), *protection from evil and good*
```
