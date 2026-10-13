---
title: Skull Lord
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Undead
size: Medium
habitat:
  - Desert
  - Swamp
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Skull Lord
size: Medium
type: undead
subtype: sorcerer
alignment: Typically Lawful Evil
ac: 18
ac_class: plate
hp: 112
hit_dice: 15d8 + 45
modifier: 3
speed: 30 ft.
stats: [ 14, 16, 17, 16, 15, 21 ]
skillsaves:
  - athletics: 7
  - history: 8
  - perception: 12
  - stealth: 8
damage_resistances: cold; necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, poisoned, stunned, unconscious
senses: darkvision 60 ft., passive Perception 22
languages: all the languages it knew in life
cr: "15"
traits:
  - name: Evasion
    desc: If the skull lord is subjected to an effect that allows it to make a Dexterity saving throw to take only half the damage, the skull lord instead takes no damage if it succeeds on the saving throw and only half damage if it fails, provided it isn't incapacitated.
  - name: Legendary Resistance (3/Day)
    desc: If the skull lord fails a saving throw, it can choose to succeed instead.
  - name: Master of the Grave
    desc: While within 30 feet of the skull lord, any Undead ally of the skull lord makes saving throws with advantage, and that ally regains 1d6 hit points whenever it starts its turn there.
  - name: Unusual Nature
    desc: The skull lord doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The skull lord makes three Bone Staff or Deathly Ray attacks.
  - name: Bone Staff
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) bludgeoning damage plus 21 (6d6) necrotic damage."
  - name: Deathly Ray
    desc: "*Ranged Spell Attack:* +10 to hit, range 60 ft., one target. *Hit:* 27 (5d8 + 5) necrotic damage."
  - name: Spellcasting
    desc: |-
      The skull, lord casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 18):

      **At will:** *mage hand*, *message*

      **2/day each:** *dimension door*, *fear*

      **1/day each:** *cloudkill*, *cone of cold*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the skull lord can expend a use to take one of the following actions. The skull lord regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The skull lord makes one Bone Staff or Deathly Ray attack.
  - name: Move
    desc: The skull lord moves up to its speed without provoking opportunity attacks.
  - name: Summon Undead (Costs 2 Actions)
    desc: The skull lord summons up to five skeletons or zombies in unoccupied spaces within 30 feet of it. They remain until destroyed. Undead summoned in this way roll initiative, act in the next available turn, and obey the skull lord. The skull lord can have no more than five Undead summoned by this ability at a time.
```
