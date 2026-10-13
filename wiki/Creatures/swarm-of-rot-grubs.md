---
title: Swarm of Rot Grubs
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Beast
size: Medium
habitat:
  - Swamp
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Rot Grubs
size: Medium
type: beast
alignment: Unaligned
ac: 8
hp: 22
hit_dice: 5d8
modifier: -2
speed: 5 ft., climb 5 ft.
stats: [ 2, 7, 10, 1, 2, 1 ]
damage_vulnerabilities: fire
damage_resistances: piercing, slashing
condition_immunities: charmed, frightened, grappled, paralysed, petrified, prone, restrained
senses: blindsight 10 ft., passive Perception 6
cr: 1/2
traits:
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny maggot. The swarm can't regain hit points or gain temporary hit points.
actions:
  - name: Bites
    desc: "*Melee Weapon Attack:* +0 to hit, reach 0 ft., one creature in the swarm's space. *Hit:* 7 (2d6) piercing damage, and the target must succeed on a DC 10 Constitution saving throw or be poisoned. At the end of each of the poisoned target's turns, the target takes 3 (1d6) poison damage. Whenever the poisoned target takes fire damage, the target can repeat the saving throw, ending the effect on itself on a success. If the poisoned target ends its turn with 0 hit points, it dies."
```
