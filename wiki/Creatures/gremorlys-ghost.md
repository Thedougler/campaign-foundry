---
title: Gremorly's Ghost
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gremorly's Ghost
size: Medium
type: undead
alignment: Neutral Evil
ac: 12
hp: 82
hit_dice: 15d8 + 15
modifier: 2
speed: 0 ft., fly 40 ft. (hover)
stats: [ 7, 14, 12, 18, 12, 17 ]
saves:
  - int: 8
  - wis: 5
skillsaves:
  - arcana: 8
  - history: 8
damage_resistances: acid; fire; lightning; thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: cold, necrotic, poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: darkvision 60 ft., passive Perception 11
languages: Common, Draconic, Dwarvish, Giant
cr: "9"
traits:
  - name: Ethereal Sight
    desc: Gremorly can see 60 feet into the Ethereal Plane when he is on the Material Plane, and vice versa.
  - name: Incorporeal Movement
    desc: Gremorly can move through other creatures and objects as if they were difficult terrain. He takes 5 (1d10) force damage if he ends his turn inside an object.
  - name: Legendary Resistance (3/Day)
    desc: If Gremorly fails a saving throw, he can choose to succeed instead.
actions:
  - name: Multiattack
    desc: Gremorly makes three Withering Strike attacks.
  - name: Withering Strike
    desc: "*Melee Spell Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 19 (3d12) necrotic damage."
  - name: Fell Necromancy
    desc: Gremorly targets one creature he can see within 60 feet of himself. The target must make a DC 16 Constitution saving throw, taking 61 (7d8 + 30) necrotic damage on a failed save, or half as much damage on a successful one. In addition, Gremorly regains 9 (2d8) hit points.
  - name: Possession (Recharge 6)
    desc: |-
      One Humanoid Gremorly can see within 5 feet of himself must succeed on a DC 15 Charisma saving throw or be possessed by him; Gremorly disappears, and the target has the incapacitated condition and loses control of its body. Gremorly can't be targeted by any attack, spell, or other effect, except ones that turn Undead, and he retains his alignment, Intelligence, Wisdom, Charisma, and immunity to the charmed and frightened conditions. He otherwise uses the target's game statistics, but Gremorly doesn't gain access to the target's knowledge, class features, or proficiencies.

      The possession lasts until the target drops to 0 hit points, Gremorly ends it as a bonus action, or Gremorly is turned or forced out by an effect like the *Dispel Evil and Good* spell. When the possession ends, Gremorly reappears in an unoccupied space within 5 feet of the target. The target is immune to this Possession for 24 hours after succeeding on the saving throw or after the possession ends.
  - name: Spellcasting
    desc: |-
      Gremorly casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *Dancing Lights*, *Mage Hand*, *Prestidigitation*

      **2/day each:** *Bestow Curse*, *Dispel Magic*

      **1/day:** *Slow*
bonus_actions:
  - name: Ethereal Step (Recharge 4–6)
    desc: Gremorly teleports up to 30 feet to an unoccupied space he can see.
```
