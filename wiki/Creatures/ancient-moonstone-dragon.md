---
title: Ancient Moonstone Dragon
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
name: Ancient Moonstone Dragon
size: Gargantuan
type: dragon
alignment: typically Neutral
ac: 20
ac_class: natural armour
hp: 330
hit_dice: 20d20 + 120
modifier: 4
speed: 40 ft., fly 80 ft.
stats: [ 22, 18, 23, 20, 22, 26 ]
saves:
  - int: 12
  - wis: 13
  - cha: 15
skillsaves:
  - perception: 13
  - persuasion: 15
  - stealth: 11
condition_immunities: charmed
senses: truesight 120 ft., passive Perception 23
languages: all, telepathy 120 ft.
cr: "21"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +13 to hit, reach 15 ft., one target. *Hit:* 17 (2d10 + 6) piercing damage plus 11 (2d10) radiant damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 13 (2d6 + 6) slashing damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +13 to hit, reach 20 ft., one target. *Hit:* 10 (1d8 + 6) bludgeoning damage. If the target is a creature, it must succeed on a DC 21 Strength saving throw or be knocked prone."
  - name: Breath Weapon (Recharge 5–6)
    desc: |-
      The dragon uses one of the following breath weapons:

      - **Dream Breath.** The dragon exhales mist in a 90-foot cone. Each creature in that area must succeed on a DC 21 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.  
      - **Moonlight Breath.** The dragon exhales a beam of moonlight in a 120-foot line that is 10 feet wide. Each creature in that area must make a DC 21 Dexterity saving throw, taking 60 (11d10) radiant damage on a failed save, or half as much damage on a successful one.  
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 23):

      **At will:** *faerie fire*

      **2/day each:** *calm emotions*, *dispel magic*, *invisibility*, *revivify*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Tail
    desc: The dragon makes one Tail attack.
  - name: Cast a Spell (Costs 2 Actions)
    desc: The dragon uses Spellcasting.
```
