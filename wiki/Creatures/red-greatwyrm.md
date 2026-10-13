---
title: Red Greatwyrm
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 27
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Red Greatwyrm
size: Gargantuan
type: dragon
subtype: chromatic
alignment: typically Chaotic Evil
ac: 22
ac_class: natural armour
hp: 533
hit_dice: 26d20 + 260
modifier: 2
speed: 60 ft., burrow 60 ft., fly 120 ft., swim 60 ft.
stats: [ 30, 14, 30, 21, 20, 26 ]
saves:
  - dex: 10
  - con: 18
  - wis: 13
  - cha: 16
skillsaves:
  - intimidation: 16
  - perception: 21
  - stealth: 10
damage_immunities: fire
condition_immunities: charmed, frightened, poisoned
senses: truesight 120 ft., passive Perception 31
languages: Common, Draconic
cr: "27"
traits:
  - name: Chromatic Awakening (Recharges after a Short or Long Rest)
    desc: If the greatwyrm would be reduced to 0 hit points, its current hit point total instead resets to 425 hit points, it recharges its Breath Weapon, and it regains any expended uses of Legendary Resistance. Additionally, the greatwyrm can now use the options in the "Mythic Actions" section for 1 hour. Award a party an additional 105,000 XP (210,000 XP total) for defeating the greatwyrm after its Chromatic Awakening activates.
  - name: Legendary Resistance (4/Day)
    desc: If the greatwyrm fails a saving throw, it can choose to succeed instead.
  - name: Unusual Nature
    desc: The greatwyrm doesn't require food or drink.
actions:
  - name: Multiattack
    desc: The greatwyrm makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +18 to hit, reach 15 ft., one target. *Hit:* 21 (2d10 + 10) piercing damage plus 13 (2d12) force damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +18 to hit, reach 10 ft., one target. *Hit:* 19 (2d8 + 10) slashing damage. If the target is a Huge or smaller creature, it is grappled (escape DC 20) and is restrained until this grapple ends. The greatwyrm can have only one creature grappled this way at a time."
  - name: Tail
    desc: "*Melee Weapon Attack:* +18 to hit, reach 20 ft., one target. *Hit:* 19 (2d8 + 10) bludgeoning damage. If the target is a creature, it must succeed on a DC 26 Strength saving throw or be knocked prone."
  - name: Breath Weapon (Recharge 5–6)
    desc: The greatwyrm exhales a blast of energy in a 300-foot cone. Each creature in that area must make a DC 26 Dexterity saving throw. On a failed save, the creature takes 78 (12d12) fire damage. On a successful save, the creature takes half as much damage.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the red greatwyrm can expend a use to take one of the following actions. The red greatwyrm regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The greatwyrm makes one Claw or Tail attack.
  - name: Wing Attack (Costs 2 Actions)
    desc: The greatwyrm beats its wings. Each creature within 30 feet of it must succeed on a DC 26 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The greatwyrm can then fly up to half its flying speed.
  - name: Arcane Spear (Costs 3 Actions)
    desc: The greatwyrm creates four spears of magical force. Each spear hits a creature of the greatwyrm's choice it can see within 120 feet of it, dealing 12 (1d8 + 8) force damage to its target, then disappears.
mythic_description: If the greatwyrm's Chromatic Awakening trait has activated in the last hour, it can use the options below as legendary actions.
mythic_actions:
  - name: Bite
    desc: The greatwyrm makes one Bite attack.
  - name: Chromatic Flare (Costs 2 Actions)
    desc: The greatwyrm flares with elemental energy. Each creature in a 60-foot-radius sphere centred on the greatwyrm must succeed on a DC 26 Dexterity saving throw or take 22 (5d8) fire damage.
```
