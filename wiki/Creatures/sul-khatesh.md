---
title: Sul Khatesh
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 28
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sul Khatesh
size: Large
type: fiend
alignment: Lawful Evil
ac: 22
ac_class: natural armour
hp: 475
hit_dice: 50d10 + 200
modifier: 5
speed: 40 ft., fly 40 ft. (hover)
stats: [ 18, 21, 19, 30, 22, 25 ]
saves:
  - con: 12
  - int: 18
  - wis: 14
  - cha: 15
skillsaves:
  - arcana: 18
  - history: 18
  - insight: 14
  - religion: 18
damage_resistances: cold, fire, lightning
damage_immunities: poison; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: truesight 120 ft., passive Perception 16
languages: all, telepathy 150 ft.
cr: "28"
traits:
  - name: Innate Spellcasting
    desc: |-
      Sul Khatesh's spellcasting ability is Intelligence (spell save DC 26, +18 to hit with spell attacks). She can innately cast the following spells, requiring no material components:

      **At will:** *counterspell*, *detect magic*, *detect thoughts*, *dispel magic*, *eyebite*, *fireball*, *lightning bolt*, *shield*

      **3/day each:** *chain lightning*, *create undead*, *dream*, *hold monster*, *mass suggestion*, *scrying*

      **1/day each:** *foresight*, *gate*, *power word kill*, *teleport*
  - name: Legendary Resistance (3/Day)
    desc: If Sul Khatesh fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Sul Khatesh has advantage on saving throws against spells and other magical effects.
  - name: Master of Magic
    desc: Sul Khatesh has advantage on Constitution saving throws to maintain concentration.
actions:
  - name: Multiattack
    desc: Sul Khatesh makes four attacks with Arcane Blast.
  - name: Arcane Blast
    desc: "*Ranged Spell Attack:* +18 to hit, range 120 ft., one target. *Hit:* 15 (1d10 + 10) force damage."
  - name: Magic Staff
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 36 (5d12 + 4) force damage."
  - name: Arcane Cataclysm (Recharges after a Long Rest)
    desc: Sul Khatesh conjures orbs of magical energy that plummet to the ground at three different points she can see within 1 mile of her. Each creature in a 40-foot-radius sphere centred on each point must make a DC 26 Dexterity saving throw, taking 71 (11d12) force damage on a failed save or half as much damage on a successful one. A creature in the area of more than one arcane burst is affected only once. The area of each arcane burst then acts as an *antimagic field* for 1 hour. Sul Khatesh and spells she casts are unaffected by these fields.
  - name: Change Shape
    desc: |-
      Sul Khatesh magically polymorphs into a humanoid, beast, or giant that has a challenge rating no higher than her own, or back into her true form. She reverts to her true form if she dies. Any equipment she is wearing or carrying is absorbed or borne by the new form (Sul Khatesh's choice).

      In a new form, Sul Khatesh retains her alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, and Intelligence, Wisdom, and Charisma scores, as well as this action. Her statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Sul Khatesh can expend a use to take one of the following actions. Sul Khatesh regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: Sul Khatesh makes two attacks with her Arcane Blast or one attack with her magic staff.
  - name: Consume Magic (Costs 2 Actions)
    desc: Sul Khatesh targets a creature within 120 feet of her who is concentrating on a spell. The target must succeed on a DC 26 Constitution saving throw or its concentration is broken on the spell, and Sul Khatesh gains 5 temporary hit points per level of that spell.
  - name: Maddening Secrets (Costs 3 Actions)
    desc: Sul Khatesh whispers an arcane secret into the mind of a creature she can see within 60 feet of her. The target must succeed on a DC 26 Wisdom saving throw or expend one of its spell slots of 3rd level or lower and deal 26 (4d12) force damage to each creature within 30 feet of it. A creature that fails the saving throw but can't expend a spell slot is instead stunned until the end of its next turn.
```
