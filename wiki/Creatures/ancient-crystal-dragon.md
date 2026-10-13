---
title: Ancient Crystal Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 19
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Crystal Dragon
size: Gargantuan
type: dragon
subtype: gem
alignment: typically Chaotic Neutral
ac: 20
ac_class: natural armour
hp: 222
hit_dice: 12d20 + 96
modifier: 1
speed: 40 ft., burrow 40 ft., climb 40 ft., fly 80 ft.
stats: [ 25, 12, 26, 20, 16, 21 ]
saves:
  - dex: 7
  - con: 14
  - wis: 9
  - cha: 11
skillsaves:
  - perception: 15
  - stealth: 13
  - survival: 9
damage_resistances: cold, radiant
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 25
languages: Common, Draconic, telepathy 120 ft.
cr: "19"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +13 to hit, reach 15 ft., one target. *Hit:* 18 (2d10 + 7) piercing damage plus 9 (2d8) radiant damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 14 (2d6 + 7) slashing damage."
  - name: Scintillating Breath (Recharge 5–6)
    desc: The dragon exhales a burst of brilliant radiance in a 90-foot cone. Each creature in that area must make a DC 22 Constitution saving throw, taking 49 (11d8) radiant damage on a failed save, or half as much damage on a successful one. The dragon then gains 25 temporary hit points by absorbing a portion of the radiant energy.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 19):

      **At will:** *dancing lights*, *guidance*

      **1/day each:** *command*, *divination*, *greater restoration*, *hypnotic pattern*, *invisibility*
bonus_actions:
  - name: Change Shape
    desc: The dragon magically transforms into any creature that is Medium or Small, while retaining its game statistics (other than its size). This transformation ends if the dragon is reduced to 0 hit points or uses a bonus action to end it.
  - name: Psychic Step
    desc: The dragon magically teleports to an unoccupied space it can see within 60 feet of it.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Claw
    desc: The dragon makes one Claw attack.
  - name: Psionics (Costs 2 Actions)
    desc: The dragon uses Psychic Step or Spellcasting.
  - name: Starlight Strike (Costs 3 Actions)
    desc: The dragon releases a searing beam of starlight at a creature that it can see within 60 feet of it. The target must succeed on a DC 19 Dexterity saving throw or take 38 (11d6) radiant damage.
```
