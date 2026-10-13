---
title: Isperia
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Isperia
size: Gargantuan
type: monstrosity
alignment: Lawful Neutral
ac: 17
ac_class: natural armour
hp: 261
hit_dice: 18d20 + 72
modifier: 2
speed: 40 ft., fly 60 ft.
stats: [ 20, 14, 18, 23, 26, 20 ]
saves:
  - dex: 9
  - con: 11
  - int: 13
  - wis: 15
skillsaves:
  - arcana: 13
  - history: 13
  - insight: 15
  - perception: 15
damage_immunities: psychic; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, frightened
senses: truesight 120 ft., passive Perception 25
languages: Common, Sphinx
cr: "21"
traits:
  - name: Spellcasting
    desc: |-
      Isperia is a 15th-level Azorius spellcaster. Her spellcasting ability is Wisdom (spell save DC 23, +14 to hit with spell attacks). Isperia has the following cleric spells prepared:

      **Cantrips (at will):** *guidance*, *light*, *resistance*, *sacred flame*, *thaumaturgy*

      **1st level (4 slots):** *command*, *detect evil and good*, *ensnaring strike*, *sanctuary*, *shield of faith*

      **2nd level (3 slots):** *arcane lock*, *augury*, *calm emotions*, *hold person*, *silence*, *zone of truth*

      **3rd level (3 slots):** *bestow curse*, *clairvoyance*, *counterspell*, *dispel magic*, *tongues*

      **4th level (3 slots):** *divination*, *locate creature*

      **5th level (2 slots):** *dispel evil and good*, *scrying*

      **6th level (1 slots):** *word of recall*

      **7th level (1 slots):** *divine word*

      **8th level (1 slots):** *antimagic field*
  - name: Innate Spellcasting
    desc: |
      Isperia's innate spellcasting ability is Wisdom (spell save DC 23). Isperia can innately cast *imprisonment* twice per day, requiring no material components.
  - name: Inscrutable
    desc: Isperia is immune to any effect that would sense her emotions or read her thoughts, as well as any divination spell that she refuses. Wisdom (Insight) checks made to ascertain her intentions or sincerity have disadvantage.
  - name: Legendary Resistance (3/Day)
    desc: If Isperia fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Isperia has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Isperia makes two claw attacks. She can cast a spell with a casting time of 1 action in place of one claw attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 21 (3d10 + 5) slashing damage. If the target is a creature, it must succeed on a DC 23 Wisdom saving throw or take 14 (4d6) psychic damage after each attack it makes against Isperia before the start of her next turn."
  - name: Supreme Legal Authority
    desc: "Isperia chooses up to three creatures she can see within 90 feet of her. Each target must succeed on a DC 23 Intelligence saving throw or Isperia chooses an action for that target: Attack, Cast a Spell, Dash, Disengage, Dodge, Help, Hide, Ready, Search, or Use an Object. The affected target can't take that action for 1 minute. At the end of each of the target's turns, it can end the effect on itself with a successful DC 23 Intelligence saving throw. A target that succeeds on the saving throw becomes immune to Isperia's Supreme Legal Authority for 24 hours."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Isperia can expend a use to take one of the following actions. Isperia regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Claw Attack
    desc: Isperia makes one claw attack.
  - name: Cast a Spell (Costs 2 Actions)
    desc: Isperia casts a spell of 3rd level or lower from her list of prepared spells, using a spell slot as normal.
  - name: Supreme Legal Authority (Costs 3 Actions)
    desc: Isperia uses Supreme Legal Authority.
```
