---
title: Harrow Hound
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Harrow Hound
size: Medium
type: undead
alignment: typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 45
hit_dice: 6d8 + 18
modifier: 4
speed: 40 ft.
stats: [ 16, 19, 16, 8, 15, 13 ]
skillsaves:
  - perception: 6
  - stealth: 6
damage_resistances: necrotic; psychic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: darkvision 60 ft., passive Perception 16
languages: Blink Dog, understands Sylvan but can't speak it
cr: "3"
traits:
  - name: Pack Tactics
    desc: The hound has advantage on attack rolls against a creature if at least one of the hound's allies is within 5 feet of the target and the ally doesn't have the incapacitated condition.
  - name: Supernatural Tracker
    desc: The hound knows the distance to and direction of any creature that has come within 30 feet of it, even if that creature is on a different plane of existence. If the creature being tracked by the hound dies, the hound knows.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) piercing damage plus 3 (1d6) necrotic damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or have the prone condition."
bonus_actions:
  - name: Shadow Step (Recharge 4–6)
    desc: The hound magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see.
```
