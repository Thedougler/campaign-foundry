---
title: Will-o'-Wisp
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Undead
size: Tiny
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
name: Will-o'-Wisp
size: Tiny
type: undead
alignment: Chaotic Evil
ac: 19
hp: 27
hit_dice: 11d4
modifier: 9
speed: 5 ft., fly 50 ft. (hover)
stats: [ 1, 28, 10, 13, 14, 11 ]
damage_resistances: acid, bludgeoning, cold, fire, necrotic, piercing, slashing
damage_immunities: lightning, poison
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Darkvision 120 ft., passive Perception 12
languages: Common plus one other language
cr: "2"
traits:
  - name: Ephemeral
    desc: The wisp can't wear or carry anything.
  - name: Illumination
    desc: The wisp sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet.
  - name: Incorporeal Movement
    desc: The wisp can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
actions:
  - name: Shock
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 11 (2d8 + 2) Lightning damage."
bonus_actions:
  - name: Consume Life
    desc: "*Constitution Saving Throw:* DC 10, one living creature the wisp can see within 5 feet that has 0 Hit Points. *Failure:* The target dies, and the wisp regains 10 (3d6) Hit Points."
  - name: Vanish
    desc: The wisp and its light have the Invisible condition until the wisp's Concentration ends on this effect, which ends early immediately after the wisp makes an attack roll or uses Consume Life.
```
