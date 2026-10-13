---
title: Cradle of the Stone Scion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: Elemental
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cradle of the Stone Scion
size: Gargantuan
type: elemental
alignment: typically Neutral
ac: 20
ac_class: natural armour
hp: 455
hit_dice: 26d20 + 182
modifier: 2
speed: 40 ft.
stats: [ 26, 15, 24, 11, 18, 10 ]
saves:
  - wis: 11
  - cha: 7
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned, prone
senses: tremorsense 120 ft., passive Perception 14
languages: Giant, Primordial
cr: "23"
traits:
  - name: Awakening of the Scion
    desc: The cradle is a container for the scion of Skoraeus. When the cradle drops to 0 hit points, its body crumbles to dust. The scion instantly appears in the space the cradle occupied and uses the cradle's initiative count.
  - name: Legendary Resistance (5/Day)
    desc: If the cradle fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The cradle has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The cradle deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The cradle makes two Slam or Spit Rock attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +15 to hit, reach 20 ft., one target. *Hit:* 30 (4d10 + 8) bludgeoning damage."
  - name: Spit Rock
    desc: "*Ranged Weapon Attack:* +15 to hit, range 120 ft., one target. *Hit:* 24 (3d10 + 8) bludgeoning damage, and the target must succeed on a DC 23 Strength saving throw or have the prone condition."
  - name: Shattering Roar (Recharge 5–6)
    desc: The cradle lets out a painfully loud roar. Each creature within 60 feet of the cradle must make a DC 23 Constitution saving throw. On a failed save, a creature takes 33 (6d10) thunder damage and has the incapacitated condition until the end of its next turn.
bonus_actions:
  - name: Crystal Flare
    desc: The cradle causes the crystals on its body to flare with light. Each creature within 30 feet of the cradle must succeed on a DC 22 Constitution saving throw or take 21 (6d6) radiant damage and have the blinded condition until the end of the cradle's next turn.
  - name: Stone Spikes
    desc: The cradle causes the ground in a 20-foot square within 90 feet of itself to sprout crystal spikes until the start of its next turn. The area becomes difficult terrain for the duration. A creature takes 10 (3d6) piercing damage for each 5 feet it moves on this terrain.
```
