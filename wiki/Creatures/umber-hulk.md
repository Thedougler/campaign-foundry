---
title: Umber Hulk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Large
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Umber Hulk
size: Large
type: monstrosity
alignment: Chaotic Evil
ac: 18
hp: 93
hit_dice: 11d10 + 33
modifier: 4
speed: 30 ft., burrow 20 ft.
stats: [ 20, 13, 16, 9, 10, 10 ]
senses: Darkvision 120 ft., Tremorsense 60 ft., passive Perception 10
languages: Umber Hulk
cr: "5"
traits:
  - name: Tunneler
    desc: The umber hulk can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.
actions:
  - name: Multiattack
    desc: The umber hulk makes three Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 12 (2d6 + 5) Slashing damage."
bonus_actions:
  - name: Confusing Gaze (Recharge 5–6)
    desc: |-
      *Wisdom Saving Throw:* DC 14, each creature in a 30-foot Cone. *Failure:* The target can't take Reactions until the start of the umber hulk's next turn, and the target rolls 1d8 to determine what it does on its next turn:

      - **1–4.** The target does nothing.  
      - **5–6.** The target takes no action or Bonus Action and uses all its movement to move in a random direction.  
      - **7–8.** The target makes a melee attack against a random creature within its reach or does nothing if it can't make such an attack.
```
