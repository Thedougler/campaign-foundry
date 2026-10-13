---
title: Gauth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Aberration
size: Medium
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gauth
size: Medium
type: aberration
subtype: beholder
alignment: Typically Lawful Evil
ac: 15
ac_class: natural armour
hp: 52
hit_dice: 7d8 + 21
modifier: 2
speed: 0 ft., fly 20 ft. (hover)
stats: [ 10, 14, 16, 15, 15, 13 ]
saves:
  - int: 5
  - wis: 5
  - cha: 4
skillsaves:
  - perception: 5
condition_immunities: prone
senses: darkvision 120 ft., passive Perception 15
languages: Deep Speech, Undercommon
cr: "6"
traits:
  - name: Stunning Gaze
    desc: |-
      When a creature that can see the gauth's central eye starts its turn within 30 feet of the gauth, the gauth can force it to make a DC 14 Wisdom saving throw if the gauth isn't incapacitated and can see the creature. A creature that fails the save is stunned until the start of its next turn.

      Unless surprised, a creature can avert its eyes at the start of its turn to avoid the saving throw. If the creature does so, it can't see the gauth until the start of its next turn, when it can avert its eyes again. If the creature looks at the gauth in the meantime, it must immediately make the save.
  - name: Death Throes
    desc: When the gauth dies, the magical energy within it explodes, and each creature within 10 feet of it must make a DC 14 Dexterity saving throw, taking 13 (3d8) force damage on a failed save, or half as much damage on a successful one.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 9 (2d8) piercing damage."
  - name: Eye Rays
    desc: |-
      The gauth shoots three of the following magical eye rays at random (roll three d6s, and reroll duplicates), targeting one to three creatures it can see within 120 feet of it:

      - **1 Devour Magic Ray.** The target must succeed on a DC 14 Dexterity saving throw or have one of its magic items lose all magical properties until the start of the gauth's next turn. If the object is a charged item, it also loses 1d4 charges. Determine the affected item randomly, ignoring single-use items such as potions and scrolls.  
      - **2 Enervation Ray.** The target must make a DC 14 Constitution saving throw, taking 18 (4d8) necrotic damage on a failed save, or half as much damage on a successful one.  
      - **3 Fire Ray.** The target must succeed on a DC 14 Dexterity saving throw or take 22 (4d10) fire damage.  
      - **4 Paralysing Ray.** The target must succeed on a DC 14 Constitution saving throw or be paralysed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.  
      - **5 Pushing Ray.** The target must succeed on a DC 14 Strength saving throw or be pushed up to 15 feet away from the gauth and have its speed halved until the start of the gauth's next turn.  
      - **6 Sleep Ray.** The target must succeed on a DC 14 Wisdom saving throw or fall asleep and remain unconscious for 1 minute. The target awakens if it takes damage or another creature takes an action to wake it. This ray has no effect on Constructs and Undead.
```
