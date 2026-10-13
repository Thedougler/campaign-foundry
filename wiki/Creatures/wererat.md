---
title: Wererat
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Monstrosity
size: Small or Medium
habitat:
  - Forest
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Wererat
size: Small or Medium
type: monstrosity
subtype: lycanthrope
alignment: Lawful Evil
ac: 13
hp: 60
hit_dice: 11d8 + 11
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 10, 16, 12, 11, 10, 8 ]
skillsaves:
  - perception: 4
  - stealth: 5
gear:
  - hand crossbow
senses: Darkvision 60 ft., passive Perception 14
languages: Common (can't speak in rat form)
cr: "2"
actions:
  - name: Multiattack
    desc: The wererat makes two attacks, using Scratch or Hand Crossbow in any combination. It can replace one attack with a Bite attack.
  - name: Bite (Rat or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 8 (2d4 + 3) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. *Constitution Saving Throw:* DC 11. *Failure:* The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Wererat under the DM's control and has 10 Hit Points. *Success:* The target is immune to this wererat's curse for 24 hours."
  - name: Scratch
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Slashing damage."
  - name: Hand Crossbow (Humanoid or Hybrid Form Only)
    desc: "*Ranged Attack Roll:* +5, range 30/120 ft. *Hit:* 6 (1d6 + 3) Piercing damage."
bonus_actions:
  - name: Shape-Shift
    desc: The wererat shape-shifts into a Medium rat-humanoid hybrid or a Small rat, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```
