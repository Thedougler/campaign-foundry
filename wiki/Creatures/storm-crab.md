---
title: Storm Crab
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Storm Crab
size: Gargantuan
type: monstrosity
alignment: Unaligned
ac: 18
ac_class: natural armour
hp: 155
hit_dice: 10d20 + 50
modifier: 0
speed: 40 ft., swim 60 ft.
stats: [ 23, 10, 21, 5, 14, 9 ]
saves:
  - str: 10
  - con: 9
skillsaves:
  - perception: 6
damage_resistances: cold, fire, lightning
senses: blindsight 60 ft., passive Perception 16
languages: understands Giant but can't speak
cr: "11"
traits:
  - name: Amphibious
    desc: The crab can breathe air and water.
actions:
  - name: Multiattack
    desc: The crab makes two Claw attacks and one Stinger attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +10 to hit, reach 15 ft., one target. *Hit:* 19 (3d8 + 6) bludgeoning damage. If the target is a Huge or smaller creature, it has the grappled condition (escape DC 16). The crab has four claws, each of which can grapple one target."
  - name: Stinger
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one creature. *Hit:* 22 (3d10 + 6) piercing damage, and the target must succeed on a DC 17 Constitution saving throw or have the poisoned and paralysed conditions for 1 minute. The affected creature can repeat the saving throw at the end of each of its turns, ending both the poisoned and paralysed conditions on itself on a success."
  - name: Water Jet (Recharge 5–6)
    desc: The crab exhales water in a 150-foot line that is 10 feet wide. Each creature in that area must make a DC 17 Dexterity saving throw. On a failed save, a creature takes 27 (6d8) bludgeoning damage, is pushed up to 30 feet from the crab, and has the prone condition. On a successful save, a creature takes half as much damage only.
```
