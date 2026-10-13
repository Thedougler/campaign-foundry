---
title: Zuggtmoy
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Zuggtmoy
size: Large
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 18
ac_class: natural armour
hp: 304
hit_dice: 32d10 + 128
modifier: 2
speed: 30 ft.
stats: [ 22, 15, 18, 20, 19, 24 ]
saves:
  - dex: 9
  - con: 11
  - wis: 11
skillsaves:
  - perception: 11
damage_resistances: cold, fire, lightning
damage_immunities: poison; bludgeoning, piercing, slashing that is nonmagical
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: truesight 120 ft., passive Perception 21
languages: all, telepathy 120 ft.
cr: "23"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Zuggtmoy fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Zuggtmoy has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Zuggtmoy makes three Pseudopod attacks.
  - name: Pseudopod
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 15 (2d8 + 6) force damage plus 9 (2d8) poison damage."
  - name: Spellcasting
    desc: |-
      Zuggtmoy casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 22):

      **At will:** *detect magic*, *locate animals or plants*

      **3/day each:** *dispel magic*, *entangle*, *plant growth*

      **1/day each:** *etherealness*, *teleport*
bonus_actions:
  - name: Infestation Spores (3/Day)
    desc: Zuggtmoy releases spores that burst out in a cloud that fills a 20-foot-radius sphere centred on her, and it lingers for 1 minute. Any creature in the cloud when it appears, or that enters it later, must make a DC 19 Constitution saving throw. On a successful save, the creature can't be infected by these spores for 24 hours. On a failed save, the creature is infected with a disease called the spores of Zuggtmoy, which lasts until the creature is cured of the disease or dies. While infected in this way, the creature can't be reinfected, and it must repeat the saving throw at the end of every 24 hours, ending the infection on a success. On a failure, the infected creature's body is slowly taken over by fungal growth, and after three such failed saves, the creature dies and is reanimated as a spore servant if it's a type of creature that can be.
  - name: Mind Control Spores (Recharge 5–6)
    desc: Zuggtmoy releases spores that burst out in a cloud that fills a 20-foot-radius sphere centred on her, and it lingers for 1 minute. Humanoids and Beasts in the cloud when it appears, or that enter it later, must make a DC 19 Wisdom saving throw. On a successful save, a creature can't be infected by these spores for 24 hours. On a failed save, the creature is infected with a disease called the influence of Zuggtmoy for 24 hours. While infected in this way, the creature is charmed by her and can't be reinfected by these spores.
reactions:
  - name: Protective Thrall
    desc: When Zuggtmoy is hit by an attack roll, one creature within 10 feet of her that is charmed by her is hit by the attack instead.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Zuggtmoy can expend a use to take one of the following actions. Zuggtmoy regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: Zuggtmoy makes one Pseudopod attack.
  - name: Exert Will
    desc: One creature charmed by Zuggtmoy that she can see must use its reaction, if a available, to move up to its speed as she directs or to make one weapon attack against a target that she designates.
```
