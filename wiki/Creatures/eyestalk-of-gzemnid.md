---
title: Eyestalk of Gzemnid
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - Turn of Fortune's Wheel
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Eyestalk of Gzemnid
size: Gargantuan
type: monstrosity
alignment: Unaligned
ac: 18
ac_class: natural armour
hp: 247
hit_dice: 15d20 + 90
modifier: -2
speed: 50 ft., burrow 30 ft.
stats: [ 28, 7, 22, 1, 8, 4 ]
saves:
  - con: 11
  - wis: 4
senses: blindsight 30 ft., tremorsense 60 ft., passive Perception 9
cr: "15"
traits:
  - name: Tunneler
    desc: The eyestalk can burrow through solid rock at half its burrow speed and leaves a 10-foot-diameter tunnel in its wake.
actions:
  - name: Multiattack
    desc: The eyestalk attacks with its bite and uses Eradication Gaze.
  - name: Bite
    desc: |-
      *Melee Weapon Attack:* +14 to hit, reach 10 ft., one target. *Hit:* 22 (3d8 + 9) piercing damage. If the target is a Large or smaller creature, it must succeed on a DC 19 Dexterity saving throw or be swallowed by the eyestalk. A swallowed creature is blinded and restrained, it has total cover against attacks and other effects outside the eyestalk, and it takes 21 (6d6) acid damage at the start of each of the eyestalk's turns.

      If the eyestalk takes 30 damage or more on a single turn from a creature inside it, the eyestalk must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the eyestalk. If the eyestalk dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 20 feet of movement, exiting prone.
  - name: Eradication Gaze (Recharge 5–6)
    desc: The eyestalk creates an area of magical devastation in a 150-foot cone. Any creature in that area must succeed on a DC 16 Dexterity saving throw or take 55 (10d10) necrotic damage. If this damage reduces a creature to 0 hit points, its body becomes a pile of fine violet dust.
```
