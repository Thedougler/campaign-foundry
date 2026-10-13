---
title: Mezzoloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Fiend
size: Medium
habitat:
  - Planar (Gehenna)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mezzoloth
size: Medium
type: fiend
subtype: yugoloth
alignment: Neutral Evil
ac: 18
hp: 75
hit_dice: 10d8 + 30
modifier: 3
speed: 40 ft.
stats: [ 18, 11, 16, 7, 14, 10 ]
skillsaves:
  - perception: 5
damage_resistances: cold, fire, lightning
damage_immunities: acid, poison
condition_immunities: poisoned
senses: Blindsight 60 ft., Darkvision 60 ft., passive Perception 15
languages: Abyssal, Infernal; telepathy 60 ft.
cr: "5"
traits:
  - name: Fiendish Restoration
    desc: If the mezzoloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in Gehenna.
  - name: Magic Resistance
    desc: The mezzoloth has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The mezzoloth makes two attacks, using Claws or Mercurial Trident in any combination.
  - name: Claws
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 9 (2d4 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from two of four claws, and it has the Restrained condition until the grapple ends."
  - name: Mercurial Trident
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 20/60 ft. *Hit:* 8 (1d8 + 4) Piercing damage plus 10 (3d6) Force damage. *Hit or Miss:* The trident magically returns to the mezzoloth's claw immediately after a ranged attack."
  - name: Spellcasting
    desc: |-
      The mezzoloth casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13):

      **1/day each:** *Cloudkill*, *Darkness*, *Dispel Magic*
bonus_actions:
  - name: Teleport (Recharge 5–6)
    desc: The mezzoloth teleports up to 60 feet to an unoccupied space it can see. It can teleport one creature it is grappling to an unoccupied space within 5 feet of its destination space.
```
