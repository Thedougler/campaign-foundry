---
title: Vampire Nosferatu
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Undead
size: Small or Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampire Nosferatu
size: Small or Medium
type: undead
alignment: Chaotic Evil
ac: 16
hp: 85
hit_dice: 9d8 + 45
modifier: 7
speed: 40 ft., climb 40 ft.
stats: [ 20, 18, 21, 6, 17, 14 ]
saves:
  - dex: 7
  - con: 8
  - wis: 6
skillsaves:
  - perception: 6
  - stealth: 10
damage_resistances: necrotic
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: Darkvision 120 ft., passive Perception 16
languages: Common plus one other language
cr: "8"
traits:
  - name: Blood Frenzy
    desc: The nosferatu has Advantage on attack rolls against any creature that doesn't have all its Hit Points.
  - name: Regeneration
    desc: The nosferatu regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point. If the nosferatu takes Radiant damage, this trait doesn't function on the nosferatu's next turn.
  - name: Spider Climb
    desc: The nosferatu can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - name: Sunlight Hypersensitivity
    desc: The nosferatu takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.
actions:
  - name: Multiattack
    desc: The nosferatu makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 9 (1d8 + 5) Piercing damage plus 11 (2d10) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the nosferatu regains Hit Points equal to that amount."
  - name: Claw
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 9 (1d8 + 5) Slashing damage."
  - name: Blood Spew (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 16, each creature in a 15-foot Cone. *Failure:* 27 (6d8) Necrotic damage, and the creature can't regain Hit Points for 1 minute. *Success:* Half damage only."
reactions:
  - name: Bloodthirsty Slash
    desc: "Trigger: A Bloodied creature the nosferatu can see within 40 feet takes damage. _Response:_ The nosferatu moves up to its Speed without provoking Opportunity Attacks and makes a Claw attack against the triggering creature."
```
