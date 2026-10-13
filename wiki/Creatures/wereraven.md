---
title: Wereraven
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
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Wereraven
size: Small or Medium
type: monstrosity
subtype: lycanthrope
alignment: Neutral Good
ac: 12
hp: 54
hit_dice: 12d8
modifier: 2
speed: 30 ft., fly 50 ft. (raven or hybrid form only)
stats: [ 10, 15, 11, 13, 15, 14 ]
skillsaves:
  - insight: 4
  - perception: 6
gear:
  - shortbow
senses: passive Perception 16
languages: Common plus one other language
cr: "2"
traits:
  - name: Mimicry
    desc: The wereraven can mimic voices and animal sounds. A creature that hears this mimicry can tell it is an imitation only with a successful DC 12 Wisdom (Insight) check.
actions:
  - name: Multiattack
    desc: The wereraven makes two attacks, using Scratch or Shortbow in any combination. It can replace one attack with a Beak attack.
  - name: Beak (Raven or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 11 (2d8 + 2) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. *Constitution Saving Throw:* DC 10. *Failure:* The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Wereraven under the DM's control and has 10 Hit Points. *Success:* The target is immune to this wereraven's curse for 24 hours."
  - name: Scratch
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 7 (2d4 + 2) Slashing damage."
  - name: Shortbow (Humanoid or Hybrid Form Only)
    desc: "*Ranged Attack Roll:* +4, range 80/320 ft. *Hit:* 9 (2d6 + 2) Piercing damage."
bonus_actions:
  - name: Shape-Shift
    desc: The wereraven shape-shifts into a Medium raven-humanoid hybrid or a Small raven, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```
