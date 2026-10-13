---
title: Cradle of the Frost Scion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 24
creature_type: Elemental
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cradle of the Frost Scion
size: Gargantuan
type: elemental
alignment: typically Neutral Evil
ac: 20
ac_class: natural armour
hp: 499
hit_dice: 27d20 + 216
modifier: 2
speed: 40 ft., swim 40 ft.
stats: [ 27, 14, 26, 11, 19, 16 ]
saves:
  - wis: 11
  - cha: 10
damage_resistances: fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: cold, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 120 ft., passive Perception 14
languages: Giant, Primordial
cr: "24"
traits:
  - name: Awakening of the Scion
    desc: The cradle is a container for the scion of Thrym. When the cradle drops to 0 hit points, its body shatters into shards of ice. The scion instantly appears in the space the cradle occupied and uses the cradle's initiative count.
  - name: Legendary Resistance (5/Day)
    desc: If the cradle fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The cradle has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The cradle deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The cradle makes two Slam or Hurl Icicle attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +15 to hit, reach 20 ft., one target. *Hit:* 30 (4d10 + 8) bludgeoning damage plus 11 (2d10) cold damage."
  - name: Hurl Icicle
    desc: "*Ranged Weapon Attack:* +15 to hit, range 120 ft., one target. *Hit:* 26 (4d8 + 8) piercing damage plus 9 (2d8) cold damage, and the target must succeed on a DC 23 Strength saving throw or have the prone condition."
  - name: Freezing Breath (Recharge 5–6)
    desc: |-
      The cradle exhales a blast of frost in a 90-foot cone. Each creature in that area must make a DC 23 Constitution saving throw. On a failed save, a creature takes 52 (8d12) cold damage, and its speed is reduced to 0 until the end of its next turn. On a successful save, a creature takes half as much damage only. If this damage would reduce the target to 0 hit points, the target drops to 1 hit point instead and has the petrified condition, turning into a frozen statue.

      If the statue takes bludgeoning damage, it shatters, killing the frozen creature. If the statue would take fire damage, it instead takes no damage and thaws, ending the petrification.
bonus_actions:
  - name: Chilling Mist
    desc: The cradle magically conjures a cloud of chilling mist that fills a 30-foot-radius sphere centred on a point it can see within 90 feet of itself. The mist spreads around corners. Each creature in that area must succeed on a DC 19 Constitution saving throw or take 28 (8d6) cold damage and be unable to use reactions until the start of its next turn. The mist vanishes at the end of the cradle's turn.
```
