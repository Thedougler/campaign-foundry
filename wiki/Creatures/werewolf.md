---
title: Werewolf
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Small or Medium
habitat:
  - Forest
  - Hill
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Werewolf
size: Small or Medium
type: monstrosity
subtype: lycanthrope
alignment: Chaotic Evil
ac: 15
hp: 71
hit_dice: 11d8 + 22
modifier: 4
speed: 30 ft., 40 ft. (wolf form only)
stats: [ 16, 14, 14, 10, 11, 10 ]
skillsaves:
  - perception: 4
  - stealth: 4
gear:
  - longbow
senses: Darkvision 60 ft., passive Perception 14
languages: Common (can't speak in wolf form)
cr: "3"
traits:
  - name: Pack Tactics
    desc: The werewolf has Advantage on an attack roll against a creature if at least one of the werewolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The werewolf makes two attacks, using Scratch or Longbow in any combination. It can replace one attack with a Bite attack.
  - name: Bite (Wolf or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 12 (2d8 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. *Constitution Saving Throw:* DC 12. *Failure:* The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Werewolf under the DM's control and has 10 Hit Points. *Success:* The target is immune to this werewolf's curse for 24 hours."
  - name: Scratch
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Slashing damage."
  - name: Longbow (Humanoid or Hybrid Form Only)
    desc: "*Ranged Attack Roll:* +4, range 150/600 ft. *Hit:* 11 (2d8 + 2) Piercing damage."
bonus_actions:
  - name: Shape-Shift
    desc: The werewolf shape-shifts into a Large wolf-humanoid hybrid or a Medium wolf, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```
