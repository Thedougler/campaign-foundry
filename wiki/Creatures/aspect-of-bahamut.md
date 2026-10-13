---
title: Aspect of Bahamut
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
name: Aspect of Bahamut
size: Gargantuan
type: dragon
subtype: metallic
alignment: Lawful Good
ac: 23
ac_class: natural armour
hp: 585
hit_dice: 30d20 + 270
modifier: 4
speed: 60 ft., burrow 60 ft., fly 120 ft., swim 60 ft.
stats: [ 30, 18, 29, 25, 28, 30 ]
saves:
  - con: 18
  - int: 16
  - wis: 18
  - cha: 19
skillsaves:
  - insight: 18
  - perception: 18
  - persuasion: 19
damage_immunities: acid; cold; fire; lightning; radiant; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, deafened, frightened, paralysed, stunned
senses: truesight 120 ft., passive Perception 28
languages: Common, Draconic
cr: "30"
traits:
  - name: Platinum Brilliance (Recharges after a Short or Long Rest)
    desc: If the aspect would be reduced to 0 hit points, his current hit point total instead resets to 500 hit points, he recharges his Breath Weapon, and he regains any expended uses of Legendary Resistance. Additionally, the aspect can now use the options in the "Mythic Actions" section for 1 hour. Award a party an additional 155,000 XP (310,000 XP total) for defeating the aspect of Bahamut after his Platinum Brilliance activates.
  - name: Legendary Resistance (5/Day)
    desc: If the aspect fails a saving throw, he can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The aspect makes one Bite attack, one Claw attack, and one Tail attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +19 to hit, reach 20 ft., one target. *Hit:* 23 (2d12 + 10) piercing damage plus 22 (4d10) force damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +19 to hit, reach 15 ft., one target. *Hit:* 21 (2d10 + 10) slashing damage. If the target is a Huge or smaller creature, it is grappled (escape DC 20) and is restrained until this grapple ends. The aspect can have only one creature grappled this way at a time."
  - name: Tail
    desc: "*Melee Weapon Attack:* +19 to hit, reach 15 ft., one target. *Hit:* 23 (2d12 + 10) bludgeoning damage. If the target is a creature, it must succeed on a DC 27 Strength saving throw or be knocked prone."
  - name: Breath Weapon (Recharge 5–6)
    desc: |-
      The aspect uses one of the following breath weapons:

      - **Exalting Breath.** The aspect exhales the restoring winds of Mount Celestia in a 300-foot cone. Each creature in that area of the aspect's choice regains 71 (13d10) hit points, and each creature in that area of the aspect's choice that has been dead for no longer than 1 hour is restored to life with all its hit points.  
      - **Platinum Breath.** The aspect exhales radiant platinum flames in a 300-foot cone. Each creature in that area must make a DC 26 Dexterity saving throw, taking 66 (12d10) radiant damage on a failed save, or half as much damage on a successful one.  
bonus_actions:
  - name: Change Shape
    desc: The aspect magically transforms into any Humanoid or Beast, while retaining his game statistics (other than his size). This transformation ends if the aspect is reduced to 0 hit points or if he uses a bonus action to end it.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the aspect of bahamut can expend a use to take one of the following actions. The aspect of bahamut regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The aspect makes one Claw or Tail attack.
  - name: Furious Bite (Costs 2 Actions)
    desc: The aspect makes one Bite attack. If the attack hits a creature, the target must succeed on a DC 27 Wisdom saving throw or become frightened of the aspect until the end of the target's next turn.
mythic_description: If the aspect's Platinum Brilliance trait has activated in the last hour, he can use the options below as legendary actions.
mythic_actions:
  - name: Celestial Shield (Costs 2 Actions)
    desc: The aspect manifests seven spectral ancient gold dragons around himself that protect him; he gains 77 temporary hit points until the start of his next turn.
  - name: Celestial Lances (Costs 3 Actions)
    desc: The aspect conjures four enormous lances of magical force that plummet to the ground at four different points he can see within 150 feet of him and then disappear. Each creature in a 20-foot-radius, 100-foot-high cylinder centred on each point must succeed on a DC 27 Dexterity saving throw or take 24 (7d6) force damage. A creature in the area of more than one lance is affected only once.
```
