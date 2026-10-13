---
title: Eldritch Eddy
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Construct
size: Large
habitat:
  - Urban
sourcebooks:
  - Netheril's Fall
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Eldritch Eddy
size: Large
type: construct
alignment: Chaotic Neutral
ac: 11
hp: 144
hit_dice: 17d10 + 51
modifier: 1
speed: 10 ft., fly 40 ft. (hover)
stats: [ 10, 12, 16, 12, 9, 17 ]
saves:
  - dex: 4
  - int: 4
  - cha: 6
damage_resistances: force
damage_immunities: fire, lightning
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: Blindsight 60 ft., passive Perception 9
languages: understands Common plus one other language but can't speak
cr: "6"
traits:
  - name: Magic Resistance
    desc: The eddy has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The eddy makes two attacks, using Searing Swipe or Arcane Bolt in any combination.
  - name: Searing Swipe
    desc: "*Melee Attack Roll:* +6, reach 10 ft. *Hit:* 13 (3d6 + 3) Fire or Lightning damage (eddy's choice)."
  - name: Arcane Bolt
    desc: "*Ranged Attack Roll:* +6, range 120 ft. *Hit:* 14 (2d10 + 3) Force damage."
reactions:
  - name: Eldritch Overload
    desc: "Trigger: The eddy takes damage. _Response, _*Strength Saving Throw:* DC 14, each creature of the eddy's choice in a 5-foot Emanation originating from the eddy. *Failure:* 7 (2d6) Force damage, and the target has the Prone condition."
```
