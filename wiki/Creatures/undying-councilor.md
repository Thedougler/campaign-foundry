---
title: Undying Councilor
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Undying Councillor
size: Medium
type: undead
alignment: Neutral Good
ac: 17
ac_class: natural armour
hp: 104
hit_dice: 16d8 + 32
modifier: 0
speed: 30 ft.
stats: [ 16, 10, 14, 17, 21, 16 ]
saves:
  - con: 6
  - int: 7
  - wis: 9
skillsaves:
  - arcana: 7
  - history: 11
  - insight: 9
  - perception: 9
  - religion: 7
damage_vulnerabilities: necrotic
damage_immunities: poison, radiant
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: darkvision 120 ft., passive Perception 19
languages: Common, Elvish
cr: "10"
traits:
  - name: Spellcasting
    desc: |-
      The councillor is a 13th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 17, +9 to hit with spell attacks). It has the following cleric spells prepared:

      **Cantrips (at will):** *guidance*, *mending*, *sacred flame*, *spare the dying*, *thaumaturgy*

      **1st level (4 slots):** *bless*, *command*, *create or destroy water*

      **2nd level (3 slots):** *augury*, *calm emotions*, *hold person*

      **3rd level (3 slots):** *daylight*, *dispel magic*, *spirit guardians*

      **4th level (3 slots):** *banishment*, *divination*, *guardian of faith*

      **5th level (2 slots):** *dispel evil and good*, *flame strike* (see "Actions" below), *scrying*

      **6th level (1 slots):** *forbiddance*, *planar ally*

      **7th level (1 slots):** *plane shift*
  - name: Aura of Radiance
    desc: The councillor magically sheds bright light in a 15-foot radius and dim light for an additional 15 feet. The councillor can extinguish or restore this light as a bonus action. If the bright light overlaps with an area of darkness created by a spell of 3rd level or lower, the spell that created that darkness is dispelled.
  - name: Magic Resistance
    desc: The councillor has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The councillor makes two Radiant Touch attacks.
  - name: Radiant Touch
    desc: "*Melee Spell Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 15 (3d6 + 5) radiant damage."
  - name: Healing Touch (3/Day)
    desc: The councillor touches another creature. The target magically regains 18 (3d8 + 5) hit points and is freed from one curse afflicting it (councillor's choice).
  - name: Flame Strike (5th-Level Spell; Requires a Spell Slot)
    desc: The councillor chooses a point it can see within 60 feet of it. Each creature in a 10-foot-radius, 40-foot-high cylinder centred on that point must make a DC 17 Dexterity saving throw. A creature takes 14 (4d6) fire damage and 14 (4d6) radiant damage on a failed save, or half as much damage on a successful one. If the councillor casts this spell using a spell slot of 6th level or higher, the fire damage or the radiant damage (its choice) increases by 1d6 for each slot level above 5th.
legendary_description: "Legendary Action Uses: 2. Immediately after another creature's turn, the undying councillor can expend a use to take one of the following actions. The undying councillor regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Touch
    desc: The councillor makes one attack with its Radiant Touch.
  - name: Shimmering Aura (Costs 2 Actions)
    desc: The councillor channels positive energy into its Aura of Radiance. Until the end of the councillor's next turn, it sheds bright light in a 30-foot radius and dim light for an additional 30 feet. Any creature that starts its turn in the bright light must succeed on a DC 17 Constitution saving throw or be blinded until the end of the councillor's next turn.
```
