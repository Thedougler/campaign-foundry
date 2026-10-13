---
title: Euryale
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Euryale
size: Medium
type: monstrosity
subtype: druid, medusa
alignment: Neutral Good
ac: 17
ac_class: natural armour
hp: 297
hit_dice: 35d8 + 140
modifier: 3
speed: 30 ft., 50 ft. in serpent form
stats: [ 21, 16, 18, 12, 20, 15 ]
saves:
  - dex: 9
  - con: 10
  - int: 7
  - wis: 11
skillsaves:
  - animal handling: 11
  - insight: 17
  - medicine: 11
  - nature: 13
  - perception: 11
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, frightened, petrified, poisoned
senses: darkvision 60 ft., passive Perception 21
languages: Common, Druidic
cr: "18"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Euryale fails a saving throw, she can choose to succeed instead.
  - name: Special Equipment
    desc: Euryale carries one half of a pair of Sending Stones; the other half of the pair is held by Asteria.
actions:
  - name: Multiattack
    desc: Euryale makes three attacks. If she is in serpent form, only one of these attacks can be Constrict.
  - name: Constrict (Serpent Form Only)
    desc: "*Melee Weapon Attack:* +11 to hit, reach 15 ft., one Large or smaller creature. *Hit:* 16 (2d10 + 5) bludgeoning damage, and the target has the grappled condition (escape DC 19). Until this grapple ends, the target takes 11 (2d10) bludgeoning damage at the start of each of its turns, and Euryale can't constrict another target."
  - name: Snake Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 12 (2d6 + 5) piercing damage, and the target must succeed on a DC 18 Constitution saving throw or have the poisoned condition until the start of Euryale's next turn."
  - name: Verdant Bolt (Medusa Form Only)
    desc: "*Ranged Spell Attack:* +11 to hit, range 120 ft., one target. *Hit:* 18 (4d8) acid damage."
  - name: Spellcasting (Medusa Form Only)
    desc: |-
      Euryale casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 19):

      **At will:** *Druidcraft*, *Pass without Trace*

      **2/day each:** *Goodberry*, *Lesser Restoration*, *Locate Creature*, *Move Earth*, *Transport via Plants*
bonus_actions:
  - name: Change Shape
    desc: Euryale changes shape into her Huge serpent form or back into her Medium medusa form. Euryale's game statistics are the same in each form except where noted in this stat block. Any equipment she is wearing or carrying isn't transformed. Euryale reverts to her medusa form if she dies.
  - name: Petrifying Gaze (Recharge 4–6)
    desc: Euryale unleashes petrifying magic from her eyes in a 30-foot cone. Each creature in that area must make a DC 18 Constitution saving throw if it doesn't have the blinded condition. If the saving throw fails by 5 or more, the creature has the petrified condition. Otherwise, on a failed save, the creature takes 14 (4d6) force damage, begins to turn to stone, and has the restrained condition. The restrained creature must repeat the saving throw at the end of its next turn. On a failed save, it has the petrified condition, and on a successful save, the effect ends on it, The petrification lasts until the creature is freed by the *Greater Restoration* spell or other magic A creature can use its reaction, if available, to shut its eyes to avoid the saving throw. If the creature does so, it has the blinded condition until the end of its next turn.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Euryale can expend a use to take one of the following actions. Euryale regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Move
    desc: Euryale moves up to her speed.
  - name: Venomous Strike (Costs 2 Actions)
    desc: Euryale makes one Snake Bite attack. If the target has the poisoned condition, the attack deals an extra 16 (3d10) poison damage.
```
