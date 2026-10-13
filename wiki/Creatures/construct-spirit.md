---
title: Construct Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Construct Spirit
size: Medium
type: construct
alignment: Neutral
ac_class: 13 + the spell's level
hp: 40 + 15 for each spell level above 4
modifier: 0
speed: 30 ft.
stats: [ 18, 10, 18, 14, 11, 5 ]
damage_resistances: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: Understands the languages you know
traits:
  - name: Heated Body (Metal Only)
    desc: A creature that hits the spirit with a melee attack or that starts its turn in a grapple with the spirit takes 1d10 Fire damage.
  - name: Stony Lethargy (Stone Only)
    desc: When a creature starts its turn within 10 feet of the spirit, the spirit can target it with magical energy if the spirit can see it. *Wisdom Saving Throw:* DC equals your spell save DC, the target. *Failure:* Until the start of its next turn, the target can't make Opportunity Attacks, and its Speed is halved.
actions:
  - name: Multiattack
    desc: The spirit makes a number of Slam attacks equal to half this spell's level (round down).
  - name: Slam
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d8 + 4 + the spell's level Bludgeoning damage."
reactions:
  - name: Berserk Lashing (Clay Only)
    desc: "Trigger: The spirit takes damage from a creature. _Response:_ The spirit makes a Slam attack against that creature if possible, or the spirit moves up to half its Speed toward that creature without provoking Opportunity Attacks."
```
