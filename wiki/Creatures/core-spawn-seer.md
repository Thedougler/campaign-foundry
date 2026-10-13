---
title: Core Spawn Seer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Core Spawn Seer
size: Medium
type: aberration
alignment: Chaotic Evil
ac: 17
ac_class: natural armour
hp: 153
hit_dice: 18d8 + 72
modifier: 1
speed: 30 ft.
stats: [ 14, 12, 18, 22, 19, 16 ]
saves:
  - dex: 6
  - int: 11
  - wis: 9
  - cha: 8
skillsaves:
  - perception: 9
damage_immunities: psychic
condition_immunities: charmed, frightened
senses: blindsight 60 ft., tremorsense 60 ft., passive Perception 19
languages: Common, Deep Speech, telepathy 120 ft., Undercommon
cr: "13"
traits:
  - name: Earth Glide
    desc: The seer can traverse through nonmagical, unworked earth and stone. While doing so, the seer doesn't disturb the material it moves through.
  - name: Magic Resistance
    desc: The seer has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The seer uses Fission Staff twice, Psychedelic Orb twice, or each one once.
  - name: Fission Staff
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one creature. *Hit:* 9 (1d6 + 6) bludgeoning damage plus 18 (4d8) radiant damage, and the target is knocked prone."
  - name: Psychedelic Orb
    desc: "The seer hurls a glimmering orb at one creature it can see within 120 of it. The target must succeed on a DC 19 Wisdom saving throw or take 27 (5d10) psychic damage and suffer a random condition until the start of the seer's next turn. Roll a d6 for the condition: (1–2) blinded, (3–4) frightened, or (5–6) stunned."
reactions:
  - name: Fuse Damage
    desc: When the seer is hit by an attack, it takes only half of the triggering damage. The first time the seer hits with a melee attack on its next turn, the target takes an extra 1d6 radiant damage.
```
