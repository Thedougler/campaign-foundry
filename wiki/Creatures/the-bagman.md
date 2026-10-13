---
title: The Bagman
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Giant
size: Large
habitat: []
sourcebooks:
  - Van Richten's Guide to Ravenloft
---

## Statblock

```statblock
layout: Basic 5e Layout
name: The Bagman
size: Large
type: giant
alignment: Chaotic Evil
ac: 15
ac_class: natural armour
hp: 84
hit_dice: 8d10 + 40
modifier: 1
speed: 30 ft.
stats: [ 18, 13, 20, 7, 9, 7 ]
skillsaves:
  - perception: 2
senses: darkvision 60 ft., passive Perception 12
languages: Giant
cr: "5"
traits:
  - name: Keen Smell
    desc: The Bagman has advantage on Wisdom (Perception) checks that rely on smell.
  - name: Regeneration
    desc: The Bagman regains 10 hit points at the start of its turn. If the Bagman takes acid or fire damage, this trait doesn't function at the start of the Bagman's next turn. The Bagman dies only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Grappler
    desc: The Bagman has advantage on attack rolls against any creature grappled by it.
  - name: Amorphous
    desc: The Bagman can move through a space as narrow as 1 inch wide without squeezing.
  - name: Alien Mind
    desc: If a creature tries to read the Bagman's thoughts, that creature must succeed on a DC 8 Intelligence saving throw or be stunned for 1 minute. The stunned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
actions:
  - name: Multiattack
    desc: "The Bagman makes three attacks: one with its bite and two with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage."
```
