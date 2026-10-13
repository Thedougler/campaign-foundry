---
title: Vampire Mind Flayer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Undead
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampire Mind Flayer
size: Medium
type: undead
alignment: Chaotic Evil
ac: 15
hp: 85
hit_dice: 10d8 + 40
modifier: 4
speed: 30 ft., climb 30 ft.
stats: [ 18, 18, 18, 5, 15, 18 ]
saves:
  - dex: 7
  - wis: 5
  - cha: 7
skillsaves:
  - perception: 5
  - stealth: 7
damage_resistances: necrotic, psychic
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: Darkvision 120 ft., passive Perception 15
languages: understands Deep Speech but can't speak
cr: "5"
traits:
  - name: Spider Climb
    desc: The mind flayer can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - name: Sunlight Hypersensitivity
    desc: The mind flayer takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.
actions:
  - name: Multiattack
    desc: The mind flayer makes two Claw attacks, or one Claw attack and one Tentacles attack, and uses Mind Burst if available.
  - name: Claw
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 8 (1d8 + 4) Slashing damage plus 10 (3d6) Necrotic damage."
  - name: Tentacles
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 11 (2d6 + 4) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 14)."
  - name: Drink Sapience
    desc: "*Wisdom Saving Throw:* DC 15, one creature the mind flayer has Grappled. *Failure:* 21 (6d6) Psychic damage, and the creature gains 1 Exhaustion level. The target's Hit Point maximum decreases by an amount equal to the Psychic damage taken, and the mind flayer regains Hit Points equal to that amount."
  - name: Mind Burst (Recharge 5–6)
    desc: "*Intelligence Saving Throw:* DC 15, each creature in a 30-foot Emanation originating from the mind flayer. *Failure:* The target has the Incapacitated condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
```
