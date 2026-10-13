---
title: Frost Worm
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Frost Worm
size: Gargantuan
type: monstrosity
alignment: Unaligned
ac: 18
ac_class: natural armour
hp: 264
hit_dice: 16d20 + 96
modifier: -1
speed: 40 ft., burrow 30 ft.
stats: [ 28, 8, 22, 1, 5, 5 ]
saves:
  - con: 12
  - wis: 3
damage_vulnerabilities: fire
damage_immunities: cold
senses: blindsight 30 ft., tremorsense 60 ft., passive Perception 7
cr: "17"
traits:
  - name: Freezing Body
    desc: A creature that touches the worm or hits it with a melee attack while within 5 feet of it takes 10 (3d6) cold damage.
  - name: Death Burst
    desc: When the worm dies, it explodes in a burst of frigid energy. Each creature within 60 feet of it must make a DC 20 Dexterity saving throw, taking 28 (8d6) cold damage on a failed save, or half as much damage on a successful one. Creatures inside the worm when it dies automatically fail this saving throw.
  - name: Tunneler
    desc: The worm can burrow through solid rock at half its burrowing speed and leaves a 10-foot-diameter tunnel in its wake.
actions:
  - name: Multiattack
    desc: The worm makes two bite attacks, or uses its Trill and makes a bite attack.
  - name: Bite
    desc: |-
      *Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 22 (3d8 + 9) piercing damage plus 10 (3d6) cold damage. If the target is a Large or smaller creature, it must succeed on a DC 20 Dexterity saving throw or be swallowed by the worm. A swallowed creature is blinded and restrained, has total cover against attacks and other effects outside the worm, and takes 10 (3d6) acid damage and 10 (3d6) cold damage at the start of each of the worm's turns.

      If the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a DC 20 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the worm.
  - name: Trill
    desc: The frost worm emits a haunting cry. Each creature within 60 feet of the worm that can hear it must succeed on a DC 20 Wisdom saving throw or be stunned for 1 minute. A creature can repeat the saving throw each time it takes damage and at the end of each of its turns, ending the effect on itself on a success. Once a creature successfully saves against this effect, or if this effect ends for it, that creature is immune to the Trill of all frost worms for the next 24 hours. Frost worms are immune to this effect.
```
