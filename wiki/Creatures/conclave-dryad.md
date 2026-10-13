---
title: Conclave Dryad
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Fey
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Conclave Dryad
size: Medium
type: fey
alignment: Lawful Good
ac: 16
ac_class: natural armour
hp: 143
hit_dice: 22d8 + 44
modifier: 4
speed: 30 ft.
stats: [ 12, 19, 14, 19, 20, 21 ]
saves:
  - int: 8
  - wis: 9
  - cha: 9
skillsaves:
  - arcana: 8
  - nature: 8
  - perception: 9
gear:
  - longbow
senses: darkvision 60 ft., passive Perception 19
languages: Common, Elvish, Sylvan
cr: "9"
traits:
  - name: Innate Spellcasting
    desc: |-
      The dryad's innate spellcasting ability is Charisma (spell save DC 17). The dryad can innately cast the following spells, requiring no material components:

      **At will:** *druidcraft*

      **3/day each:** *dispel magic*, *entangle*, *plant growth*, *spike growth*

      **1/day each:** *moonbeam*, grasping vine, *wall of thorns*
  - name: Magic Resistance
    desc: The dryad has advantage on saving throws against spells and other magical effects.
  - name: Speak with Beasts and Plants
    desc: The dryad can communicate with beasts and plants as if they and the dryad shared a language.
actions:
  - name: Multiattack
    desc: The dryad makes three attacks, using its vine staff, its longbow, or both.
  - name: Vine Staff
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 17 Dexterity saving throw or become restrained by twisting vines for 1 minute. A target restrained in this way can use an action to make a DC 17 Strength (Athletics) or Dexterity (Acrobatics) check, ending the effect on itself on a success."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +8 to hit, range 150/600 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage."
  - name: Summon Mount (1/Day)
    desc: "The dryad magically summons a mount, which appears in an unoccupied space within 60 feet of the dryad. The mount remains for 8 hours, until it or the dryad dies, or until the dryad dismisses it as an action. The mount uses the stat block of an elk (see the Monster Manual) with these changes: it is a plant instead of a beast, it has an Intelligence of 6, and it understands Sylvan but can't speak. While within 1 mile of the mount, the dryad can communicate with it telepathically."
  - name: Suppress Magic (Recharge 5–6)
    desc: The dryad targets one magic item it can see within 120 feet of it. If the magic item isn't an artifact, its magical properties are suppressed for 10 minutes, until the dryad is incapacitated or dies, or until the dryad uses a bonus action to end the effect.
```
