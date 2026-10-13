---
title: Hybrid Poisoner
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
name: Hybrid Poisoner
size: Medium
type: humanoid
subtype: simic hybrid
alignment: Neutral Good
ac: 14
hp: 26
hit_dice: 4d8 + 8
modifier: 4
speed: 40 ft.
stats: [ 12, 19, 14, 12, 13, 12 ]
saves:
  - dex: 6
  - con: 4
skillsaves:
  - athletics: 3
  - perception: 3
  - stealth: 6
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 30 ft., passive Perception 13
languages: Common plus any one language
cr: "1"
traits:
  - name: Assassinate
    desc: During its first turn, the hybrid poisoner has advantage on attack rolls against any creature that hasn't taken a turn. Any hit the hybrid scores against a surprised creature is a critical hit.
  - name: Poisonous Skin
    desc: Any creature that touches the hybrid or hits it with a melee attack while within 5 feet of it takes 3 (1d6) poison damage.
actions:
  - name: Toxic Touch
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (2d6) bludgeoning damage, and the target must succeed on a DC 12 Constitution saving throw or become poisoned for 1 minute. At the end of each of the poisoned target's turns, it must repeat the save, taking 3 (1d6) poison damage on a failed save, or ending the effect on itself on a successful one."
```
