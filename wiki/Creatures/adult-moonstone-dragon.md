---
title: Adult Moonstone Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Dragon
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Moonstone Dragon
size: Huge
type: dragon
alignment: typically Neutral
ac: 19
ac_class: natural armour
hp: 195
hit_dice: 17d12 + 85
modifier: 4
speed: 40 ft., fly 80 ft.
stats: [ 20, 18, 20, 22, 20, 23 ]
saves:
  - int: 11
  - wis: 10
  - cha: 11
skillsaves:
  - perception: 10
  - persuasion: 11
  - stealth: 9
condition_immunities: charmed
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 20
languages: Common, Draconic, Elvish, Gnomish, Sylvan
cr: "15"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 16 (2d10 + 5) piercing damage plus 7 (2d6) radiant damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) slashing damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +10 to hit, reach 15 ft., one target. *Hit:* 9 (1d8 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 18 Strength saving throw or be knocked prone."
  - name: Breath Weapon (Recharge 5–6)
    desc: |-
      The dragon uses one of the following breath weapons:

      - **Dream Breath.** The dragon exhales mist in a 90-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.  
      - **Moonlight Breath.** The dragon exhales a beam of moonlight in a 90-foot line that is 10 feet wide. Each creature in that area must make a DC 18 Dexterity saving throw, taking 49 (9d10) radiant damage on a failed save, or half as much damage on a successful one.  
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 19):

      **At will:** *faerie fire*

      **1/day each:** *calm emotions*, *invisibility*, *revivify*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Tail
    desc: The dragon makes one Tail attack.
  - name: Cast a Spell (Costs 2 Actions)
    desc: The dragon uses Spellcasting.
```
