---
title: Pazrodine
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Pazrodine
size: Gargantuan
type: dragon
subtype: moonstone
alignment: Lawful Neutral
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
  - name: Guardian of the Market
    desc: Pazrodine can sense when an item is stolen from Seelie Market. She knows the distance and direction to stolen items, as if by the *Locate Object* spell.
  - name: Legendary Resistance (3/Day)
    desc: If Pazrodine fails a saving throw, she can choose to succeed instead.
actions:
  - name: Multiattack
    desc: Pazrodine makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +13 to hit, reach 15 ft., one target. *Hit:* 17 (2d10 + 6) piercing damage plus 11 (2d10) radiant damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 13 (2d6 + 6) slashing damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +13 to hit, reach 20 ft., one target. *Hit:* 10 (1d8 + 6) bludgeoning damage. If the target is a creature, it must succeed on a DC 21 Strength saving throw or have the prone condition."
  - name: Breath Weapon (Recharge 5–6)
    desc: |-
      Pazrodine uses one of the following breath weapons:

      - **Dream Breath.** Pazrodine exhales mist in a 90-foot cone. Each creature in that area must succeed on a DC 21 Constitution saving throw or have the unconscious condition for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.  
      - **Moonlight Breath.** Pazrodine exhales a beam of moonlight in a 120-foot line that is 10 feet wide. Each creature in that area must make a DC 21 Dexterity saving throw, taking 60 (11d10) radiant damage on a failed save, or half as much damage on a successful one.  
  - name: Spellcasting
    desc: |-
      Pazrodine casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 23):

      **At will:** *Faerie Fire*

      **2/day each:** *Calm Emotions*, *Dispel Magic*, *Invisibility*

      **1/day each:** *Mass Cure Wounds*, *Revivify*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Pazrodine can expend a use to take one of the following actions. Pazrodine regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Tail
    desc: Pazrodine makes one Tail attack.
  - name: Cast a Spell (Costs 2 Actions)
    desc: Pazrodine uses Spellcasting.
```
