---
title: Lesser Star Spawn Emissary
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 19
creature_type: Aberration
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lesser Star Spawn Emissary
size: Small or Medium
type: aberration
alignment: Chaotic Evil
ac: 19
hp: 241
hit_dice: 21d8 + 147
modifier: 10
speed: 40 ft., fly 40 ft. (hover)
stats: [ 21, 18, 24, 25, 20, 23 ]
saves:
  - int: 13
  - wis: 11
  - cha: 12
skillsaves:
  - arcana: 19
  - deception: 18
  - perception: 11
damage_resistances: acid, force, necrotic, psychic
condition_immunities: charmed, exhaustion, frightened
senses: Truesight 120 ft., passive Perception 21
languages: all; telepathy 120 ft.
cr: "19"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in lair)
    desc: If the emissary fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The emissary makes three attacks, using Lashing Maw or Invert Flesh in any combination.
  - name: Lashing Maw
    desc: "*Melee Attack Roll:* +11, reach 15 ft. *Hit:* 16 (2d10 + 5) Piercing damage plus 13 (3d8) Acid damage."
  - name: Invert Flesh
    desc: "*Constitution Saving Throw:* DC 21, one creature the emissary can see within 120 feet. *Failure:* 29 (4d10 + 7) Force damage."
bonus_actions:
  - name: Shape-Shift
    desc: The emissary shape-shifts into a Small or Medium creature, or it returns to its true form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the lesser star spawn emissary can expend a use to take one of the following actions. The lesser star spawn emissary regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Teleporting Lash
    desc: The emissary teleports up to 30 feet to an unoccupied space it can see and makes one Lashing Maw attack.
  - name: Twist
    desc: The emissary uses Invert Flesh.
  - name: Warp Body
    desc: "*Constitution Saving Throw:* DC 21, one creature the emissary can see within 30 feet. *Failure:* 27 (6d8) Force damage, and the target has the Stunned condition until the start of its next turn. *Failure or Success:* The emissary can't take this action again until the start of its next turn."
```
