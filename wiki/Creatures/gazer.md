---
title: Gazer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Aberration
size: Tiny
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gazer
size: Tiny
type: aberration
subtype: beholder
alignment: Typically Neutral Evil
ac: 13
hp: 13
hit_dice: 3d4 + 6
modifier: 3
speed: 0 ft., fly 30 ft. (hover)
stats: [ 3, 17, 14, 3, 10, 7 ]
saves:
  - wis: 2
skillsaves:
  - perception: 4
  - stealth: 5
condition_immunities: prone
senses: darkvision 60 ft., passive Perception 14
cr: 1/2
traits:
  - name: Mimicry
    desc: The gazer can mimic simple sounds of speech it has heard, in any language. A creature that hears the sounds can tell they are imitations with a successful DC 10 Wisdom (Insight) check.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 1 piercing damage."
  - name: Eye Rays
    desc: |-
      The gazer shoots two of the following magical eye rays at random (roll two d4s, and reroll duplicates), choosing one or two targets it can see within 60 feet of it:

      - **1 Dazing Ray.** The targeted creature must succeed on a DC 12 Wisdom saving throw or be charmed until the start of the gazer's next turn. While the target is charmed in this way, its speed is halved, and it has disadvantage on attack rolls.  
      - **2 Fear Ray.** The targeted creature must succeed on a DC 12 Wisdom saving throw or be frightened until the start of the gazer's next turn.  
      - **3 Frost Ray.** The target must succeed on a DC 12 Dexterity saving throw or take 10 (3d6) cold damage.  
      - **4 Telekinetic Ray.** If the target is a creature that is Medium or smaller, it must succeed on a DC 12 Strength saving throw or be moved up to 30 feet directly away from the gazer. If the target is a Tiny object that isn't being worn or carried, the gazer moves it up to 30 feet in any direction. The gazer can also exert fine control on objects with this ray, such as manipulating a simple tool or opening a container.  
bonus_actions:
  - name: Aggressive
    desc: The gazer moves up to its speed toward a hostile creature that it can see.
```
