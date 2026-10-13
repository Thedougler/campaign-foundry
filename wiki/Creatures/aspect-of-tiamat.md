---
title: Aspect of Tiamat
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 30
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aspect of Tiamat
size: Gargantuan
type: dragon
subtype: chromatic
alignment: Chaotic Evil
ac: 23
ac_class: natural armour
hp: 574
hit_dice: 28d20 + 280
modifier: 2
speed: 60 ft., burrow 60 ft., fly 120 ft., swim 60 ft.
stats: [ 30, 14, 30, 21, 20, 26 ]
saves:
  - dex: 11
  - con: 19
  - wis: 14
  - cha: 17
skillsaves:
  - intimidation: 26
  - perception: 23
damage_immunities: acid; cold; fire; lightning; poison; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: blinded, charmed, deafened, frightened, poisoned, stunned
senses: truesight 120 ft., passive Perception 33
languages: Common, Draconic, Infernal
cr: "30"
traits:
  - name: Chromatic Wrath (Recharges after a Short or Long Rest)
    desc: If the aspect would be reduced to 0 hit points, her current hit point total instead resets to 500 hit points, she recharges her Chromatic Flames, and she regains any expended uses of Legendary Resistance. Additionally, the aspect can now use the options in the "Mythic Actions" section for 1 hour. Award a party an additional 155,000 XP (310,000 XP total) for defeating the aspect of Tiamat after her Chromatic Wrath activates.
  - name: Legendary Resistance (5/Day)
    desc: If the aspect fails a saving throw, she can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The aspect makes one Bite attack, one Claw attack, and one Tail attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +19 to hit, reach 20 ft., one target. *Hit:* 23 (2d12 + 10) piercing damage plus 19 (3d12) force damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +19 to hit, reach 15 ft., one target. *Hit:* 21 (2d10 + 10) slashing damage. If the target is a Huge or smaller creature, it is grappled (escape DC 20) and is restrained until this grapple ends. The aspect can have only one creature grappled this way at a time."
  - name: Tail
    desc: "*Melee Weapon Attack:* +19 to hit, reach 15 ft., one target. *Hit:* 23 (2d12 + 10) bludgeoning damage. If the target is a creature, it must succeed on a DC 27 Strength saving throw or be knocked prone."
  - name: Chromatic Flames (Recharge 5–6)
    desc: "The aspect exhales multicoloured flames in a 300-foot cone. Each creature in that area must make a DC 27 Dexterity saving throw. On a failed save, the creature takes 71 (11d12) damage of a type of the aspect's choosing: acid, cold, fire, lightning, or poison. On a successful save, the creature takes half as much damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the aspect of tiamat can expend a use to take one of the following actions. The aspect of tiamat regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The aspect makes one Claw or Tail attack.
  - name: Furious Bite (Costs 2 Actions)
    desc: The aspect makes one Bite attack. If the attack hits a creature, the target must succeed on a DC 27 Wisdom saving throw or become frightened of the aspect until the end of its next turn.
mythic_description: If the aspect's Chromatic Wrath trait has activated in the last hour, she can use the options below as legendary actions.
mythic_actions:
  - name: Hurl Through Avernus (Costs 2 Actions)
    desc: The aspect targets a creature she is grappling. The creature must succeed on a DC 25 Charisma saving throw or take 44 (8d10) psychic damage and be banished to Avernus (the first layer of the Nine Hells). At the start of the aspect's next turn, the creature reappears in an unoccupied space within 10 feet of the aspect.
  - name: Chromatic Flare (Costs 3 Actions)
    desc: "The aspect flares with elemental energy. Each creature of the aspect's choice in a 60-foot-radius sphere centred on her must make a DC 27 Dexterity saving throw. On a failed save, the creature takes 39 (6d12) damage of a type chosen by the aspect: acid, cold, fire, lightning, or poison. On a successful save, the creature takes half as much damage."
```
