---
title: Shoggoth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Aberration
size: Huge
habitat:
  - Arctic
  - Coastal
  - Swamp
  - Underdark
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shoggoth
size: Huge
type: aberration
alignment: Chaotic Evil
ac: 15
hp: 172
hit_dice: 15d12 + 75
modifier: 7
speed: 30 ft., climb 30 ft., swim 30 ft.
stats: [ 22, 16, 21, 20, 17, 8 ]
saves:
  - dex: 7
  - con: 9
damage_resistances: bludgeoning, piercing, slashing
damage_immunities: cold
condition_immunities: grappled, prone, restrained
senses: Darkvision 120 ft., passive Perception 13
languages: Deep Speech; telepathy 60 ft.
cr: "11"
traits:
  - name: Amphibious
    desc: The shoggoth can breathe air and water.
  - name: Mimicry
    desc: The shoggoth can mimic voices and animal sounds. A creature that hears this mimicry can tell it is an imitation only with a successful DC 13 Wisdom (Insight) check.
  - name: Susceptible to Charm
    desc: The shoggoth has Disadvantage on saving throws to avoid or end the Charmed condition.
actions:
  - name: Multiattack
    desc: The shoggoth makes three Pseudopod attacks. It can replace one attack with a use of Suction Burst if available.
  - name: Pseudopod
    desc: "*Melee Attack Roll:* +10, reach 15 ft. *Hit:* 15 (2d8 + 6) Bludgeoning damage plus 11 (2d10) Thunder damage, and the creature has the Grappled condition (escape DC 16) from one of four pseudopods."
  - name: Suction Burst (Recharge 4–6)
    desc: "*Strength Saving Throw:* DC 18, one creature Grappled by the shoggoth. *Failure:* 22 (4d10) Thunder damage, and the target is repelled from the shoggoth. The target no longer has the Grappled condition, is pushed up to 30 feet straight away from the shoggoth, and has the Deafened and Stunned conditions until the end of its next turn. *Success:* Half damage only."
reactions:
  - name: Cold Sprint
    desc: "Trigger: The shoggoth is subjected to Cold damage. _Response:_ The shoggoth moves up to its Speed and can make one Pseudopod attack with Advantage."
```
