---
title: Haunting Revenant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Undead
size: Gargantuan
habitat:
  - Forest
  - Swamp
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Haunting Revenant
size: Gargantuan
type: undead
alignment: Neutral
ac: 20
hp: 203
hit_dice: 14d20 + 56
modifier: 5
speed: 30 ft.
stats: [ 20, 12, 18, 16, 18, 20 ]
saves:
  - con: 8
  - wis: 8
damage_resistances: necrotic, psychic
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Truesight 60 ft., passive Perception 14
languages: Common plus two other languages
cr: "10"
traits:
  - name: Haunted Zone
    desc: "*Constitution Saving Throw:* DC 17, any creature that casts a spell while inside the revenant's space. *Failure:* The spell fails and is wasted."
  - name: Undead Restoration
    desc: If the revenant dies, it revives 24 hours later unless *Dispel Evil and Good* is cast on its remains. If it revives, it animates another Gargantuan object or structure elsewhere on the same plane of existence; it now looks different but uses the same stat block and returns with all its Hit Points.
actions:
  - name: Multiattack
    desc: The revenant makes two Object Slam attacks and uses Invitation.
  - name: Object Slam
    desc: "*Melee or Ranged Attack Roll:* +9 (with Advantage if the target is inside the revenant's space), reach 10 ft. or range 30/90 ft. *Hit:* 27 (5d8 + 5) Bludgeoning damage."
  - name: Invitation
    desc: |-
      *Charisma Saving Throw:* DC 17, each creature in a 60-foot Cone. *Failure:* The target is teleported inside the revenant's space and swallowed. A swallowed creature has Total Cover against attacks and other effects outside the revenant.

      While the revenant has Hit Points, a swallowed creature can leave the revenant's space only by using magic that enables planar travel, such as the *Plane Shift* spell.
```
