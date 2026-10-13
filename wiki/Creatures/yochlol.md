---
title: Yochlol
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Fiend
size: Medium
habitat:
  - Planar (Abyss)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yochlol
size: Medium
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 15
hp: 153
hit_dice: 18d8 + 72
modifier: 8
speed: 30 ft., climb 30 ft.
stats: [ 15, 19, 18, 13, 15, 17 ]
saves:
  - dex: 8
  - int: 5
  - wis: 6
  - cha: 7
skillsaves:
  - deception: 11
  - insight: 6
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: Darkvision 120 ft., passive Perception 12
languages: Abyssal, Elvish, Undercommon
cr: "10"
traits:
  - name: Demonic Restoration
    desc: If the yochlol dies outside the Abyss, its body dissolves, and it gains a new body instantly, reviving with all its Hit Points in the Abyss.
  - name: Magic Resistance
    desc: The yochlol has Advantage on saving throws against spells and other magical effects.
  - name: Spider Climb
    desc: The yochlol can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - name: Web Walker
    desc: The yochlol ignores movement restrictions caused by webs.
actions:
  - name: Multiattack
    desc: The yochlol makes two Caustic Lash attacks, and it can use Spellcasting to cast *Web* or *Dominate Person* if available.
  - name: Caustic Lash
    desc: "*Melee or Ranged Attack Roll:* +8, reach 10 ft. or range 120 ft. *Hit:* 25 (6d6 + 4) Acid damage."
  - name: Spellcasting
    desc: |-
      The yochlol casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):

      **At will:** *Detect Thoughts*, *Gaseous Form* (self only), *Web*

      **1/day:** *Dominate Person*
bonus_actions:
  - name: Shape-Shift
    desc: The yochlol shape-shifts into a Medium Humanoid or a Medium spider or back into its true form. Its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
reactions:
  - name: Toxic Escape
    desc: "Trigger: The yochlol is hit by an attack roll. _Response:_ The yochlol halves the attack's damage to itself (round down), and it teleports to an unoccupied space it can see within 30 feet of itself. *Constitution Saving Throw:* DC 15, each creature within 5 feet of the yochlol's destination space. *Failure:* The target has the Poisoned condition until the end of its next turn. While Poisoned, it has the Incapacitated condition."
```
