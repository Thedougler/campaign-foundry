---
title: Steel Defender
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Steel Defender
size: Medium
type: construct
alignment: Neutral
ac_class: 12 + your Intelligence modifier
hp: 5 + five times your Artificer level (the defender has a number of Hit Dice [d8s] equal to your Artificer level)
modifier: 1
speed: 40 ft.
stats: [ 14, 12, 14, 4, 10, 6 ]
damage_immunities: poison
condition_immunities: charmed, exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: understands the languages you know
traits:
  - name: Steel Bond
    desc: Add your Proficiency Bonus to any ability check or saving throw the defender makes.
actions:
  - name: Force-Empowered Rend
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d8 + 2 plus your Intelligence modifier Force damage."
  - name: Repair (3/Day)
    desc: The defender, or one Construct or object it can see within 5 feet of itself, regains a number of Hit Points equal to 2d8 plus your Intelligence modifier.
reactions:
  - name: Deflect Attack
    desc: "Trigger: A creature the defender can see within 5 feet of itself makes an attack roll against a creature other than the defender. _Response:_ The triggering creature makes the attack roll with Disadvantage."
```
