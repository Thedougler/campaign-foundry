---
title: Chasme
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Fiend
size: Large
habitat:
  - Planar (Abyss)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Chasme
size: Large
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 15
hp: 78
hit_dice: 12d10 + 12
modifier: 5
speed: 20 ft., fly 60 ft.
stats: [ 15, 15, 12, 11, 14, 10 ]
saves:
  - dex: 5
  - wis: 5
skillsaves:
  - perception: 5
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: Blindsight 10 ft., Darkvision 120 ft., passive Perception 15
languages: Abyssal; telepathy 120 ft.
cr: "6"
traits:
  - name: Demonic Restoration
    desc: If the chasme dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - name: Magic Resistance
    desc: The chasme has Advantage on saving throws against spells and other magical effects.
  - name: Spider Climb
    desc: The chasme can climb difficult surfaces, including along ceilings, without needing to make an ability check.
actions:
  - name: Proboscis
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 16 (4d6 + 2) Piercing damage plus 21 (6d6) Necrotic damage. If the target is a creature, its Hit Point maximum decreases by an amount equal to the Necrotic damage taken."
bonus_actions:
  - name: Drone
    desc: "*Constitution Saving Throw:* DC 12, each creature in a 30-foot Emanation originating from the chasme (demons automatically succeed on this save). *Failure:* The target has the Unconscious condition and repeats the save at the end of each of its turns. The target succeeds automatically after 10 minutes or if it takes damage or a creature within 5 feet of it takes an action to empty a flask of Holy Water on it. *Success:* The target is immune to this chasme's Drone for 24 hours."
```
