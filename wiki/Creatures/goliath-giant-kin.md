---
title: Goliath Giant-Kin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Goliath Giant-Kin
size: Medium
type: humanoid
alignment: Any alignment
ac: 18
ac_class: half plate, shield
hp: 67
hit_dice: 9d8 + 27
modifier: 1
speed: 30 ft.
stats: [ 18, 13, 16, 10, 12, 12 ]
skillsaves:
  - athletics: 6
  - perception: 3
  - survival: 3
damage_resistances: cold
gear:
  - spear
senses: passive Perception 13
languages: Common, Giant
cr: "3"
actions:
  - name: Multiattack
    desc: The goliath makes two Spear attacks.
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage, or 8 (1d8 + 4) piercing damage if used with two hands to make a melee attack."
bonus_actions:
  - name: Giant's Strikes (Recharge 5–6)
    desc: "Until the end of its turn, the goliath's melee attacks each deal an extra 7 (2d6) damage of a type determined by the goliath's giant community: cold (frost giant), fire (fire giant), force (stone giant), lightning (storm giant), piercing (hill giant), or thunder (cloud giant)."
```
