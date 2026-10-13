---
title: Adult Crystal Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Dragon
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Crystal Dragon
size: Huge
type: dragon
subtype: gem
alignment: typically Chaotic Neutral
ac: 16
ac_class: natural armour
hp: 172
hit_dice: 15d12 + 75
modifier: 1
speed: 40 ft., burrow 40 ft., climb 40 ft., fly 80 ft.
stats: [ 21, 12, 21, 18, 15, 19 ]
saves:
  - dex: 5
  - con: 9
  - wis: 6
  - cha: 8
skillsaves:
  - perception: 10
  - stealth: 9
  - survival: 6
damage_resistances: cold, radiant
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 20
languages: Common, Draconic, telepathy 120 ft.
cr: "12"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 16 (2d10 + 5) piercing damage plus 4 (1d8) radiant damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 9 (1d8 + 5) slashing damage."
  - name: Scintillating Breath (Recharge 5–6)
    desc: The dragon exhales a burst of brilliant radiance in a 60-foot cone. Each creature in that area must make a DC 17 Constitution saving throw, taking 40 (9d8) radiant damage on a failed save, or half as much damage on a successful one. The dragon then gains 15 temporary hit points by absorbing a portion of the radiant energy.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *dancing lights*, *guidance*

      **1/day each:** *command*, *divination*, *hypnotic pattern*, *lesser restoration*
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
    desc: The dragon releases a searing beam of starlight at a creature that it can see within 60 feet of it. The target must succeed on a DC 17 Dexterity saving throw or take 31 (9d6) radiant damage.
```
