---
title: Ancient Emerald Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Emerald Dragon
size: Gargantuan
type: dragon
subtype: gem
alignment: typically Lawful Neutral
ac: 20
ac_class: natural armour
hp: 332
hit_dice: 19d20 + 133
modifier: 1
speed: 40 ft., burrow 30 ft., fly 80 ft.
stats: [ 25, 12, 25, 20, 18, 20 ]
saves:
  - dex: 8
  - con: 14
  - wis: 11
  - cha: 12
skillsaves:
  - arcana: 12
  - deception: 12
  - perception: 18
  - stealth: 8
damage_resistances: fire, psychic
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 28
languages: Common, Draconic, telepathy 120 ft.
cr: "21"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
  - name: Tunneler
    desc: The dragon can burrow through solid rock at half its burrowing speed and can leave a 20-foot-diameter tunnel in its wake.
  - name: Warp Perception (1/Day)
    desc: The dragon can cast *mirage arcane*, requiring no spell components and using Intelligence as the spellcasting ability.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +14 to hit, reach 15 ft., one target. *Hit:* 18 (2d10 + 7) piercing damage plus 10 (3d6) psychic damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +14 to hit, reach 10 ft., one target. *Hit:* 14 (2d6 + 7) slashing damage."
  - name: Disorienting Breath (Recharge 5–6)
    desc: The dragon exhales a wave of psychic dissonance in a 90-foot cone. Each creature in that area must make a DC 22 Intelligence saving throw. On a failed save, the creature takes 56 (16d6) psychic damage, and until the end of its next turn, when the creature makes an attack roll or an ability check, it must roll a d8 and reduce the total by the number rolled. On a successful save, the creature takes half as much damage with no additional effects.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 20):

      **At will:** *mage hand* (the hand is invisible), *minor illusion*

      **1/day each:** *detect thoughts*, *dispel magic*, *etherealness*, *major image*, *mislead*
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
  - name: Emerald Embers (Costs 3 Actions)
    desc: The dragon creates a dancing mote of green flame around a creature it can see within 60 feet of it. The target must succeed on a DC 20 Dexterity saving throw or take 42 (12d6) fire damage.
```
