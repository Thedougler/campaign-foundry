---
title: Ghost Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ghost Dragon
size: Huge
type: undead
alignment: Any alignment
ac: 10
hp: 324
hit_dice: 24d12 + 168
modifier: 0
speed: 40 ft., fly 80 ft. (hover)
stats: [ 20, 10, 25, 16, 15, 19 ]
saves:
  - con: 13
  - wis: 8
  - cha: 10
skillsaves:
  - perception: 14
  - stealth: 12
damage_resistances: bludgeoning, piercing, slashing
damage_immunities: acid, cold, necrotic, poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 24
languages: Common, Draconic, telepathy 120 ft.
cr: "17"
traits:
  - name: Incorporeal Movement
    desc: The ghost dragon can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Legendary Resistance (3/Day)
    desc: If the ghost dragon fails a saving throw, it can choose to succeed instead.
  - name: Unusual Nature
    desc: The ghost dragon doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The ghost dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 32 (6d8 + 5) cold damage, and the target's speed is halved until the start of the dragon's next turn."
  - name: Claw
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 14 (2d8 + 5) necrotic damage."
  - name: Terrifying Breath (Recharge 6)
    desc: |-
      The ghost dragon exhales shadowy mist in a 90-foot cone. Each creature in that area must make a DC 21 Constitution saving throw. On a failed save, the creature takes 40 (9d8) cold damage and is frightened of the ghost dragon for 1 minute. On a successful save, the creature takes half as much damage and isn't frightened.

      While frightened of the ghost dragon, a creature is paralysed. The frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.

      If a creature's saving throw is successful or the effect ends for it, the creature is immune to this ghost dragon's Terrifying Breath for the next 24 hours.
```
