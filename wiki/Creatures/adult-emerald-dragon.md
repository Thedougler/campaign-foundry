---
title: Adult Emerald Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Dragon
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Emerald Dragon
size: Huge
type: dragon
subtype: gem
alignment: typically Lawful Neutral
ac: 18
ac_class: natural armour
hp: 207
hit_dice: 18d12 + 90
modifier: 1
speed: 40 ft., burrow 30 ft., fly 80 ft.
stats: [ 23, 12, 21, 18, 16, 18 ]
saves:
  - dex: 6
  - con: 10
  - wis: 8
  - cha: 9
skillsaves:
  - arcana: 9
  - deception: 9
  - perception: 13
  - stealth: 6
damage_resistances: fire, psychic
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 23
languages: Common, Draconic, telepathy 120 ft.
cr: "14"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
  - name: Shift Perception (1/Day)
    desc: The dragon can cast *hallucinatory terrain*, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 17).
  - name: Tunneler
    desc: The dragon can burrow through solid rock at half its burrowing speed and can leave a 15-foot-diameter tunnel in its wake.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 17 (2d10 + 6) piercing damage plus 7 (2d6) psychic damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 10 (1d8 + 6) slashing damage."
  - name: Disorienting Breath (Recharge 5–6)
    desc: The dragon exhales a wave of psychic dissonance in a 60-foot cone. Each creature in that area must make a DC 18 Intelligence saving throw. On a failed save, the creature takes 42 (12d6) psychic damage, and until the end of its next turn, when the creature makes an attack roll or an ability check, it must roll a d6 and reduce the total by the number rolled. On a successful save, the creature takes half as much damage with no additional effects.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 17):

      **At will:** *mage hand* (the hand is invisible), *minor illusion*

      **1/day each:** *detect thoughts*, *dispel magic*, *invisibility*, *major image*
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
    desc: The dragon creates a dancing mote of green flame around a creature it can see within 60 feet of it. The target must succeed on a DC 17 Dexterity saving throw or take 31 (9d6) fire damage.
```
