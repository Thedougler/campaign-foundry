---
title: Ochre Jelly
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Ooze
size: Large
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ochre Jelly
size: Large
type: ooze
alignment: Unaligned
ac: 8
hp: 52
hit_dice: 7d10 + 14
modifier: -2
speed: 20 ft., climb 20 ft.
stats: [ 15, 6, 14, 2, 6, 1 ]
damage_resistances: acid
damage_immunities: lightning, slashing
condition_immunities: charmed, deafened, exhaustion, frightened, grappled, prone, restrained
senses: Blindsight 60 ft., passive Perception 8
cr: "2"
traits:
  - name: Amorphous
    desc: The jelly can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Spider Climb
    desc: The jelly can climb difficult surfaces, including along ceilings, without needing to make an ability check.
actions:
  - name: Pseudopod
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 12 (3d6 + 2) Acid damage."
reactions:
  - name: Split
    desc: "Trigger: While the jelly is Large or Medium and has 10+ Hit Points, it becomes Bloodied or is subjected to Lightning or Slashing damage. _Response:_ The jelly splits into two new Ochre Jellies. Each new jelly is one size smaller than the original jelly and acts on its Initiative. The original jelly's Hit Points are divided evenly between the new jellies (round down)."
```
