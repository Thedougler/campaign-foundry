---
title: Deathlock Mastermind
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Undead
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Deathlock Mastermind
size: Medium
type: undead
subtype: warlock
alignment: Typically Neutral Evil
ac: 13
hp: 110
hit_dice: 20d8 + 20
modifier: 3
speed: 30 ft.
stats: [ 11, 16, 12, 15, 12, 17 ]
saves:
  - int: 5
  - cha: 6
skillsaves:
  - arcana: 5
  - history: 5
  - perception: 4
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: darkvision 120 ft., passive Perception 14
languages: the languages it knew in life
cr: "8"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the deathlock's darkvision.
  - name: Turn Resistance
    desc: The deathlock has advantage on saving throws against any effect that turns Undead.
  - name: Unusual Nature
    desc: The deathlock doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The deathlock makes two Deathly Claw or Grave Bolt attacks.
  - name: Deathly Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 13 (3d6 + 3 necrotic damage)."
  - name: Grave Bolt
    desc: "*Ranged Spell Attack:* +6 to hit, range 120 ft., one target. *Hit:* 13 (3d8) necrotic damage. If the target is Large or smaller, it must succeed on a DC 16 Strength saving throw or become restrained as shadowy tendrils wrap around it for 1 minute. A restrained target can use its action to repeat the saving throw, ending the effect on itself on a success."
  - name: Spellcasting
    desc: |-
      The deathlock casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 14):

      **At will:** *detect magic*, *disguise self*, *mage armour*, *minor illusion*

      **1/day each:** *darkness*, *dimension door*, *dispel magic*, *fly*, *invisibility*
```
