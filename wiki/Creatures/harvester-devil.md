---
title: Harvester Devil
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fiend
size: Medium
habitat:
  - Planar (Nine Hells)
sourcebooks:
  - Astarion's Book of Hungers
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Harvester Devil
size: Medium
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 14
hp: 65
hit_dice: 10d8 + 20
modifier: 3
speed: 30 ft.
stats: [ 12, 17, 14, 14, 13, 19 ]
saves:
  - con: 4
  - wis: 3
skillsaves:
  - perception: 3
  - persuasion: 8
  - stealth: 5
damage_resistances: cold
damage_immunities: fire, poison
condition_immunities: charmed, poisoned
senses: Darkvision 120 ft. (unimpeded by magical Darkness), passive Perception 13
languages: Common, Infernal; telepathy 120 ft.
cr: "3"
traits:
  - name: Diabolic Ward
    desc: Attack rolls against the devil have Disadvantage. If the devil makes an attack roll, this trait is suppressed until the start of its next turn.
  - name: Diabolical Restoration
    desc: If the devil dies outside the Nine Hells, its body disappears in sulphurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - name: Magic Resistance
    desc: The devil has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The devil makes two attacks, using Infernal Blade or Confounding Ray in any combination.
  - name: Infernal Blade
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Slashing damage and 7 (2d6) Fire damage."
  - name: Confounding Ray
    desc: "*Ranged Attack Roll:* +5, range 120 ft. *Hit:* 13 (2d12) Psychic damage. If the target is a creature, it can't make Opportunity Attacks until the start of the devil's next turn."
  - name: Compelling Contract (1/Day)
    desc: "*Charisma Saving Throw:* DC 14, one creature within 30 feet of the devil. *Failure:* The target has the Charmed condition. While it is Charmed, it has the Stunned condition, except the target can speak. If the target agrees to the devil's contract, the effect ends. Otherwise, the target repeats the save whenever it takes damage and at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
```
