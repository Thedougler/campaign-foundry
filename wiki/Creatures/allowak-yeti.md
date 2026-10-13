---
title: Allowak Yeti
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Allowak Yeti
size: Large
type: monstrosity
alignment: Neutral
ac: 12
ac_class: natural armour
hp: 51
hit_dice: 6d10 + 18
modifier: 1
speed: 40 ft., climb 40 ft.
stats: [ 18, 13, 16, 16, 12, 10 ]
skillsaves:
  - perception: 3
  - stealth: 3
damage_immunities: cold
senses: darkvision 60 ft., passive Perception 13
languages: Common, Yeti
cr: "3"
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
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) slashing damage plus 3 (1d6) cold damage."
  - name: Chilling Gaze
    desc: The yeti targets one creature it can see within 30 feet of it. If the target can see the yeti, the target must succeed on a DC 13 Constitution saving throw against this magic or take 10 (3d6) cold damage and then be paralysed for 1 minute, unless it is immune to cold damage. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If the target's saving throw is successful, or if the effect ends on it, the target is immune to the Chilling Gaze of all yetis (but not abominable yetis) for 1 hour.
```
