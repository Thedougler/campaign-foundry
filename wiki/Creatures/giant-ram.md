---
title: Giant Ram
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fey
size: Large
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giant Ram
size: Large
type: fey
alignment: Unaligned
ac: 13
ac_class: natural armour
hp: 28
hit_dice: 3d10 + 12
modifier: 1
speed: 50 ft.
stats: [ 19, 12, 18, 3, 14, 10 ]
damage_resistances: cold, fire, lightning
senses: passive Perception 12
cr: "1"
traits:
  - name: Magic Resistance
    desc: The ram has advantage on saving throws against spells and other magical effects.
actions:
  - name: Ram
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 9 (2d4 + 4) bludgeoning damage plus 3 (1d6) force damage. If the ram moved at least 20 feet straight toward the target immediately before the hit, the target must succeed on a DC 14 Strength saving throw or have the prone condition."
  - name: Force Bolt
    desc: "*Ranged Spell Attack:* +4 to hit, range 30 ft., one target. *Hit:* 7 (2d6) force damage."
reactions:
  - name: Absorbent Fleece (Recharge 6)
    desc: Immediately after the ram succeeds on a saving throw against a spell or a spell's attack misses it, the ram can make one Force Bolt attack.
```
