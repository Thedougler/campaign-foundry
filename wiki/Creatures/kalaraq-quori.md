---
title: Kalaraq Quori
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 19
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kalaraq Quori
size: Medium
type: aberration
alignment: Lawful Evil
ac: 18
ac_class: natural armour
hp: 161
hit_dice: 19d8 + 76
modifier: 5
speed: 30 ft., fly 60 ft. (hover)
stats: [ 12, 21, 18, 23, 24, 25 ]
saves:
  - int: 12
  - wis: 13
  - cha: 13
skillsaves:
  - deception: 13
  - perception: 13
  - persuasion: 13
damage_resistances: cold; necrotic; poison; psychic; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: blinded, charmed, exhaustion, frightened, grappled, paralysed, petrified, prone, restrained
senses: truesight 120 ft., passive Perception 23
languages: all, telepathy 120 ft.
cr: "19"
traits:
  - name: Innate Spellcasting (Psionics)
    desc: |-
      The quori's spellcasting ability is Charisma (spell save DC 21, +13 to hit with spell attacks). It can innately cast the following spells, requiring no components:

      **At will:** *arcane eye*

      **3/day each:** *clairvoyance*, *confusion*, *dream*, *eyebite*
  - name: All-Around Vision
    desc: The quori can't be surprised while it isn't incapacitated.
  - name: Incorporeal Movement
    desc: The quori can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Magic Resistance
    desc: The quori has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The quori makes two Soul Binding attacks. Alternatively, it can make four attacks with Arcane Blast.
  - name: Arcane Blast
    desc: "*Ranged Spell Attack:* +13 to hit, range 120 ft., one target. *Hit:* 12 (1d10 + 7) force damage."
  - name: Soul Binding
    desc: "*Melee Spell Attack:* +13 to hit, reach 5 ft., one target. *Hit:* 29 (4d10 + 7) necrotic damage. A creature reduced to 0 hit points from this attack dies and has its soul imprisoned in one of the quori's eyes. The target can't be revived by any means short of a *wish* spell until the quori is destroyed."
  - name: Mind Seed (1/Day)
    desc: |-
      The quori touches one humanoid, which must succeed on a DC 21 Intelligence saving throw or be cursed. The curse lasts until it's removed by a remove curse or *greater restoration* spell.

      The cursed target suffers 1 level of exhaustion every 24 hours, and finishing a long rest doesn't reduce its exhaustion. If the cursed target reaches exhaustion level 6, it doesn't die; it instead becomes a thrall under the quori's control, and all its exhaustion is removed. Only the *wish* spell can free the thrall from this control.
  - name: Swarm of Eyes (Recharge 6)
    desc: The quori creates a swarm of spectral eyes that fills a 30-foot-radius sphere centred on a point it can see within 60 feet of it. Each creature in that area must make a DC 21 Wisdom saving throw. On a failure, a creature takes 45 (10d8) psychic damage, and it is blinded for 1 minute. On a success, a creature takes half as much damage and isn't blinded. A blinded creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Possession (Recharge 6)
    desc: |-
      One humanoid that the quori can see within 5 feet of it must succeed on a DC 21 Charisma saving throw or be possessed by the quori; the quori then disappears, and the target is incapacitated and loses control of its body. The quori now controls the body but doesn't deprive the target of awareness. The quori can't be targeted by any attack, spell, or other effect, and it retains its alignment, Intelligence, Wisdom, Charisma, and immunity to being charmed and frightened. It otherwise uses the possessed target's statistics, but doesn't gain access to the target's knowledge, class features, or proficiencies.

      The possession lasts until the body drops to 0 hit points, the quori ends it as a bonus action, or the quori is forced out by an effect like the *dispel evil and good* spell. When the possession ends, the quori reappears in an unoccupied space within 5 feet of the body. The target is immune to this quori's Possession for 24 hours after succeeding on the saving throw or after the possession ends.
```
