---
title: Rakdos
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 24
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Rakdos
size: Huge
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 20
ac_class: natural armour
hp: 300
hit_dice: 24d12 + 144
modifier: 2
speed: 40 ft., fly 80 ft.
stats: [ 26, 15, 22, 14, 18, 30 ]
saves:
  - str: 15
  - con: 13
  - wis: 11
  - cha: 17
skillsaves:
  - intimidation: 17
  - performance: 17
  - persuasion: 17
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: fire, poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: truesight 120 ft., passive Perception 14
languages: Abyssal, Common
cr: "24"
traits:
  - name: Innate Spellcasting
    desc: |
      Rakdos's spellcasting ability is Charisma (spell save DC 25). He can innately cast *hellish rebuke* (at 5th level) at will, requiring no material components.
  - name: Captivating Presence
    desc: Any creature that starts its turn within 30 feet of Rakdos must make a DC 25 Wisdom saving throw. On a failed save, the creature becomes charmed by Rakdos for 1 minute or until the creature is farther than 30 feet away from him. On a successful save, the creature becomes immune to Rakdos's Captivating Presence for 24 hours.
  - name: Cruel Entertainment
    desc: When a creature Rakdos can see within 60 feet of him is reduced to 0 hit points, Rakdos gains 25 temporary hit points.
  - name: Legendary Resistance (3/Day)
    desc: If Rakdos fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Rakdos has advantage on saving throws against spells and other magical effects.
  - name: Magic Weapons
    desc: Rakdos's weapon attacks are magical.
actions:
  - name: Multiattack
    desc: Rakdos makes two attacks with his Curtain-Call Scythe or his claws.
  - name: Curtain-Call Scythe
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 24 (3d10 + 8) slashing damage plus 13 (3d8) fire damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 17 (2d8 + 8) slashing damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Rakdos can expend a use to take one of the following actions. Rakdos regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Sadistic Revelry
    desc: Each creature within 60 feet of Rakdos that is his ally or is charmed by him must use its reaction to move up to half its speed toward the creature closest to it that it can see, provided it isn't already within 5 feet of that creature. It then must make one melee attack against that creature if it is able to do so.
  - name: Scythe (Costs 2 Actions)
    desc: Rakdos uses Curtain-Call Scythe.
  - name: Touch of Pain (Costs 3 Actions)
    desc: Rakdos makes a claw attack against one creature within 10 feet of him. The target must succeed on a DC 25 Constitution saving throw or be poisoned for 1 minute. While poisoned in this way, the creature can't maintain concentration on a spell or any other effect that requires concentration. The poisoned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```
