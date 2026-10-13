---
title: Mouth of Grolantor
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Giant
size: Huge
habitat:
  - Grassland
  - Hill
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mouth of Grolantor
size: Huge
type: giant
subtype: hill giant
alignment: Typically Chaotic Evil
ac: 14
ac_class: natural armour
hp: 105
hit_dice: 10d12 + 40
modifier: 0
speed: 50 ft.
stats: [ 21, 10, 18, 5, 7, 5 ]
skillsaves:
  - perception: 1
condition_immunities: frightened
senses: passive Perception 11
languages: Giant
cr: "6"
traits:
  - name: Mouth of Chaos
    desc: |-
      The giant is immune to the *confusion* spell.

      On each of its turns, the giant uses all its movement to move toward the nearest creature or whatever else it might perceive as food. Roll a d10 at the start of each of the giant's turns to determine its action for that turn:

      - **1–3.** The giant makes three Fist attacks against one random creature within reach. If no creatures are within reach, the giant flies into a rage and gains advantage on all attack rolls until the end of its next turn.  
      - **4–5.** The giant makes one Fist attack against each creature within reach. If no creatures are within reach, the giant makes one Fist attack against itself.  
      - **6–7.** The giant makes one Bite attack against one random creature within reach. If no other creatures are within reach, its eyes glaze over and it is stunned until the start of its next turn.  
      - **8–10.** The giant makes one Bite attack and two Fist attacks against one random creature within reach. If no creatures are within reach, the giant flies into a rage and gains advantage on all attack rolls until the end of its next turn.  
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one creature. *Hit:* 15 (3d6 + 5) piercing damage, and the giant magically regains hit points equal to the damage dealt."
  - name: Fist
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 18 (3d8 + 5) bludgeoning damage."
```
