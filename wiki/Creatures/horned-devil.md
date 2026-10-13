---
title: Horned Devil
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Fiend
size: Large
habitat:
  - Planar (Nine Hells)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Horned Devil
size: Large
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 18
hp: 199
hit_dice: 19d10 + 95
modifier: 7
speed: 30 ft., fly 60 ft.
stats: [ 22, 17, 21, 12, 16, 18 ]
saves:
  - str: 10
  - dex: 7
  - wis: 7
  - cha: 8
damage_immunities: fire, poison
condition_immunities: poisoned
senses: Darkvision 150 ft. (unimpeded by magical Darkness), passive Perception 13
languages: Infernal; telepathy 120 ft.
cr: "11"
traits:
  - name: Diabolical Restoration
    desc: If the devil dies outside the Nine Hells, its body disappears in sulphurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  - name: Magic Resistance
    desc: The devil has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The devil makes three attacks, using Searing Fork or Hurl Flame in any combination. It can replace one attack with a use of Infernal Tail.
  - name: Searing Fork
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 15 (2d8 + 6) Piercing damage plus 9 (2d8) Fire damage."
  - name: Hurl Flame
    desc: "*Ranged Attack Roll:* +8, range 150 ft. *Hit:* 26 (5d8 + 4) Fire damage. If the target is a flammable object that isn't being worn or carried, it starts burning."
  - name: Infernal Tail
    desc: "*Dexterity Saving Throw:* DC 17, one creature the devil can see within 10 feet. *Failure:* 10 (1d8 + 6) Necrotic damage, and the target receives an infernal wound if it doesn't have one. While wounded, the target loses 10 (3d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, doing so by succeeding on a DC 17 Wisdom (Medicine) check."
```
