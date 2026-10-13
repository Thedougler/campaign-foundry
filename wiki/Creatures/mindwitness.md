---
title: Mindwitness
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Aberration
size: Large
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mindwitness
size: Large
type: aberration
alignment: Typically Lawful Neutral
ac: 15
ac_class: natural armour
hp: 75
hit_dice: 10d10 + 20
modifier: 2
speed: 0 ft., fly 20 ft. (hover)
stats: [ 10, 14, 14, 15, 15, 10 ]
saves:
  - int: 5
  - wis: 5
skillsaves:
  - perception: 8
condition_immunities: prone
senses: darkvision 120 ft., passive Perception 18
languages: Deep Speech, Undercommon, telepathy 600 ft.
cr: "5"
traits:
  - name: Telepathic Hub
    desc: When the mindwitness receives a telepathic message, it can telepathically share that message with up to seven other creatures within 600 feet of it that it can see.
actions:
  - name: Multiattack
    desc: The mindwitness makes one Bite attack and one Tentacles attack, or it uses Eye Ray three times.
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 16 (4d6 + 2) piercing damage."
  - name: Tentacles
    desc: "*Melee Weapon Attack:* +5 to hit, reach 10 ft., one creature. *Hit:* 20 (4d8 + 2) psychic damage. If the target is Large or smaller, it is grappled (escape DC 13), and it must succeed on a DC 13 Intelligence saving throw or be restrained until this grapple ends."
  - name: Eye Ray
    desc: |-
      The mindwitness shoots one magical eye ray at random (roll a d6, and reroll if the ray has already been used this turn), choosing one target it can see within 120 feet of it:

      - **1 Aversion Ray.** The targeted creature must make a DC 13 Charisma saving throw. On a failed save, the target has disadvantage on attack rolls for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.  
      - **2 Fear Ray.** The targeted creature must succeed on a DC 13 Wisdom saving throw or be frightened for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.  
      - **3 Psychic Ray.** The target must succeed on a DC 13 Intelligence saving throw or take 27 (6d8) psychic damage.  
      - **4 Slowing Ray.** The targeted creature must make a DC 13 Dexterity saving throw. On a failed save, the target's speed is halved for 1 minute. In addition, the creature can't take reactions, and it can take either an action or a bonus action on its turn but not both. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.  
      - **5 Stunning Ray.** The targeted creature must succeed on a DC 13 Constitution saving throw or be stunned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.  
      - **6 Telekinetic Ray.** If the target is a creature, it must make a DC 13 Strength saving throw. On a failed save, the mindwitness moves it up to 30 feet in any direction, and it is restrained by the ray's telekinetic grip until the start of the mindwitness's next turn or until the mindwitness is incapacitated.  

          If the target is an object weighing 300 pounds or less that isn't being worn or carried, it is telekinetically moved up to 30 feet in any direction. The mindwitness can also exert fine control on objects with this ray, such as manipulating a simple tool or opening a door or a container.
```
