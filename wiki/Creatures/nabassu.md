---
title: Nabassu
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Fiend
size: Medium
habitat:
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nabassu
size: Medium
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 18
ac_class: natural armour
hp: 190
hit_dice: 20d8 + 100
modifier: 2
speed: 40 ft., fly 60 ft.
stats: [ 22, 14, 21, 14, 15, 17 ]
saves:
  - str: 11
  - dex: 7
skillsaves:
  - perception: 7
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 60 ft., passive Perception 17
languages: Abyssal, telepathy 120 ft.
cr: "15"
traits:
  - name: Demonic Shadows
    desc: The nabassu darkens the area around its body in a 10-foot radius. Nonmagical light can't illuminate this area of dim light.
  - name: Devour Soul
    desc: A nabassu can eat the soul of a creature it has killed within the last hour, provided that creature is neither a Construct nor an Undead. The devouring requires the nabassu to be within 5 feet of the corpse for at least 10 minutes, after which it gains a number of Hit Dice (d8s) equal to half the creature's number of Hit Dice. Roll those dice, and increase the nabassu's hit points by the numbers rolled. For every 4 Hit Dice the nabassu gains in this way, its attacks deal an extra 3 (1d6) damage on a hit. The nabassu retains these benefits for 6 days. A creature devoured by a nabassu can be restored to life only by a *wish* spell.
  - name: Magic Resistance
    desc: The nabassu has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The nabassu makes one Bite attack and one Claw attack, and it uses Soul-Stealing Gaze.
  - name: Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 38 (5d12 + 6) necrotic damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 28 (4d10 + 6) force damage."
  - name: Soul-Stealing Gaze
    desc: The nabassu targets one creature it can see within 30 feet of it. If the target isn't a Construct or an Undead, it must succeed on a DC 16 Charisma saving throw or take 13 (2d12) necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage dealt, and the nabassu regains hit points equal to half that amount. This reduction lasts until the target finishes a short or long rest. The target dies if its hit point maximum is reduced to 0, and if the target is a Humanoid, it immediately rises as a ghoul under the nabassu's control.
```
