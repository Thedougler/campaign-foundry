---
title: Troll Amalgam
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Giant
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Troll Amalgam
size: Gargantuan
type: giant
alignment: typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 217
hit_dice: 14d20 + 70
modifier: 2
speed: 60 ft., climb 60 ft.
stats: [ 25, 14, 21, 9, 16, 5 ]
saves:
  - con: 11
  - wis: 9
skillsaves:
  - perception: 9
damage_resistances: poison; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, frightened, poisoned
senses: darkvision 120 ft., passive Perception 19
languages: Giant, Undercommon
cr: "17"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the amalgam fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The amalgam has advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: The amalgam regains 15 hit points at the start of its turn. If the amalgam takes acid or fire damage, it regains only 5 hit points at the start of its next turn. The amalgam dies only if it takes 20 or more acid or fire damage while it has 0 hit points.
actions:
  - name: Multiattack
    desc: The amalgam makes three Rend attacks.
  - name: Rend
    desc: "*Melee Weapon Attack:* +13 to hit, reach 15 ft., one target. *Hit:* 25 (4d8 + 7) slashing damage."
bonus_actions:
  - name: Fling Limb (3/Day)
    desc: |-
      *Ranged Weapon Attack:* +13 to hit, range 60/240 ft., one target. *Hit:* 11 (1d8 + 7) bludgeoning damage. If the limb hits a Medium or smaller creature, that creature has the grappled condition (escape DC 17). The limb has the statistics of a troll amalgam, except for the following: it is Medium, it has 45 hit points, its speed is 30 ft., it doesn't have a challenge rating or Legendary Resistance, and the only action it can take is the Attack action, which it can use only to grapple.

      Until this grapple ends, the target has the restrained condition and takes 25 (4d8 + 7) slashing damage at the start of each of its turns. If the limb is not destroyed within 24 hours of being flung, roll a d12; on a roll of 12, the limb regenerates into a troll (see the Monster Manual). Otherwise, the limb withers away.
```
