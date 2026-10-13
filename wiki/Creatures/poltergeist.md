---
title: Poltergeist
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Undead
size: Small or Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Poltergeist
size: Small or Medium
type: undead
alignment: Chaotic Neutral
ac: 12
hp: 22
hit_dice: 5d8
modifier: 2
speed: 5 ft., fly 50 ft. (hover)
stats: [ 1, 14, 11, 10, 10, 14 ]
damage_resistances: acid, bludgeoning, cold, fire, lightning, piercing, slashing, thunder
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Darkvision 60 ft., passive Perception 10
languages: Common plus one other language
cr: "2"
traits:
  - name: Incorporeal Movement
    desc: The poltergeist can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
actions:
  - name: Multiattack
    desc: The poltergeist makes one Object Slam attack and uses Telekinetic Thrust.
  - name: Object Slam
    desc: "*Melee or Ranged Attack Roll:* +4, reach 5 ft. or range 30 ft. *Hit:* 7 (2d4 + 2) Bludgeoning damage."
  - name: Telekinetic Thrust
    desc: "*Strength Saving Throw:* DC 12, one creature the poltergeist can see within 30 feet. *Failure:* 9 (2d6 + 2) Force damage, and the target is pushed up to 30 feet straight away from the poltergeist."
bonus_actions:
  - name: Vanish
    desc: The poltergeist gives itself the Invisible condition or ends that condition on itself.
```
