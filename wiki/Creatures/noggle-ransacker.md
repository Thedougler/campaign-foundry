---
title: Noggle Ransacker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Fey
size: Small
habitat:
  - Planar (Feywild)
sourcebooks:
  - "Lorwyn: First Light"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Noggle Ransacker
size: Small
type: fey
alignment: Chaotic Neutral
ac: 12
hp: 13
hit_dice: 3d6 + 3
modifier: 2
speed: 30 ft.
stats: [ 14, 15, 13, 8, 10, 12 ]
skillsaves:
  - stealth: 4
senses: Darkvision 60 ft., passive Perception 10
languages: Common, Sylvan
cr: 1/4
traits:
  - name: Siege Monster
    desc: The noggle deals double damage to objects and structures.
actions:
  - name: Sabotaging Swipe
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 6 (1d8 + 2) Slashing damage. If the target is wearing armour, it is subjected to the following effect. *Dexterity Saving Throw:* DC 12. *Failure:* The armour takes a -1 penalty to the AC it offers. The target can take an action to remove the penalty from its armour."
bonus_actions:
  - name: Nimble Escape
    desc: The noggle takes the Disengage or Hide action.
```
