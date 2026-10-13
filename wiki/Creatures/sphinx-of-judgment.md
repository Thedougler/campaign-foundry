---
title: Sphinx of Judgment
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sphinx of Judgement
size: Large
type: monstrosity
alignment: Lawful Neutral
ac: 17
ac_class: natural armour
hp: 136
hit_dice: 16d10 + 48
modifier: 2
speed: 40 ft., fly 60 ft.
stats: [ 18, 15, 16, 18, 18, 18 ]
skillsaves:
  - arcana: 12
  - history: 12
  - perception: 8
  - religion: 8
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: psychic
condition_immunities: charmed, frightened
senses: truesight 120 ft., passive Perception 18
languages: Common, Sphinx
cr: "11"
traits:
  - name: Spellcasting
    desc: |-
      The sphinx is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 16, +8 to hit with spell attacks). It requires no material components to cast its spells. The sphinx has the following wizard spells prepared:

      **Cantrips (at will):** friends, *mage hand*, *message*

      **1st level (4 slots):** *command*, *ensnaring strike*, *shield*

      **2nd level (3 slots):** *calm emotions*, *hold person*, *suggestion*

      **3rd level (3 slots):** *clairvoyance*, *counterspell*, *dispel magic*

      **4th level (3 slots):** *banishment*, *divination*

      **5th level (1 slots):** *dominate person*
  - name: Inscrutable
    desc: The sphinx is immune to any effect that would sense its emotions or read its thoughts, as well as any divination spell that it refuses. Wisdom (Insight) checks made to ascertain the sphinx's intentions or sincerity have disadvantage.
  - name: Magic Weapons
    desc: The sphinx's weapon attacks are magical.
actions:
  - name: Multiattack
    desc: The sphinx makes two claw attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) slashing damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the sphinx of judgement can expend a use to take one of the following actions. The sphinx of judgement regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Claw Attack
    desc: The sphinx makes one claw attack.
  - name: Teleport (Costs 2 Actions)
    desc: The sphinx magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see.
  - name: Cast a Spell (Costs 3 Actions)
    desc: The sphinx casts a spell from its list of prepared spells, using a spell slot as normal.
```
