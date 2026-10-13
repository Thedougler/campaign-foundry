---
title: Mind Drinker Vampire
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mind Drinker Vampire
size: Medium
type: undead
alignment: Neutral Evil
ac: 14
hp: 55
hit_dice: 10d8 + 10
modifier: 4
speed: 30 ft., fly 30 ft. (hover)
stats: [ 16, 18, 12, 19, 13, 14 ]
saves:
  - dex: 6
  - int: 6
  - wis: 3
skillsaves:
  - deception: 4
  - insight: 3
  - perception: 3
  - stealth: 6
damage_resistances: necrotic
senses: darkvision 60 ft., passive Perception 13
languages: the languages it knew in life
cr: "4"
traits:
  - name: Innate Spellcasting (Psionics)
    desc: |-
      The vampire's innate spellcasting ability is Intelligence (spell save DC 14). It can innately cast the following spells, requiring no components:

      **At will:** *message*

      **3/day each:** *charm person*, *hold person*, *mirror image*, *sleep*

      **1/day each:** *gaseous form*, *major image*
  - name: Shadow Stealth
    desc: While in dim light or darkness, the vampire can take the Hide action as a bonus action.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the vampire has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The vampire makes two attacks, only one of which can be a bite attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. *Hit:* 7 (1d6 + 4) piercing damage plus 7 (2d6) necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if its hit point maximum is reduced to 0."
  - name: Unarmed Strike
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) bludgeoning damage. The vampire can also grapple the target (escape DC 13) if it is a creature and the vampire has a hand free."
  - name: Mind Siphon (Recharge 5–6)
    desc: The vampire targets a creature it can see within 30 feet of it. The target must make a DC 14 Intelligence saving throw, with disadvantage if the vampire has previously consumed the target's blood. On a failed save, the target takes 28 (8d6) psychic damage, and the vampire discerns the target's surface emotions and thoughts. On a successful save, the target takes half as much damage, and the vampire discerns the target's general emotional state but not its thoughts.
```
