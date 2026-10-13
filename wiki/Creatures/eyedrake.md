---
title: Eyedrake
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Aberration
size: Large
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Eyedrake
size: Large
type: aberration
alignment: typically Lawful Evil
ac: 16
ac_class: natural armour
hp: 119
hit_dice: 14d10 + 42
modifier: 0
speed: 0 ft., fly 30 ft. (hover)
stats: [ 16, 10, 16, 14, 14, 16 ]
saves:
  - con: 6
  - wis: 5
skillsaves:
  - perception: 8
  - stealth: 6
condition_immunities: prone
senses: darkvision 120 ft., passive Perception 18
languages: Deep Speech, Draconic
cr: "8"
traits:
  - name: Unusual Nature
    desc: The eyedrake doesn't require food or drink.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 10 ft., one target. *Hit:* 13 (3d6 + 3) piercing damage."
  - name: Antimagic Breath (Recharge 6)
    desc: The eyedrake emits a magic wave in a 30-foot cone. Each creature in that area must make a DC 14 Constitution saving throw, taking 39 (6d12) force damage on a failed save, or half as much damage on a successful one. Every spell of 3rd level or lower ends on creatures and objects of the eyedrake's choice in that area.
  - name: Eye Rays
    desc: |-
      The eyedrake shoots three of the following magical eye rays at random (reroll duplicates), each ray targeting one creature it can see within 60 feet of it:

      - **1 Freezing Ray.** The target must make a DC 14 Constitution saving throw. On a failed save, the target takes 17 (5d6) cold damage, and its speed is halved until the end of its next turn. On a successful save, the target takes half as much damage with no additional effects.  
      - **2 Debilitating Ray.** The target must succeed on a DC 14 Constitution saving throw or take 7 (2d6) thunder damage and become incapacitated until the end of its next turn.  
      - **3 Repulsion Ray.** The target must succeed on a DC 14 Strength saving throw or take 14 (4d6) force damage and be pushed up to 60 feet away from the eyedrake.  
      - **4 Fire Ray.** The target must make a DC 14 Dexterity saving throw, taking 21 (6d6) fire damage on a failed save, or half as much damage on a successful one.  
      - **5 Paralysing Ray.** The target must succeed on a DC 14 Constitution saving throw or be paralysed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.  
      - **6 Death Ray.** The target must make a DC 14 Dexterity saving throw, taking 28 (8d6) necrotic damage on a failed save, or half as much damage on a successful one. The target dies if the ray reduces it to 0 hit points.
```
