---
title: Shemeshka
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shemeshka
size: Medium
type: fiend
subtype: yugoloth
alignment: Neutral Evil
ac: 17
ac_class: natural armour
hp: 162
hit_dice: 25d8 + 50
modifier: 2
speed: 30 ft., fly 30 ft. (hover)
stats: [ 20, 14, 14, 21, 16, 18 ]
saves:
  - dex: 7
  - int: 10
  - wis: 8
  - cha: 9
skillsaves:
  - deception: 9
  - insight: 8
  - perception: 8
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: charmed, poisoned
senses: truesight 120 ft., passive Perception 18
languages: all, telepathy 120 ft.
cr: "14"
traits:
  - name: Legendary Resistance (4/Day)
    desc: If Shemeshka fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Shemeshka has advantage on saving throws against spells and other magical effects.
  - name: Special Equipment
    desc: Shemeshka carries a magic crown called the Razorvine Tiara. In the hands of anyone other than Shemeshka, the Razorvine Tiara functions as a tentacle rod that deals slashing damage instead of bludgeoning damage.
actions:
  - name: Multiattack
    desc: Shemeshka uses Arcane Flux or Spellcasting. She then makes one Claw attack or one attack with her Razorvine Tiara.
  - name: Arcane Flux
    desc: Shemeshka causes a surge of arcane energy to burst around one creature she can see within 120 feet of herself. The target must make a DC 18 Dexterity saving throw. On a failed save, the target takes 45 (7d12) force damage and has the incapacitated condition until the end of its next turn. On a successful save, the target takes half as much damage only.
  - name: Claw
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 10 (2d4 + 5) slashing damage plus 14 (4d6) poison damage."
  - name: Razorvine Tiara
    desc: "*Melee Weapon Attack:* +10 to hit, reach 15 ft., one target. *Hit:* 10 (3d6) slashing damage plus 9 (2d8) necrotic damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw, or its speed is halved and it has disadvantage on attack rolls and saving throws until the end of its next turn."
  - name: Spellcasting
    desc: |-
      Shemeshka casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *alter self*, *darkness*, *invisibility* (self only), *mage hand*, *prestidigitation*

      **2/day each:** *detect thoughts*, *dimension door*, *suggestion*

      **1/day each:** *banishment*, *contact other plane* (as an action), *mind blank*
bonus_actions:
  - name: Teleport
    desc: Shemeshka teleports, along with any equipment she is wearing or carrying, up to 60 feet to an unoccupied space she can see.
reactions:
  - name: Fell Counterspell (3/Day)
    desc: Shemeshka utters a magical word to interrupt a creature she can see that is casting a spell. If the spell is 5th level or lower, it fails and has no effect. If the spell is 6th level or higher, Shemeshka makes an Intelligence check (DC 10 + the spell's level). On a success, the spell fails and has no effect. Whatever the spell's level, the caster gains the poisoned condition until the end of its next turn.
```
