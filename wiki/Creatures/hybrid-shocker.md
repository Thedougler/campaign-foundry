---
title: Hybrid Shocker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hybrid Shocker
size: Medium
type: humanoid
subtype: simic hybrid
alignment: Neutral Good
ac: 12
hp: 39
hit_dice: 6d8 + 12
modifier: 2
speed: 30 ft.
stats: [ 13, 14, 14, 10, 12, 9 ]
damage_immunities: lightning
senses: passive Perception 11
languages: Common plus any one language
cr: "1"
traits:
  - name: Electrified Body
    desc: Any creature that touches the hybrid or hits it with a melee attack while within 5 feet of it takes 5 (1d10) lightning damage.
  - name: Illumination
    desc: The hybrid sheds bright light in a 10-foot radius and dim light for an additional 10 feet.
actions:
  - name: Multiattack
    desc: "The hybrid makes two attacks: one with its shocking touch and one with its tentacles."
  - name: Shocking Touch
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 9 (2d8) lightning damage."
  - name: Tentacles
    desc: "*Melee Weapon Attack:* +4 to hit, reach 15 ft., one creature. *Hit:* The target is grappled (escape DC 11), and the hybrid pulls the target up to 15 feet straight toward it. Until this grapple ends, the target takes 5 (1d10) lightning damage at the start of each of its turns, and the hybrid shocker can't use its tentacles on another creature."
```
