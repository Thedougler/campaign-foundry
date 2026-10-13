---
title: Hexton Modron
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Construct
size: Huge
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hexton Modron
size: Huge
type: construct
alignment: typically Lawful Neutral
ac: 17
ac_class: natural armour
hp: 209
hit_dice: 22d12 + 66
modifier: 3
speed: 40 ft., fly 40 ft. (hover)
stats: [ 19, 16, 17, 19, 17, 15 ]
saves:
  - int: 9
  - wis: 8
skillsaves:
  - perception: 13
damage_resistances: lightning, psychic
condition_immunities: charmed, frightened
senses: truesight 120 ft., passive Perception 23
languages: all, telepathy 120 ft.
cr: "13"
traits:
  - name: Axiomatic Mind
    desc: The hexton can't be compelled to act in a manner contrary to its nature or its instructions.
  - name: Combat Ready
    desc: The hexton has advantage on initiative rolls.
  - name: Disintegration
    desc: If the hexton dies, its body disintegrates into dust, leaving behind anything it was carrying.
  - name: Legendary Resistance (4/Day)
    desc: If the hexton fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The hexton makes one Pincer attack and two Tentacle attacks.
  - name: Pincer
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 13 (2d8 + 4) bludgeoning damage plus 10 (3d6) force damage. If the target is a creature, it must succeed on a DC 17 Constitution saving throw or have the incapacitated condition until the end of its next turn."
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 15 (2d10 + 4) piercing damage, and if the target is a Medium or smaller creature, it has the grappled condition (escape DC 14). Until this grapple ends, the hexton can't use this tentacle against other targets. The hexton has six tentacles, each of which can grapple one target."
  - name: Spellcasting
    desc: |-
      The hexton casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 17):

      **At will:** *detect magic*, *dispel magic*, *mending* (as an action)

      **1/day each:** *plane shift* (self only), *protection from evil and good*
reactions:
  - name: Counter Magic
    desc: The hexton attempts to interrupt a creature it can see that is casting a spell. If the spell is 3rd level or lower, it fails and has no effect. If the spell is 4th level or higher, the hexton makes an Intelligence check (DC 10 + the spell's level). On a success, the spell fails and has no effect.
  - name: Lightning Rebuke
    desc: When a creature within 120 feet of the hexton damages it, the hexton magically retaliates with an arc of lightning. The creature must make a DC 17 Dexterity saving throw, taking 11 (2d10) lightning damage on a failed save, or half as much damage on a successful one.
```
