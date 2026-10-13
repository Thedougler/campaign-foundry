---
title: Relentless Nightmare
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Fiend
size: Medium
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Relentless Nightmare
size: Medium
type: fiend
alignment: Neutral Evil
ac: 17
hp: 144
hit_dice: 17d8 + 68
modifier: 8
speed: 30 ft.
stats: [ 20, 18, 19, 13, 16, 18 ]
saves:
  - dex: 8
  - con: 8
  - cha: 8
condition_immunities: charmed, exhaustion, frightened
senses: Darkvision 120 ft., passive Perception 13
languages: understands all but can't speak
cr: "11"
traits:
  - name: Legendary Resistance (2/Day)
    desc: If the nightmare fails a saving throw, it can choose to succeed instead.
  - name: Nightmarish Restoration
    desc: If the nightmare dies, its body disappears into mist, and it gains a new body in 1d10 days, reviving with all its Hit Points in the nearest unoccupied space next to an Unconscious creature cursed by its Haunter's Spear. This trait doesn't function if there are no remaining targets cursed in this way.
actions:
  - name: Multiattack
    desc: The nightmare makes two Haunter's Spear attacks. It can replace one attack with a use of Exhausting Gaze.
  - name: Haunter's Spear
    desc: "*Melee or Ranged Attack Roll:* +9, reach 10 ft. or range 60 ft. *Hit:* 14 (2d8 + 5) Piercing damage plus 10 (3d6) Psychic damage. Additionally, the target is cursed by the nightmare if it isn't already. Until this curse ends, finishing a Long Rest doesn't reduce the target's Exhaustion level."
  - name: Exhausting Gaze
    desc: "*Wisdom Saving Throw:* DC 16, one creature the nightmare can see within 60 feet. *Failure:* 14 (4d6) Psychic damage, and the target gains 1 Exhaustion level."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the relentless nightmare can expend a use to take one of the following actions. The relentless nightmare regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Dreamwalk
    desc: The nightmare teleports to an unoccupied space within 5 feet of a creature it can see, then makes a Haunter's Spear attack.
  - name: Narcotize
    desc: The nightmare targets one creature it can see within 120 feet that's cursed by its Haunter's Spear. The target takes 7 (2d6) Psychic damage and has the Unconscious condition for 1 hour, until it takes damage, or until a creature within 5 feet of it takes an action to wake it.
```
