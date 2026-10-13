---
title: Allowak Abominable Yeti
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Allowak Abominable Yeti
size: Huge
type: monstrosity
alignment: Neutral
ac: 15
ac_class: natural armour
hp: 137
hit_dice: 11d12 + 66
modifier: 0
speed: 40 ft., climb 40 ft.
stats: [ 24, 10, 22, 16, 13, 10 ]
skillsaves:
  - perception: 5
  - stealth: 4
damage_immunities: cold
senses: darkvision 60 ft., passive Perception 15
languages: Common, Yeti
cr: "9"
traits:
  - name: Fear of Fire
    desc: If the yeti takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn.
  - name: Keen Smell
    desc: The yeti has advantage on Wisdom (Perception) checks that rely on smell.
  - name: Snow Camouflage
    desc: The yeti has advantage on Dexterity (Stealth) checks made to hide in snowy terrain.
actions:
  - name: Multiattack
    desc: The yeti can use its Chilling Gaze and makes two claw attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 14 (2d6 + 7) slashing damage plus 7 (2d6) cold damage."
  - name: Chilling Gaze
    desc: The yeti targets one creature it can see within 30 feet of it. If the target can see the yeti, the target must succeed on a DC 18 Constitution saving throw against this magic or take 21 (6d6) cold damage and then be paralysed for 1 minute, unless it is immune to cold damage. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If the target's saving throw is successful, or if the effect ends on it, the target is immune to this yeti's gaze for 1 hour.
  - name: Cold Breath (Recharge 6)
    desc: The yeti exhales a 30-foot cone of frigid air. Each creature in that area must make a DC 18 Constitution saving throw, taking 45 (10d8) cold damage on a failed save, or half as much damage on a successful one.
```
