---
title: Firegaunt
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Firegaunt
size: Huge
type: undead
alignment: typically Lawful Evil
ac: 15
ac_class: damaged plate
hp: 175
hit_dice: 14d12 + 84
modifier: -2
speed: 40 ft.
stats: [ 25, 7, 23, 10, 14, 13 ]
saves:
  - dex: 2
  - con: 10
  - cha: 5
skillsaves:
  - athletics: 11
  - perception: 6
damage_resistances: necrotic
damage_immunities: fire, poison
condition_immunities: exhaustion, petrified, poisoned
senses: passive Perception 16
languages: Giant
cr: "11"
traits:
  - name: Fire Blood
    desc: Whenever a creature within 5 feet of the firegaunt hits the firegaunt with a melee attack that deals piercing or slashing damage, that creature takes 5 (1d10) fire damage.
actions:
  - name: Multiattack
    desc: The firegaunt makes two Heated Maul attacks.
  - name: Heated Maul
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 23 (3d10 + 7) bludgeoning damage. The firegaunt can cause the maul to erupt with crimson flames, and the target must succeed on a DC 18 Dexterity saving throw or take 10 (3d6) fire damage and 10 (3d6) necrotic damage. The maul can erupt with flames in this way only once per turn."
  - name: Crimson Rays (Recharge 5–6)
    desc: The firegaunt emits beams of fire from its eyes, mouth, and wounds in a 30-foot cone. Each creature in that area must make a DC 18 Dexterity saving throw, taking 31 (7d8) fire damage on a failed save, or half as much damage on a successful one. On a success or failure, that creature catches fire. Until the burning creature or another creature that can reach it takes an action to extinguish the fire, the burning creature can't regain hit points and takes 5 (1d10) fire damage at the start of each of its turns.
```
