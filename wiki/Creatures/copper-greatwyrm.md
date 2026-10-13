---
title: Copper Greatwyrm
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 28
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Copper Greatwyrm
size: Gargantuan
type: dragon
subtype: metallic
alignment: typically Lawful Good
ac: 22
ac_class: natural armour
hp: 565
hit_dice: 29d20 + 261
modifier: 3
speed: 60 ft., burrow 60 ft., fly 120 ft., swim 60 ft.
stats: [ 30, 16, 29, 21, 22, 30 ]
saves:
  - dex: 11
  - con: 17
  - int: 13
  - wis: 14
  - cha: 18
skillsaves:
  - insight: 14
  - perception: 22
  - persuasion: 18
damage_immunities: acid
condition_immunities: charmed, frightened, poisoned
senses: truesight 120 ft., passive Perception 32
languages: Common, Draconic
cr: "28"
traits:
  - name: Legendary Resistance (4/Day)
    desc: If the greatwyrm fails a saving throw, it can choose to succeed instead.
  - name: Metallic Awakening (Recharges after a Short or Long Rest)
    desc: If the greatwyrm would be reduced to 0 hit points, its current hit point total instead resets to 450 hit points, it recharges its Breath Weapon, and it regains any expended uses of Legendary Resistance. Additionally, the greatwyrm can now use the options in the "Mythic Actions" section for 1 hour. Award a party an additional 120,000 XP (240,000 XP total) for defeating the greatwyrm after its Metallic Awakening activates.
  - name: Unusual Nature
    desc: The greatwyrm doesn't require food or drink.
actions:
  - name: Multiattack
    desc: The greatwyrm makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +18 to hit, reach 15 ft., one target. *Hit:* 21 (2d10 + 10) piercing damage plus 13 (2d12) force damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +18 to hit, reach 10 ft., one target. *Hit:* 19 (2d8 + 10) slashing damage. If the target is a Huge or smaller creature, it is grappled (escape DC 20) and is restrained until this grapple ends. The greatwyrm can have only one creature grappled in this way at a time."
  - name: Tail
    desc: "*Melee Weapon Attack:* +18 to hit, reach 20 ft., one target. *Hit:* 21 (2d10 + 10) bludgeoning damage. If the target is a creature, it must succeed on a DC 26 Strength saving throw or be knocked prone."
  - name: Breath Weapon (Recharge 5–6)
    desc: |-
      The greatwyrm uses one of the following breath weapons:

      - **Elemental Breath.** The greatwyrm exhales elemental energy in a 300-foot cone. Each creature in that area must make a DC 25 Dexterity saving throw, taking 84 (13d12) acid damage on a failed save, or half as much damage on a successful one.  
      - **Sapping Breath.** The greatwyrm exhales gas in a 300-foot cone. Each creature in that area must make a DC 25 Constitution saving throw. On a failed save, the creature falls unconscious for 1 minute. On a successful save, the creature has disadvantage on attack rolls and saving throws until the end of the greatwyrm's next turn. An unconscious creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.  
  - name: Change Shape
    desc: The greatwyrm magically transforms into any creature that is Medium or Small, while retaining its game statistics (other than its size). This transformation ends if the dragon is reduced to 0 hit points or uses its action to end it.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the copper greatwyrm can expend a use to take one of the following actions. The copper greatwyrm regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The greatwyrm makes one Claw or Tail attack.
  - name: Wing Attack (Costs 2 Actions)
    desc: The greatwyrm beats its wings. Each creature within 30 feet of it must succeed on a DC 26 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The greatwyrm can then fly up to half its flying speed.
mythic_description: If the greatwyrm's Metallic Awakening trait has activated in the last hour, it can use the options below as legendary actions.
mythic_actions:
  - name: Bite
    desc: The greatwyrm makes one Bite attack.
  - name: Shattering Roar (Costs 2 Actions)
    desc: The greatwyrm unleashes a magical roar. Each creature in a 120-foot-radius sphere centred on the greatwyrm must succeed on a DC 26 Constitution saving throw or take 19 (3d12) thunder damage and be incapacitated until the end of its next turn.
```
