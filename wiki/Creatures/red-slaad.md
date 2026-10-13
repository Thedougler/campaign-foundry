---
title: Red Slaad
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Aberration
size: Large
habitat:
  - Planar (Limbo)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Red Slaad
size: Large
type: aberration
alignment: Chaotic Neutral
ac: 14
hp: 93
hit_dice: 11d10 + 33
modifier: 1
speed: 30 ft.
stats: [ 16, 12, 16, 6, 6, 7 ]
skillsaves:
  - perception: 1
damage_resistances: acid, cold, fire, lightning, thunder
senses: Darkvision 60 ft., passive Perception 11
languages: Slaad; telepathy 60 ft.
cr: "5"
traits:
  - name: Magic Resistance
    desc: The slaad has Advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: The slaad regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
actions:
  - name: Multiattack
    desc: The slaad makes three Injecting Claw attacks.
  - name: Injecting Claw
    desc: |-
      *Melee Attack Roll:* +6, reach 10 ft. *Hit:* 10 (2d6 + 3) Piercing damage. If the target is a Humanoid not cursed by a slaad, it is subjected to the following effect. *Constitution Saving Throw:* DC 14. *Failure:* The target is cursed unawares, and a minuscule slaad egg is implanted in it. Removing the curse destroys the egg.

      Over 2d4 × 10 days, the egg gestates. In the final 24 hours, the cursed target feels unwell; its Speed is halved, and it has Disadvantage on D20 Tests. At the end of this time, the egg turns into a Slaad Tadpole, which chews out of the host and kills it.
```
