---
title: Nycaloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Fiend
size: Large
habitat:
  - Planar (Gehenna)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nycaloth
size: Large
type: fiend
subtype: yugoloth
alignment: Neutral Evil
ac: 18
hp: 152
hit_dice: 16d10 + 64
modifier: 4
speed: 40 ft., fly 60 ft.
stats: [ 20, 11, 19, 12, 10, 15 ]
skillsaves:
  - perception: 4
  - stealth: 4
damage_resistances: cold, fire, lightning
damage_immunities: acid, poison
condition_immunities: poisoned
senses: Blindsight 60 ft., passive Perception 14
languages: Abyssal, Infernal; telepathy 60 ft.
cr: "9"
traits:
  - name: Fiendish Restoration
    desc: If the nycaloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in Gehenna.
  - name: Magic Resistance
    desc: The nycaloth has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The nycaloth makes two Mercurial Axe attacks.
  - name: Mercurial Axe
    desc: "*Melee or Ranged Attack Roll:* +9, reach 10 ft. or range 30/90 ft. *Hit:* 18 (2d12 + 5) Slashing damage plus 10 (3d6) Force damage. *Hit or Miss:* The axe magically returns to the nycaloth's hand immediately after a ranged attack."
bonus_actions:
  - name: Shadowy Teleport
    desc: The nycaloth has the Invisible condition for 1 minute, and it teleports up to 30 feet to an unoccupied space it can see. The condition ends early immediately after it deals damage.
```
