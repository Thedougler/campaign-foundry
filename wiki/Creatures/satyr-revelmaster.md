---
title: Satyr Revelmaster
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Fey
size: Medium
habitat:
  - Forest
  - Planar (Feywild)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Satyr Revelmaster
size: Medium
type: fey
alignment: Chaotic Neutral
ac: 17
hp: 82
hit_dice: 15d8 + 15
modifier: 7
speed: 40 ft.
stats: [ 12, 18, 12, 12, 14, 17 ]
saves:
  - dex: 7
  - wis: 5
skillsaves:
  - acrobatics: 7
  - perception: 5
  - performance: 9
senses: passive Perception 15
languages: Common, Elvish, Sylvan
cr: "6"
traits:
  - name: Magic Resistance
    desc: The satyr has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The satyr makes three Prance attacks.
  - name: Prance
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 13 (2d8 + 4) Bludgeoning damage, and the target has the Charmed condition until the start of the satyr's next turn."
  - name: Fey Melody (Recharge 4–6)
    desc: |-
      The satyr conjures a charming or frightening song. *Wisdom Saving Throw:* DC 14, each enemy in a 60-foot Emanation originating from the satyr. *Failure:* The target is subjected to the song's effect:

      - **Charming.** The target has the Charmed condition for 1 minute. While Charmed, the target has the Incapacitated condition and uses all its movement to dance in place. The effect ends on the target if it takes any damage.  
      - **Frightening.** 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition for 1 minute. If the target ends its turn out of line of sight from the satyr, the condition ends on it.
```
