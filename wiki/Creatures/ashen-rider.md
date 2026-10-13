---
title: Ashen Rider
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ashen Rider
size: Medium
type: celestial
alignment: Lawful Evil
ac: 18
ac_class: plate
hp: 178
hit_dice: 21d8 + 84
modifier: 3
speed: 30 ft.
stats: [ 20, 16, 19, 15, 21, 18 ]
saves:
  - str: 10
  - con: 9
  - wis: 10
  - cha: 9
skillsaves:
  - history: 7
  - insight: 10
  - perception: 10
damage_immunities: thunder
condition_immunities: charmed, exhaustion, frightened
senses: truesight 120 ft., passive Perception 20
languages: all
cr: "16"
traits:
  - name: Innate Spellcasting
    desc: |-
      The ashen rider's spellcasting ability is Wisdom (spell save DC 18). The rider can innately cast the following spells, requiring no material components:

      **At will:** *command*, compelled duel

      **1/day each:** *banishment*, *blade barrier*
  - name: Aura of Silence
    desc: When a creature starts its turn within 30 feet of the ashen rider, the rider can force that creature to make a DC 18 Wisdom saving throw if the rider can see it. On a successful save, the creature is immune to this aura for the next 24 hours. On a failed save, the creature can't speak and is deafened until the start of its next turn.
  - name: Mount
    desc: |-
      If the ashen rider isn't mounted, it can use a bonus action to magically teleport onto the creature serving as its mount, provided the ashen rider and its mount are on the same plane of existence. When it teleports, the ashen rider appears astride the mount along with any equipment it is wearing or carrying.

      While mounted and not incapacitated, the ashen rider can't be surprised, and both it and its mount have advantage on Dexterity saving throws. If the ashen rider is reduced to 0 hit points while riding its mount, the mount is reduced to 0 hit points as well.
actions:
  - name: Multiattack
    desc: The ashen rider makes three attacks with its ashen blade or two attacks with its bolt of ash.
  - name: Ashen Blade
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 14 (2d8 + 5) slashing damage plus 13 (2d12) radiant damage."
  - name: Bolt of Ash
    desc: "*Ranged Spell Attack:* +10 to hit, range 120 ft., one creature. *Hit:* 22 (4d10) necrotic damage, and the target can't regain hit points until the start of the ashen rider's next turn."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the ashen rider can expend a use to take one of the following actions. The ashen rider regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The ashen rider makes an attack using its ashen blade or bolt of ash.
  - name: Coordinated Assault (Costs 2 Actions)
    desc: The ashen rider makes an attack using its ashen blade or bolt of ash, and then its mount can use its reaction to make a melee weapon attack.
  - name: Reduce to Ash (Costs 3 Actions)
    desc: The ashen rider targets a creature it can see within 60 feet of it. The target must succeed on a DC 18 Constitution saving throw, or it takes 27 (5d10) necrotic damage and its hit point maximum is reduced by an amount equal to the necrotic damage taken. This reduction lasts until the target finishes a long rest. If the target's hit point maximum is reduced to 0, its body and everything it is wearing and carrying, except for magic items, are reduced to ash. A creature reduced to ash can't be revived by any means short of a *wish* spell.
```
