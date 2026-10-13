---
title: Young Emerald Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Dragon
size: Large
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Young Emerald Dragon
size: Large
type: dragon
subtype: gem
alignment: typically Lawful Neutral
ac: 17
ac_class: natural armour
hp: 142
hit_dice: 15d10 + 60
modifier: 1
speed: 40 ft., burrow 30 ft., fly 60 ft.
stats: [ 21, 12, 19, 16, 14, 16 ]
saves:
  - dex: 4
  - con: 7
  - wis: 5
  - cha: 6
skillsaves:
  - arcana: 6
  - deception: 6
  - perception: 8
  - stealth: 4
damage_resistances: fire, psychic
senses: blindsight 30 ft., darkvision 120 ft., passive Perception 18
languages: Common, Draconic, telepathy 120 ft.
cr: "8"
traits:
  - name: Tunneler
    desc: The dragon can burrow through solid rock at half its burrowing speed and can leave a 10-foot-diameter tunnel in its wake.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 16 (2d10 + 5) piercing damage plus 3 (1d6) psychic damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 8 (1d6 + 5) slashing damage."
  - name: Disorienting Breath (Recharge 5–6)
    desc: The dragon exhales a wave of psychic dissonance in a 30-foot cone. Each creature in that area must make a DC 15 Intelligence saving throw. On a failed save, the creature takes 31 (9d6) psychic damage, and until the end of its next turn, when the creature makes an attack roll or an ability check, it must roll a d6 and reduce the total by the number rolled. On a successful save, the creature takes half as much damage with no additional effects.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 14):

      **At will:** *mage hand* (the hand is invisible), *minor illusion*

      **1/day each:** *detect thoughts*, *invisibility*, *silent image*
```
