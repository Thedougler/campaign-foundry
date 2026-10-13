---
title: Archon of the Triumvirate
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Archon of the Triumvirate
size: Medium
type: celestial
alignment: Lawful Neutral
ac: 18
ac_class: plate armour
hp: 144
hit_dice: 17d8 + 68
modifier: 2
speed: 30 ft.
stats: [ 20, 15, 19, 15, 21, 18 ]
saves:
  - con: 9
  - wis: 10
  - cha: 9
skillsaves:
  - insight: 10
  - perception: 10
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened
senses: darkvision 120 ft., passive Perception 20
languages: all
cr: "14"
traits:
  - name: Innate Spellcasting
    desc: |-
      The archon's innate spellcasting ability is Wisdom (spell save DC 18, +10 to hit with spell attacks). The archon can innately cast the following spells, requiring no material components:

      **At will:** *calm emotions*, *command*, compelled duel
  - name: Eye of the Law
    desc: As a bonus action, the archon can target a creature it can see within 120 feet of it and determine which laws that creature has broken in the last 24 hours.
  - name: Mount
    desc: If the archon isn't mounted, it can use a bonus action to magically teleport onto the creature serving as its mount, provided the archon and its mount are on the same plane of existence. When it teleports, the archon appears astride the mount along with any equipment it is wearing or carrying. While mounted and not incapacitated, the archon can't be surprised, and both it and its mount gain advantage on Dexterity saving throws. If the archon is reduced to 0 hit points while riding its mount, the mount is reduced to 0 hit points as well.
actions:
  - name: Multiattack
    desc: The archon makes two Hammer of Justice attacks.
  - name: Hammer of Justice
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) bludgeoning damage plus 18 (4d8) force damage. If the target is a creature, it must succeed on a DC 18 Strength saving throw or be knocked prone."
  - name: Pacifying Presence
    desc: Each creature of the archon's choice that the archon can see within 120 feet of it must succeed on a DC 18 Wisdom saving throw, or else the target drops any weapons it is holding, ends its concentration on any spells or other effects, and becomes charmed by the archon for 1 minute. The charmed creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the archon's Pacifying Presence for the next 24 hours.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the archon of the triumvirate can expend a use to take one of the following actions. The archon of the triumvirate regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Rejoin Mount
    desc: If the archon isn't mounted, it magically teleports to its steed and mounts it as long as the archon and its steed are on the same plane of existence.
  - name: Smite (Costs 2 Actions)
    desc: The archon makes a Hammer of Justice attack, and then its mount can use its reaction to make a melee weapon attack.
  - name: Detention (Costs 3 Actions)
    desc: The archon targets a creature it can see within 60 feet of it. The target must succeed on a DC 18 Charisma saving throw or be magically teleported to a harmless demiplane until the end of the archon's next turn, whereupon the target reappears in the space it left or the nearest unoccupied space if that space is occupied.
```
