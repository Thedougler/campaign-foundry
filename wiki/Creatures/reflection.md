---
title: Reflection
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Fey
size: Medium
habitat: []
sourcebooks:
  - Tasha's Cauldron of Everything
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Reflection
size: Medium
type: fey
alignment: Chaotic Evil
ac: 12
hp: 16
hit_dice: 3d8 + 3
modifier: 2
speed: 40 ft.
stats: [ 6, 14, 13, 6, 10, 8 ]
skillsaves:
  - stealth: 4
damage_vulnerabilities: bludgeoning
damage_resistances: acid; cold; fire; lightning; thunder; piercing, slashing from nonmagical attacks
damage_immunities: necrotic, poison
condition_immunities: exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: darkvision 60 ft., passive Perception 10
cr: 1/2
traits:
  - name: Amorphous
    desc: The reflection can move through a space as narrow as 1 inch wide without squeezing.
  - name: Shadow Stealth
    desc: While in dim light or darkness, the reflection can take the Hide action as a bonus action. Its stealth bonus is also improved to +6.
  - name: Sunlight Weakness
    desc: While in sunlight, the reflection has disadvantage on attack rolls, ability checks, and saving throws.
actions:
  - name: Strength Drain
    desc: |-
      *Melee Weapon Attack:* +4 to hit, reach 5 ft., one creature. *Hit:* 9 (2d6 + 2) necrotic damage, and the target's Strength score is reduced by 1d4. The target dies if this reduces its Strength to 0. Otherwise, the reduction lasts until the target finishes a short or long rest.

      If a non-evil humanoid dies from this attack, a new reflection rises from the corpse 1d4 hours later.
```
