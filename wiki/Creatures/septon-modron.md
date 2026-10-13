---
title: Septon Modron
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Septon Modron
size: Large
type: construct
alignment: typically Lawful Neutral
ac: 17
ac_class: natural armour
hp: 204
hit_dice: 24d10 + 72
modifier: 2
speed: 30 ft., fly 30 ft. (hover), swim 30 ft.
stats: [ 18, 15, 17, 18, 16, 14 ]
saves:
  - int: 8
  - wis: 7
skillsaves:
  - perception: 11
damage_resistances: lightning, psychic
senses: truesight 120 ft., passive Perception 21
languages: all, telepathy 120 ft.
cr: "12"
traits:
  - name: Axiomatic Mind
    desc: The septon can't be compelled to act in a manner contrary to its nature or its instructions.
  - name: Combat Ready
    desc: The septon has advantage on initiative checks.
  - name: Disintegration
    desc: If the septon dies, its body disintegrates into dust, leaving behind anything it was carrying.
actions:
  - name: Multiattack
    desc: The septon makes four Tentacle attacks and uses Lightning Network or Spellcasting.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 15 (2d10 + 4) piercing damage, and if the target is a Medium or smaller creature, it has the grappled condition (escape DC 14). Until this grapple ends, the septon can't use this tentacle against other targets. The septon has seven tentacles, each of which can grapple one target."
  - name: Lightning Network
    desc: The septon conjures a field of electricity that fills a 30-foot cube originating from itself before dissipating. Each creature in that area must make a DC 16 Dexterity saving throw. On a failed save, a creature takes 33 (6d10) lightning damage and has the stunned condition for 1 minute. On a successful save, a creature takes half as much damage only. A stunned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Spellcasting
    desc: |-
      The septon casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *detect magic*, *dispel magic*, *mending* (as an action)

      **1/day each:** *plane shift* (self only), *protection from evil and good*, *sending*
```
