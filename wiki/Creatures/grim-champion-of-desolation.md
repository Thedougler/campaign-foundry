---
title: Grim Champion of Desolation
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 25
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Grim Champion of Desolation
size: Medium
type: undead
alignment: Lawful Evil
ac: 18
ac_class: studded leather armour
hp: 416
hit_dice: 49d8 + 196
modifier: 6
speed: 30 ft.
stats: [ 22, 23, 18, 12, 20, 19 ]
saves:
  - dex: 14
  - con: 12
  - wis: 13
skillsaves:
  - deception: 12
  - insight: 13
  - perception: 13
  - stealth: 14
damage_resistances: cold; necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, poisoned, stunned, unconscious
senses: darkvision 60 ft., passive Perception 23
languages: Common, Elvish
cr: "25"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the champion fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The champion makes two Leeching Blade attacks and uses Hollow Void.
  - name: Leeching Blade
    desc: "*Melee Weapon Attack:* +14 to hit, reach 5 ft., one target. *Hit:* 13 (2d6 + 6) slashing damage plus 33 (6d10) cold damage, and the champion regains 10 hit points."
  - name: Hollow Void
    desc: The champion summons a hungering rift around a creature it can see within 120 feet of itself. The creature must make a DC 22 Constitution saving throw. On a failed save, the creature takes 49 (11d8) force damage and has the stunned condition until the start of the champion's next turn. On a successful save, the creature takes half as much damage only. If a creature is reduced to 0 hit points by this effect, the creature dies, and its body crumbles to dust.
bonus_actions:
  - name: Step into Nothing (Recharge 4–6)
    desc: The champion, along with any equipment it is wearing or carrying, has the invisible condition and teleports to an unoccupied space it can see within 30 feet of itself. The champion remains invisible until the start of its next turn or immediately after it deals damage.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the grim champion of desolation can expend a use to take one of the following actions. The grim champion of desolation regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Crush
    desc: The champion unleashes a burst of crushing force on a creature it can see within 30 feet of itself. The creature must succeed on a DC 22 Strength saving throw or take 14 (4d6) force damage and have the prone condition.
  - name: Fearsome Pursuit
    desc: The champion moves up to its speed or commands its mount to move up to its speed. This movement doesn't provoke opportunity attacks.
  - name: Nullify (Costs 2 Actions)
    desc: The champion emits a magic wave in a 60-foot cone. Every spell of 5th level or lower ends on creatures and objects of the champion's choice in that area.
```
