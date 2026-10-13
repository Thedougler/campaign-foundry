---
title: Spectral Cloud
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Spectral Cloud
size: Huge
type: undead
alignment: typically Neutral
ac: 11
hp: 189
hit_dice: 18d12 + 72
modifier: 1
speed: 0 ft., fly 40 ft. (hover)
stats: [ 24, 12, 18, 12, 17, 16 ]
saves:
  - dex: 6
  - cha: 8
skillsaves:
  - perception: 8
damage_resistances: cold; necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison, thunder
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: passive Perception 18
languages: Common, Giant
cr: "13"
traits:
  - name: Blurred Form
    desc: Attack rolls against the spectral cloud are made with disadvantage unless the attacker is within 15 feet of the spectral cloud or the spectral cloud is incapacitated.
  - name: Incorporeal Movement
    desc: The spectral cloud can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
actions:
  - name: Multiattack
    desc: The spectral cloud makes two Spectral Touch attacks.
  - name: Spectral Touch
    desc: |-
      *Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 20 (3d8 + 7) force damage plus 10 (3d6) necrotic damage. If the target is a creature, it must succeed on a DC 20 Constitution saving throw, or its hit point maximum is reduced by an amount equal to the necrotic damage taken. This reduction lasts until the target finishes a long rest. The target dies if its hit point maximum is reduced to 0.

      A Humanoid slain by this attack immediately rises as a miniature spectral cloud (use the spectre stat block in the Monster Manual). The miniature spectral cloud acts as an ally of its creator but isn't under its control.
  - name: Chilling Winds (Recharge 5–6)
    desc: |-
      The spectral cloud emits intensely cold wind in a 60-foot line that is 10 feet wide. Each creature in that area must make a DC 20 Constitution saving throw. On a failed save, a creature takes 38 (7d10) cold damage and has the incapacitated condition for 1 minute. The affected creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. On a successful save, a creature takes half as much damage only.

      If a creature's saving throw is successful or the effect ends for it, that creature is immune to this spectral cloud's Chilling Winds for the next 24 hours.
```
