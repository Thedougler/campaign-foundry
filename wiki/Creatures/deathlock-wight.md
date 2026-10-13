---
title: Deathlock Wight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Deathlock Wight
size: Medium
type: undead
subtype: warlock
alignment: Typically Neutral Evil
ac: 12
hp: 37
hit_dice: 5d8 + 15
modifier: 2
speed: 30 ft.
stats: [ 11, 14, 16, 12, 14, 16 ]
saves:
  - wis: 4
skillsaves:
  - arcana: 3
  - perception: 4
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: darkvision 60 ft., passive Perception 14
languages: the languages it knew in life
cr: "3"
traits:
  - name: Sunlight Sensitivity
    desc: While in sunlight, the deathlock has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
  - name: Unusual Nature
    desc: The deathlock doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The deathlock makes two Life Drain or Grave Bolt attacks.
  - name: Life Drain
    desc: |-
      *Melee Weapon Attack:* +4 to hit, reach 5 ft., one creature. *Hit:* 6 (1d8 + 2) necrotic damage. The target must succeed on a DC 13 Constitution saving throw, or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if its hit point maximum is reduced to 0.

      A Humanoid slain by this attack rises 24 hours later as a zombie under the deathlock's control, unless the Humanoid is restored to life or its body is destroyed. The deathlock can have no more than twelve zombies under its control at one time.
  - name: Grave Bolt
    desc: "*Ranged Spell Attack:* +5 to hit, range 60 ft., one target. *Hit:* 12 (2d8 + 3) necrotic damage."
  - name: Spellcasting
    desc: |-
      The deathlock casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *detect magic*, *disguise self*, *mage armour*

      **1/day each:** *fear*, *hold person*
```
