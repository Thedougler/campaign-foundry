---
title: Swarm of Maggots
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Beast
size: Medium
habitat: []
sourcebooks:
  - Van Richten's Guide to Ravenloft
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Maggots
size: Medium
type: beast
alignment: Unaligned
ac: 11
hp: 22
hit_dice: 5d8
modifier: 1
speed: 20 ft., swim 20 ft.
stats: [ 3, 12, 10, 1, 7, 1 ]
damage_resistances: bludgeoning, piercing, slashing
condition_immunities: charmed, frightened, grappled, paralysed, petrified, prone, restrained, stunned
senses: blindsight 10 ft., passive Perception 8
cr: "2"
traits:
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny maggot. The swarm can't regain hit points or gain temporary hit points.
actions:
  - name: Infestation
    desc: |-
      *Melee Weapon Attack:* +3 to hit, reach 0 ft., one target in the swarm's space. *Hit:* 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer. A creature damaged by the swarm must succeed on a DC 12 Constitution saving throw or contract a disease.

      Each time the diseased creature finishes a long rest, roll a d6 to determine the disease's effect:

      - **1–2.** The creature is blinded until it finishes a long rest.  
      - **3–4.** The creature's hit point maximum decreases by 5 (2d4), and the reduction can't be removed until the disease ends. The creature dies if its hit point maximum drops to 0.  
      - **5–6.** The creature has disadvantage on ability checks and attack rolls until it finishes its next long rest.  

          The disease lasts until it's removed by magic or until the creature rolls the same random effect for the disease two long rests in a row.
```
