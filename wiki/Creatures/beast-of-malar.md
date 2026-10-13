---
title: Beast of Malar
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Monstrosity
size: Medium
habitat:
  - Coastal
  - Forest
  - Hill
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Beast of Malar
size: Medium
type: monstrosity
alignment: Chaotic Evil
ac: 17
hp: 168
hit_dice: 16d8 + 96
modifier: 7
speed: 50 ft., burrow 40 ft. (land form only), fly 60 ft. (sky form only), swim 40 ft. (sea form only)
stats: [ 21, 16, 23, 10, 14, 12 ]
saves:
  - str: 9
skillsaves:
  - perception: 10
  - stealth: 7
condition_immunities: charmed, frightened
senses: Darkvision 60 ft., passive Perception 20
languages: understands Common but can't speak
cr: "11"
traits:
  - name: Amphibious (Sea Form Only)
    desc: The beast breathes air and water.
  - name: Divine Immortality
    desc: If the beast dies, its body dissolves into black goo, and it gains a new body after 1d10 days, reviving with all its Hit Points in a place of Malar's choosing.
  - name: Legendary Resistance (3/Day)
    desc: If the beast fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The beast has Advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: The beast regains 20 Hit Points at the start of its turn. If the beast takes Radiant damage or damage from a Critical Hit, this trait doesn't function at the start of the beast's next turn. The beast dies only if it starts its turn with 0 Hit Points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: The beast makes three attacks, using Bite or Claws in any combination.
  - name: Bite
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 23 (4d8 + 5) Piercing damage."
  - name: Claws (Land or Sky Form Only)
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 18 (3d8 + 5) Slashing damage. If the target is Large or smaller, it has the Prone condition."
bonus_actions:
  - name: Recuperative Shape-Shift
    desc: The beast shape-shifts into its land form, sea form, or sky form and regains 9 (2d8) Hit Points. Its game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.
```
