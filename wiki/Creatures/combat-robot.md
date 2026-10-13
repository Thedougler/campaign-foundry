---
title: Combat Robot
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Combat Robot
size: Medium
type: construct
alignment: typically Lawful Neutral
ac: 15
ac_class: natural armour
hp: 112
hit_dice: 15d8 + 45
modifier: 2
speed: 40 ft.
stats: [ 20, 14, 17, 10, 15, 10 ]
saves:
  - con: 6
  - cha: 3
skillsaves:
  - athletics: 8
  - intimidation: 6
  - perception: 5
damage_resistances: acid, fire
damage_immunities: cold, poison
condition_immunities: exhaustion, poisoned
senses: darkvision 120 ft., passive Perception 15
languages: Common plus the languages spoken by its creator
cr: "6"
traits:
  - name: Lightning Overload
    desc: When the robot takes lightning damage, it must succeed on a DC 10 Constitution saving throw or have the stunned condition until the start of its next turn.
actions:
  - name: Multiattack
    desc: The robot makes two Tentacle attacks or three Laser Beam attacks.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 10 (1d10 + 5) bludgeoning damage. If the target is a Medium or smaller creature, it has the grappled condition (escape DC 16). While grappled, the target also has the restrained condition. The robot has two tentacles, each of which can grapple one target."
  - name: Laser Beam
    desc: "*Ranged Weapon Attack:* +5 to hit, range 120 ft., one target. *Hit:* 16 (4d6 + 2) radiant damage."
  - name: Grenade Launcher (Recharge 5–6)
    desc: |-
      The robot fires a grenade at a point it can see within 120 feet of itself. The grenade explodes in a 20-foot-radius sphere centred on that point, creating one of the following effects (robot's choice):

      - **Concussion Grenade.** Each creature in the sphere must make a DC 15 Dexterity saving throw, taking 21 (6d6) force damage on a failed save or half as much damage on a successful one.  
      - **Sleep Grenade.** Each creature in the sphere must succeed on a DC 15 Constitution saving throw or have the unconscious condition for 1 hour. The condition ends on a creature early if the creature takes damage or if another creature uses an action to shake it awake.  
bonus_actions:
  - name: Emergency Speed (2/Day)
    desc: The robot takes the Dash or Disengage action.
```
