---
title: Orcus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 26
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Orcus
size: Huge
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 17
ac_class: natural armour; 20 with the Wand of Orcus
hp: 405
hit_dice: 30d12 + 210
modifier: 2
speed: 40 ft., fly 40 ft.
stats: [ 27, 14, 25, 20, 20, 25 ]
saves:
  - dex: 10
  - con: 15
  - wis: 13
skillsaves:
  - arcana: 13
  - perception: 13
damage_resistances: cold, fire, lightning
damage_immunities: necrotic; poison; bludgeoning, piercing, slashing that is nonmagical
condition_immunities: charmed, exhaustion, frightened, poisoned
gear:
  - wand of orcus
senses: truesight 120 ft., passive Perception 22
languages: all, telepathy 120 ft.
cr: "26"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Orcus fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Orcus has advantage on saving throws against spells and other magical effects.
  - name: Master of Undeath
    desc: Orcus can cast *animate dead* (at will) and *create undead* (3/day). He chooses the level at which the spells are cast, and the creatures created by them remain under his control indefinitely. Additionally, he can cast *create undead* even when it isn't night.
  - name: Special Equipment
    desc: Orcus wields the Wand of Orcus.
actions:
  - name: Multiattack
    desc: Orcus makes three Wand of Orcus, Tail, or Necrotic Bolt attacks.
  - name: Wand of Orcus
    desc: "*Melee Weapon Attack:* +19 to hit, reach 10 ft., one target. *Hit:* 24 (3d8 + 11) bludgeoning damage plus 13 (2d12) necrotic damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +16 to hit, reach 10 ft., one target. *Hit:* 21 (3d8 + 8) force damage plus 9 (2d8) poison damage."
  - name: Necrotic Bolt
    desc: "*Ranged Spell Attack:* +15 to hit, range 120 ft., one target. *Hit:* 29 (5d8 + 7) necrotic damage."
  - name: Conjure Undead (1/Day)
    desc: While holding the Wand of Orcus, Orcus conjures Undead creatures whose combined average hit points don't exceed 500. These creatures magically rise up from the ground or otherwise form in unoccupied spaces within 300 feet of Orcus and obey his commands until they are destroyed or until he dismisses them as an action.
  - name: Spellcasting
    desc: |-
      Orcus casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 23):

      **At will:** *detect magic*

      **3/day:** *dispel magic*

      **1/day:** *time stop*
  - name: Wand Spellcasting
    desc: |-
      While holding the Wand of Orcus, Orcus casts one of the following spells (spell save DC 18), some of which require charges; the wand has 7 charges to fuel these spells, and it regains 1d4 + 3 charges daily at dawn:

      **At will:** *animate dead* (as an action), *blight*, *speak with dead*

      **2 charges each:** *power word kill*

      **1 charge each:** *circle of death*, *finger of death*
legendary_description: Orcus can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Orcus regains spent legendary actions at the start of his turn.
legendary_actions:
  - name: Attack
    desc: Orcus makes one Tail or Necrotic Bolt attack.
  - name: Creeping Death (Costs 2 Actions)
    desc: Orcus chooses a point on the ground that he can see within 100 feet of him. A cylinder of swirling necrotic energy 60 feet tall and with a 10-foot radius rises from that point and lasts until the end of Orcus's next turn. Creatures in that area have vulnerability to necrotic damage.
```
