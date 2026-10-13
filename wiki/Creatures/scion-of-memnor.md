---
title: Scion of Memnor
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 26
creature_type: Giant
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Scion of Memnor
size: Gargantuan
type: giant
subtype: titan
alignment: typically Chaotic Neutral
ac: 20
ac_class: natural armour
hp: 656
hit_dice: 32d20 + 320
modifier: 4
speed: 60 ft., fly 80 ft. (hover)
stats: [ 30, 18, 30, 24, 22, 26 ]
saves:
  - dex: 12
  - cha: 16
skillsaves:
  - arcana: 15
  - perception: 14
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: thunder
condition_immunities: charmed, frightened, paralysed, petrified
senses: truesight 120 ft., passive Perception 24
languages: Giant, Primordial
cr: "26"
traits:
  - name: Flyby
    desc: The scion doesn't provoke opportunity attacks when it flies out of an enemy's reach.
  - name: Legendary Resistance (6/Day)
    desc: If the scion fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The scion has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The scion deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The scion makes one attack using Cloud Morningstar or Wind Javelin, as well as two Slam attacks.
  - name: Cloud Morningstar
    desc: "*Melee Weapon Attack:* +18 to hit, reach 30 ft., one target. *Hit:* 32 (4d10 + 10) force damage plus 22 (4d10) thunder damage."
  - name: Wind Javelin
    desc: "*Ranged Weapon Attack:* +18 to hit, range 120/480 ft., one target. *Hit:* 42 (5d12 + 10) thunder damage, and the target must succeed on a DC 26 Strength saving throw or have the prone condition."
  - name: Slam
    desc: "*Melee Weapon Attack:* +18 to hit, reach 20 ft., one target. *Hit:* 28 (4d8 + 10) force damage."
  - name: Thunderous Vortex (Recharge 5–6)
    desc: The scion magically creates a vortex of wind in a 60-foot-radius sphere centred on a point it can see within 120 feet of itself. Each creature in the sphere must succeed on a DC 24 Strength saving throw or be pulled straight toward the sphere's center, ending in an unoccupied space as close as possible to the center. Then a burst of thunder erupts in a 30-foot-radius sphere centred on the same point. Each creature in that area takes 52 (8d12) thunder damage and must succeed on a DC 24 Constitution saving throw or have the stunned condition until the end of its next turn.
bonus_actions:
  - name: Fog of Deception
    desc: The scion conjures a magical cloud that fills a 30-foot-radius sphere centred on a point it can see within 90 feet of itself. Each creature in that area must make a DC 24 Wisdom saving throw. On a failed save, a creature has the charmed condition until the end of its next turn. While it has the charmed condition, the creature must use its action to make a melee attack against a creature other than itself of the scion's choice. If no creature is within its reach, the affected creature makes a ranged attack against a creature of the scion's choice, throwing its weapon if necessary. On a successful save, a creature is immune to the scion's Fog of Deception for the next 24 hours.
```
