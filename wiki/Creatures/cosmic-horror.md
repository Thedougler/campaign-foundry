---
title: Cosmic Horror
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Aberration
size: Gargantuan
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cosmic Horror
size: Gargantuan
type: aberration
alignment: typically Neutral Evil
ac: 15
ac_class: natural armour
hp: 280
hit_dice: 16d20 + 112
modifier: 0
speed: 50 ft., fly 100 ft.
stats: [ 27, 10, 25, 24, 15, 24 ]
saves:
  - int: 13
  - wis: 8
  - cha: 13
damage_immunities: acid, poison
condition_immunities: charmed, frightened, poisoned
senses: darkvision 240 ft., passive Perception 12
languages: Deep Speech, telepathy 240 ft.
cr: "18"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the horror fails a saving throw, it can choose to succeed instead.
  - name: Unusual Nature
    desc: The horror doesn't require air.
actions:
  - name: Multiattack
    desc: The horror makes one Bite attack and two Tentacle attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +14 to hit, reach 10 ft., one target. *Hit:* 22 (4d6 + 8) piercing damage."
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +14 to hit, reach 30 ft., one target. *Hit:* 18 (3d6 + 8) force damage, and if the target is a creature, it is grappled (escape DC 18). Until this grapple ends, the horror can't use this tentacle against other targets. The horror has 1d8 + 1 tentacles, each of which can grapple one target."
  - name: Psychic Whispers (Recharge 5–6)
    desc: The horror emits dreadful whispers in a 60-foot-radius sphere centred on itself. Each creature in the sphere that isn't an Aberration must make a DC 21 Wisdom saving throw, taking 33 (6d10) psychic damage on a failed save, or half as much damage on a successful one.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the cosmic horror can expend a use to take one of the following actions. The cosmic horror regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Crushing Tentacle
    desc: The horror crushes one creature it is grappling. The grappled creature must make a DC 22 Constitution saving throw, taking 18 (3d6 + 8) force damage on a failed save, or half as much damage on a successful one.
  - name: Poison Jet (Costs 2 Actions)
    desc: Foul gas squirts from the horror in a 30-foot line that is 5 feet wide. Each creature in the line must succeed on a DC 21 Constitution saving throw or take 14 (4d6) poison damage.
  - name: Teleport (Costs 2 Actions)
    desc: The horror teleports, along with any creatures it is grappling, to an unoccupied space it can see within 120 feet of itself.
```
