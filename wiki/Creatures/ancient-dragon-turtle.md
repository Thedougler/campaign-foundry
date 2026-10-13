---
title: Ancient Dragon Turtle
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 24
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Dragon Turtle
size: Gargantuan
type: dragon
alignment: typically Neutral
ac: 22
ac_class: natural armour
hp: 409
hit_dice: 21d20 + 189
modifier: 1
speed: 30 ft., swim 60 ft.
stats: [ 28, 12, 29, 14, 19, 15 ]
saves:
  - dex: 8
  - con: 16
  - wis: 11
skillsaves:
  - perception: 11
damage_immunities: cold, fire
condition_immunities: charmed, frightened, poisoned
senses: truesight 120 ft., passive Perception 21
languages: Aquan, Draconic
cr: "24"
traits:
  - name: Amphibious
    desc: The dragon turtle can breathe air and water.
  - name: Blessing of the Sea (Recharges after a Short or Long Rest)
    desc: If the dragon turtle would be reduced to 0 hit points, its current hit point total instead resets to 350 hit points, and it recharges its Steam Breath. Additionally, the dragon turtle can now use the options in the "Mythic Actions" section for 1 hour. Award a party an additional 62,000 XP (124,000 XP total) for defeating the dragon turtle after its Blessing of the Sea activates.
  - name: Legendary Resistance (3/Day)
    desc: If the dragon turtle fails a saving throw, it can choose to succeed instead.
  - name: Unusual Nature
    desc: The dragon turtle doesn't require food or drink.
actions:
  - name: Multiattack
    desc: The dragon turtle makes one Bite or Tail attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +16 to hit, reach 15 ft., one target. *Hit:* 15 (1d12 + 9) piercing damage plus 13 (2d12) lightning damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +16 to hit, reach 15 ft., one target. *Hit:* 18 (2d8 + 9) slashing damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +16 to hit, reach 15 ft., one target. *Hit:* 20 (2d10 + 9) bludgeoning damage. If the target is a creature, it must succeed on a DC 24 Strength saving throw or be knocked prone."
  - name: Steam Breath (Recharge 5–6)
    desc: The dragon turtle exhales steam in a 90-foot cone. Each creature in that area must make a DC 24 Constitution saving throw, taking 67 (15d8) fire damage on a failed save, or half as much damage on a successful one. Being underwater doesn't grant resistance against this damage.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the ancient dragon turtle can expend a use to take one of the following actions. The ancient dragon turtle regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The dragon turtle makes one Claw or Tail attack.
  - name: Move
    desc: The dragon turtle moves up to its speed. If the dragon turtle is swimming, this movement doesn't provoke opportunity attacks.
  - name: Boiling Aura (Costs 3 Actions)
    desc: The dragon turtle radiates intense heat. Until the start of the dragon turtle's next turn, whenever a creature starts its turn within 20 feet of the dragon turtle, that creature must succeed on a DC 24 Constitution saving throw or take 40 (9d8) fire damage. Being underwater doesn't grant resistance against this damage.
mythic_description: If the dragon turtle's Blessing of the Sea trait has activated in the last hour, it can use the options below as legendary actions.
mythic_actions:
  - name: Bite
    desc: The dragon turtle makes one Bite attack.
  - name: Armour of Storms (Costs 2 Actions)
    desc: Lightning temporarily surrounds the dragon turtle, and it gains 40 temporary hit points until the start of its next turn. Until all these temporary hit points are gone, any creature that touches the dragon turtle or hits it with a melee attack takes 26 (4d12) lightning damage.
```
