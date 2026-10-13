---
title: Borborygmos
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Borborygmos
size: Huge
type: giant
alignment: Chaotic Neutral
ac: 14
ac_class: natural armour
hp: 270
hit_dice: 20d12 + 140
modifier: 0
speed: 40 ft.
stats: [ 24, 11, 24, 8, 17, 16 ]
saves:
  - str: 13
  - con: 13
  - wis: 9
skillsaves:
  - athletics: 13
  - insight: 9
  - survival: 9
damage_resistances: poison, psychic
condition_immunities: charmed, frightened
gear:
  - maul
senses: tremorsense 60 ft., passive Perception 13
languages: Common, Giant
cr: "18"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Borborygmos fails a saving throw, he can choose to succeed instead.
  - name: Poor Depth Perception
    desc: Borborygmos has disadvantage on any attack roll against a target more than 30 feet away.
  - name: Siege Monster
    desc: Borborygmos deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: "Borborygmos can use his Frightful Presence. He also makes two attacks: one with his maul and one with his stomp."
  - name: Maul
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 28 (6d6 + 7) bludgeoning damage. If the target is a creature, it must succeed on a DC 21 Strength saving throw or be knocked prone."
  - name: Stomp
    desc: "*Melee Weapon Attack:* +13 to hit, reach 5 ft., one target. *Hit:* 18 (2d10 + 7) bludgeoning damage."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +13 to hit, range 30/120 ft., one target. *Hit:* 29 (4d10 + 7) bludgeoning damage."
  - name: Frightful Presence
    desc: Each creature of Borborygmos's choice that is within 60 feet of him and can see or hear him must succeed on a DC 17 Wisdom saving throw or become frightened of him for 1 minute. The frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to Borborygmos's Frightful Presence for the next 24 hours.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Borborygmos can expend a use to take one of the following actions. Borborygmos regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: Borborygmos makes a weapon attack.
  - name: Bellow (Costs 2 Actions)
    desc: Borborygmos yells menacingly at one creature he can see within 60 feet of him. That creature must succeed on a DC 17 Wisdom saving throw or become frightened of him for 1 minute. If the creature is already frightened, it becomes stunned instead. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to Borborygmos's Bellow for the next 24 hours.
  - name: Wide Berth (Costs 3 Actions)
    desc: Borborygmos moves up to half his speed and can move through the space of any creature smaller than Huge. The first time Borborygmos enters a creature's space during this move, the creature must make a DC 21 Dexterity saving throw. If the saving throw succeeds, the creature is pushed 5 feet away from Borborygmos. If the saving throw fails, that creature is knocked prone, and Borborygmos can make a stomp attack against it.
```
