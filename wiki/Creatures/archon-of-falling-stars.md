---
title: Archon of Falling Stars
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Archon of Falling Stars
size: Medium
type: celestial
alignment: Lawful Good
ac: 18
ac_class: plate
hp: 144
hit_dice: 17d8 + 68
modifier: 2
speed: 30 ft.
stats: [ 20, 15, 19, 15, 21, 19 ]
saves:
  - str: 9
  - con: 8
  - wis: 9
  - cha: 8
skillsaves:
  - arcana: 6
  - history: 6
  - insight: 9
  - perception: 9
damage_immunities: radiant
condition_immunities: charmed, exhaustion, frightened
senses: truesight 120 ft., passive Perception 19
languages: all
cr: "12"
traits:
  - name: Innate Spellcasting
    desc: |-
      The archon's spellcasting ability is Wisdom (spell save DC 17, +9 to hit with spell attacks). The archon can innately cast the following spells, requiring no material components:

      **At will:** *command*, *guiding bolt*, *spare the dying*

      **1/day each:** crusader's mantle, *spirit guardians*
  - name: Magic Resistance
    desc: The archon has advantage on saving throws against spells and other magical effects.
  - name: Mount
    desc: If the archon isn't mounted, it can use a bonus action to magically teleport onto the creature serving as its mount, provided the archon and its mount are on the same plane of existence. When it teleports, the archon appears astride the mount, along with any equipment it is wearing or carrying. While mounted and not incapacitated, the archon can't be surprised, and both it and its mount have advantage on Dexterity saving throws. If the archon is reduced to 0 hit points while riding its mount, the mount is reduced to 0 hit points as well.
  - name: Radiant Rebirth (Recharges after a Long Rest)
    desc: If the archon is reduced to 0 hit points, it regains 30 hit points and springs back to its feet with a burst of radiance. Each creature of the archon's choice within 30 feet of it must succeed on a DC 16 Constitution saving throw, or the creature takes 13 (3d8) radiant damage and is blinded until the start of the archon's turn.
actions:
  - name: Multiattack
    desc: The archon makes two attacks with its radiant spear.
  - name: Radiant Spear
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 12 (2d6 + 5) piercing damage plus 10 (3d6) radiant damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the archon of falling stars can expend a use to take one of the following actions. The archon of falling stars regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The archon makes a radiant spear attack or casts *guiding bolt*.
  - name: Coordinated Assault (Costs 2 Actions)
    desc: The archon makes a radiant spear attack, and then its mount can use its reaction to make a melee weapon attack.
  - name: Return to Nyx (Costs 3 Actions)
    desc: The archon causes a corpse it can see within 30 feet of it to burst into a shower of radiant stars leaving no trace of it behind. Everything it is wearing or carrying remains. Each creature within 10 feet of the corpse when it bursts must succeed on a DC 16 Dexterity saving throw or take 22 (4d10) radiant damage.
```
