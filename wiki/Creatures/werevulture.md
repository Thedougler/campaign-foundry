---
title: Werevulture
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Werevulture
size: Medium
type: fiend
alignment: typically Chaotic Evil
ac: 12
hp: 75
hit_dice: 10d8 + 30
modifier: 2
speed: 30 ft., 10 ft. in vulture form, 30 ft. in hybrid form
stats: [ 16, 14, 17, 11, 13, 8 ]
skillsaves:
  - perception: 5
gear:
  - longbow
senses: passive Perception 15
languages: Common (can't speak in vulture form)
cr: "4"
traits:
  - name: Regeneration
    desc: The werevulture regains 10 hit points at the start of its turn. If the werevulture takes radiant damage, this trait doesn't function at the start of the werevulture's next turn. The werevulture dies only if it starts its turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: The werevulture makes two Talon attacks, or it makes a Beak attack and a Talon attack.
  - name: Beak (Vulture or Hybrid Form Only)
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) piercing damage. If the target is a Humanoid, it must succeed on a DC 13 Constitution saving throw or be cursed until targeted by the *Remove Curse* spell or a similar effect. If the cursed target drops to 0 hit points, it becomes a werevulture under the DM's control and regains 10 hit points."
  - name: Talon
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 13 (4d4 + 3) slashing damage."
  - name: Longbow (Humanoid or Hybrid Form Only)
    desc: "*Ranged Weapon Attack:* +4 to hit, range 150/600 ft., one target. *Hit:* 11 (2d8 + 2) piercing damage."
bonus_actions:
  - name: Change Shape
    desc: The werevulture polymorphs into a vulture-humanoid hybrid, into a vulture, or back into its humanoid form. Its game statistics, other than its speed, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its humanoid form if it dies.
```
