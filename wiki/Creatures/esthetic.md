---
title: Esthetic
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Aberration
size: Gargantuan
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aesthetic
size: Gargantuan
type: aberration
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 217
hit_dice: 14d20 + 70
modifier: -1
speed: 0 ft., fly 60 ft. (hover)
stats: [ 24, 8, 20, 1, 10, 1 ]
damage_immunities: acid
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, petrified, prone
senses: blindsight 300 ft. (blind beyond this radius), passive Perception 12
cr: "12"
traits:
  - name: Bioluminescence
    desc: While it has at least 1 hit point, the aesthetic sheds bright light in a 30-foot radius and dim light for an additional 30 feet, and its interior compartments are dimly lit.
  - name: Spelljamming
    desc: The aesthetic has the properties of a spelljamming helm (see the Astral Adventurer's Guide), but only its reigar creator can attune to it.
  - name: Unusual Nature
    desc: The aesthetic doesn't require air, food, or drink.
actions:
  - name: Multiattack
    desc: The aesthetic makes two Tentacle attacks.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +11 to hit, reach 30 ft., one target. *Hit:* 17 (3d6 + 7) force damage, and if the target is a creature, it is grappled (escape DC 17). Until this grapple ends, the creature takes 18 (4d8) acid damage at the start of each of its turns, and the aesthetic can't use this tentacle against other targets. The aesthetic has 1d4 × 2 tentacles, each of which can grapple one target."
bonus_actions:
  - name: Jammerscream (Recharge 6)
    desc: The aesthetic targets one spelljamming ship within 300 feet of itself, magically suppressing the properties of the ship's spelljamming helm for 2d10 days. If the ship has more than one helm aboard it, randomly determine which helm is affected. A creature attuned to that helm can choose to make a DC 17 Charisma saving throw. On a failed save, the creature takes 42 (12d6) psychic damage, and the helm is suppressed for 2d10 hours instead of 2d10 days. On a successful save, the creature takes half as much damage, and the helm is suppressed for 2d10 minutes instead of 2d10 days.
```
