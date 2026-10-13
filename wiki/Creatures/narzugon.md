---
title: Narzugon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Narzugon
size: Medium
type: fiend
subtype: devil
alignment: Typically Lawful Evil
ac: 20
ac_class: plate armour, shield
hp: 112
hit_dice: 15d8 + 45
modifier: 0
speed: 30 ft.
stats: [ 20, 10, 17, 16, 14, 19 ]
saves:
  - dex: 5
  - con: 8
  - cha: 9
skillsaves:
  - perception: 12
damage_resistances: acid; cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: charmed, frightened, poisoned
senses: darkvision 120 ft., passive Perception 22
languages: Common, Infernal, telepathy 120 ft.
cr: "13"
traits:
  - name: Infernal Tack
    desc: The narzugon wears spurs that are part of infernal tack, which allow it to summon its nightmare companion as an action.
  - name: Magic Resistance
    desc: The narzugon has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The narzugon makes three Hellfire Lance attacks. It also uses Infernal Command or Terrifying Command.
  - name: Hellfire Lance
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 11 (1d12 + 5) piercing damage plus 16 (3d10) fire damage. If this damage kills a creature with a soul, the soul rises from the River Styx as a lemure in Avernus in 1d4 hours. If the creature isn't revived before then, only a *wish* spell or killing the lemure and casting true resurrection on the creature's original body can restore it to life. Constructs and devils are immune to this effect."
  - name: Infernal Command
    desc: Each ally of the narzugon within 60 feet of it can't be charmed or frightened until the end of the narzugon's next turn.
  - name: Terrifying Command
    desc: Each creature within 60 feet of the narzugon that isn't a Fiend must succeed on a DC 17 Charisma saving throw or become frightened of the narzugon for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. A creature that makes a successful saving throw is immune to this narzugon's Terrifying Command for 24 hours.
  - name: Healing (1/Day)
    desc: The narzugon, or one creature it touches, regains 100 hit points.
```
