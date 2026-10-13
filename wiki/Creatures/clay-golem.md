---
title: Clay Golem
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Construct
size: Large
habitat:
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Clay Golem
size: Large
type: construct
alignment: Unaligned
ac: 14
hp: 123
hit_dice: 13d10 + 52
modifier: 3
speed: 20 ft.
stats: [ 20, 9, 18, 3, 8, 1 ]
damage_resistances: bludgeoning, piercing, slashing
damage_immunities: acid, poison, psychic
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: Darkvision 60 ft., passive Perception 9
languages: Common plus one other language
cr: "9"
traits:
  - name: Acid Absorption
    desc: Whenever the golem is subjected to Acid damage, it takes no damage and instead regains a number of Hit Points equal to the Acid damage dealt.
  - name: Berserk
    desc: Whenever the golem starts its turn Bloodied, roll 1d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object. Once the golem goes berserk, it continues to be berserk until it is destroyed or it is no longer Bloodied.
  - name: Immutable Form
    desc: The golem can't shape-shift.
  - name: Magic Resistance
    desc: The golem has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The golem makes two Slam attacks, or it makes three Slam attacks if it used Hasten this turn.
  - name: Slam
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 10 (1d10 + 5) Bludgeoning damage plus 6 (1d12) Acid damage, and the target's Hit Point maximum decreases by an amount equal to the Acid damage taken."
bonus_actions:
  - name: Hasten (Recharge 5–6)
    desc: The golem takes the Dash and Disengage actions.
```
