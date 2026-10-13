---
title: Amethyst Greatwyrm
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 26
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Amethyst Greatwyrm
size: Gargantuan
type: dragon
subtype: gem
alignment: typically Neutral
ac: 21
ac_class: natural armour
hp: 507
hit_dice: 26d20 + 234
modifier: 2
speed: 60 ft., burrow 60 ft., fly 120 ft. (hover), swim 60 ft.
stats: [ 28, 14, 29, 30, 24, 25 ]
saves:
  - dex: 10
  - con: 17
  - wis: 15
  - cha: 15
skillsaves:
  - arcana: 26
  - history: 18
  - perception: 15
damage_immunities: force
condition_immunities: charmed, frightened, poisoned, prone
senses: truesight 120 ft., passive Perception 25
languages: Common, Draconic
cr: "26"
traits:
  - name: Gem Awakening (Recharges after a Short or Long Rest)
    desc: If the greatwyrm would be reduced to 0 hit points, its current hit point total instead resets to 400 hit points, it recharges its Breath Weapon, and it regains any expended uses of Legendary Resistance. Additionally, the greatwyrm can now use its Mass Telekinesis action during the next hour. Award a party an additional 90,000 XP (180,000 XP total) for defeating the greatwyrm after its Gem Awakening activates.
  - name: Legendary Resistance (4/Day)
    desc: If the greatwyrm fails a saving throw, it can choose to succeed instead.
  - name: Unusual Nature
    desc: The greatwyrm doesn't require food or drink.
actions:
  - name: Multiattack
    desc: The greatwyrm makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +17 to hit, reach 15 ft., one target. *Hit:* 20 (2d10 + 9) piercing damage plus 16 (3d10) force damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +17 to hit, reach 10 ft., one target. *Hit:* 18 (2d8 + 9) slashing damage. If the target is a Huge or smaller creature, it is grappled (escape DC 19) and is restrained until this grapple ends. The greatwyrm can have only one creature grappled in this way at a time."
  - name: Breath Weapon (Recharge 5–6)
    desc: The greatwyrm exhales crushing force in a 300-foot cone. Each creature in that area must make a DC 25 Dexterity saving throw. On a failed save, the creature takes 71 (11d12) force damage and is knocked prone. On a successful save, it takes half as much damage and isn't knocked prone. On a success or failure, the creature's speed becomes 0 until the end of its next turn.
  - name: Mass Telekinesis (Gem Awakening Only; Recharges after a Short or Long Rest)
    desc: |-
      The greatwyrm targets any number of creatures and objects it can see within 120 feet of it. No one target can weigh more than 4,000 pounds, and objects can't be targeted if they're being worn or carried. Each targeted creature must succeed on a DC 26 Strength saving throw or be restrained in the greatwyrm's telekinetic grip. At the end of a creature's turn, it can repeat the saving throw, ending the effect on itself on a success.

      At the end of the greatwyrm's turn, it can move each creature or object it has in its telekinetic grip up to 60 feet in any direction, but not beyond 120 feet of itself. In addition, it can choose any number of creatures restrained in this way and deal 45 (7d12) force damage to each of them.
  - name: Spellcasting (Psionics)
    desc: |-
      The greatwyrm casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 26, +18 to hit with spell attack):

      **1/day each:** *dispel magic*, *forcecage*, *plane shift*, *reverse gravity*, *time stop*
bonus_actions:
  - name: Change Shape
    desc: The greatwyrm magically transforms into any creature that is Medium or Small, while retaining its game statistics (other than its size). This transformation ends if the greatwyrm is reduced to 0 hit points or uses a bonus action to end it.
  - name: Psychic Step
    desc: The greatwyrm magically teleports to an unoccupied space it can see within 60 feet of it.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the amethyst greatwyrm can expend a use to take one of the following actions. The amethyst greatwyrm regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Claw
    desc: The greatwyrm makes one Claw attack.
  - name: Psionics (Costs 2 Actions)
    desc: The greatwyrm uses Psychic Step or Spellcasting.
  - name: Psychic Beam (Costs 3 Actions)
    desc: The greatwyrm emits a beam of psychic energy in a 90-foot line that is 10 feet wide. Each creature in that area must make a DC 26 Intelligence saving throw, taking 27 (5d10) psychic damage on a failed save, or half as much damage on a successful one.
```
