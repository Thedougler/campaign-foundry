---
title: Core Spawn Worm
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Aberration
size: Gargantuan
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Core Spawn Worm
size: Gargantuan
type: aberration
alignment: Chaotic Evil
ac: 18
ac_class: natural armour
hp: 279
hit_dice: 18d20 + 90
modifier: -3
speed: 60 ft., burrow 40 ft.
stats: [ 26, 5, 20, 6, 8, 4 ]
saves:
  - con: 10
  - wis: 4
skillsaves:
  - perception: 4
damage_vulnerabilities: cold
damage_immunities: fire, psychic
condition_immunities: charmed, frightened
senses: blindsight 30 ft., tremorsense 60 ft., passive Perception 14
languages: understands Deep Speech but can't speak
cr: "15"
traits:
  - name: Illumination
    desc: The worm sheds dim light in a 20-foot radius.
  - name: Radiant Mirror
    desc: If the worm takes radiant damage, each creature within 20 feet of it takes that damage as well.
  - name: Tunneler
    desc: The worm can burrow through solid rock at half its burrowing speed and leaves a 10-foot-diameter tunnel in its wake.
actions:
  - name: Multiattack
    desc: "The worm makes two attacks: one with its barbed tentacles and one with its bite."
  - name: Barbed Tentacles
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one creature. *Hit:* 25 (5d6 + 8) piercing damage, and the target is grappled (escape DC 18). Until this grapple ends, the target is restrained. The tentacles can grapple only one creature at a time."
  - name: Bite
    desc: |-
      *Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 30 (5d8 + 8) piercing damage. If the target is a Large or smaller creature, it must succeed on a DC 18 Dexterity saving throw or be swallowed by the worm. A swallowed creature is blinded and restrained, has total cover against attacks and other effects outside the worm, and takes 21 (6d6) fire damage at the start of each of the worm's turns.

      If the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the worm. If the worm dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 20 feet of movement, exiting prone.
```
