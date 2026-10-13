---
title: Octon Modron
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Octon Modron
size: Large
type: construct
alignment: typically Lawful Neutral
ac: 18
ac_class: natural armour
hp: 187
hit_dice: 22d10 + 66
modifier: 2
speed: 30 ft., fly 30 ft. (hover), swim 30 ft.
stats: [ 18, 14, 17, 17, 16, 14 ]
saves:
  - int: 7
  - wis: 7
skillsaves:
  - perception: 11
damage_resistances: psychic
senses: truesight 120 ft., passive Perception 21
languages: Modron, telepathy 120 ft.
cr: "11"
traits:
  - name: Axiomatic Mind
    desc: The octon can't be compelled to act in a manner contrary to its nature or its instructions.
  - name: Combat Ready
    desc: The octon has advantage on initiative checks.
  - name: Disintegration
    desc: If the octon dies, its body disintegrates into dust, leaving behind anything it was carrying.
actions:
  - name: Multiattack
    desc: The octon makes three Tentacle attacks.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 14 (3d6 + 4) bludgeoning damage plus 9 (2d8) lightning damage."
  - name: Whirlwind of Tentacles (Recharge 5–6)
    desc: The octon rapidly extends and spins its ring of tentacles. Each creature within 20 feet of the octon must succeed on a DC 16 Strength saving throw or be pulled up to 10 feet in a straight line toward the octon. Then, the octon makes two Tentacle attacks against each creature within 10 feet of itself.
  - name: Spellcasting
    desc: |-
      The octon casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *detect magic*, *dispel magic*, *mending* (as an action)

      **1/day each:** *plane shift* (self only), *protection from evil and good*
```
