---
title: Grim Champion of Pestilence
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Grim Champion of Pestilence
size: Medium
type: undead
alignment: Neutral Evil
ac: 14
ac_class: 17 with *mage armour*
hp: 120
hit_dice: 16d8 + 48
modifier: 4
speed: 40 ft.
stats: [ 10, 18, 16, 17, 15, 21 ]
saves:
  - dex: 9
  - cha: 10
skillsaves:
  - arcana: 8
  - perception: 7
  - stealth: 9
damage_resistances: cold; necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, poisoned, stunned, unconscious
senses: darkvision 60 ft., passive Perception 17
languages: Common, Infernal
cr: "15"
traits:
  - name: Halo of Pestilence
    desc: The champion is surrounded by an aura of deadly magic that takes the form of a host of glowing white insects. Each creature that starts its turn within 10 feet of the champion must succeed on a DC 18 Constitution saving throw or have the incapacitated condition until the start of its next turn, as the insects ravage its body.
  - name: Legendary Resistance (3/Day)
    desc: If the champion fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The champion makes two Blight Staff attacks, two Plague Bolt attacks, or one of each.
  - name: Blight Staff
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) bludgeoning damage plus 21 (6d6) necrotic damage."
  - name: Plague Bolt
    desc: "*Ranged Spell Attack:* +10 to hit, range 120 ft., one target. *Hit:* 23 (4d8 + 5) poison damage, and the target has the poisoned condition until the start of the champion's next turn."
  - name: Spellcasting
    desc: |-
      The champion casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Magic*, *Mage Armour* (self only)

      **2/day each:** *Blight*, *Blindness/Deafness*

      **1/day each:** *Cloudkill*, *Contagion*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the grim champion of pestilence can expend a use to take one of the following actions. The grim champion of pestilence regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The champion makes one Blight Staff or Plague Bolt attack.
  - name: Furious Pursuit
    desc: The champion moves up to its speed or commands its mount to move up to its speed. This movement doesn't provoke opportunity attacks.
  - name: Cast a Spell (Costs 2 Actions)
    desc: The champion uses Spellcasting.
```
