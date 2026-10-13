---
title: Deck Defender
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Deck Defender
size: Medium
type: construct
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 5 + five times your level (the deck defender has a number of Hit Dice [d8s] equal to your level)
modifier: 3
speed: 30 ft.
stats: [ 16, 16, 14, 3, 10, 1 ]
damage_immunities: poison
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, paralysed, petrified, poisoned
senses: blindsight 60 ft. (can't see beyond this radius), passive Perception 10
languages: understands one of your languages but can't speak
traits:
  - name: Allied Knight
    desc: Some of the deck defender's statistics are based on the character who drew the Knight card. Where the deck defender stat block refers to "you," it refers to that character.
  - name: Folded Versatility
    desc: After finishing a long rest, you can refold the deck defender's shape, changing it to acrobat form, berserker form, or guardian form.
  - name: Fragile
    desc: If the deck defender is reduced to 0 hit points, it collapses into a haphazard pile of nonmagical playing cards and can't be resurrected or reconstructed.
actions:
  - name: Multiattack
    desc: The deck defender makes a number of attacks equal to half its proficiency bonus (rounded down).
  - name: Paper Cut
    desc: "*Melee Weapon Attack:* PB + +3 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage."
  - name: Reckless Strike (Berserker Form Only)
    desc: "*Melee Weapon Attack:* PB + +3 to hit (with advantage), reach 5 ft., one target. *Hit:* 10 (2d6 + 3) slashing damage, and attacks made against the deck defender until the start of its next turn have advantage."
bonus_actions:
  - name: Swift Step (Acrobat Form Only)
    desc: The deck defender takes the Dash or Disengage action.
reactions:
  - name: Protection (Guardian Form Only)
    desc: When a creature the deck defender can see attacks a target other than the deck defender and is within 5 feet of the deck defender, the deck defender imposes disadvantage on the attack roll.
```
