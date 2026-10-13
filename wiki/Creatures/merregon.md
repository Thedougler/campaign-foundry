---
title: Merregon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
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
name: Merregon
size: Medium
type: fiend
subtype: devil
alignment: Typically Lawful Evil
ac: 16
ac_class: natural armour
hp: 45
hit_dice: 6d8 + 18
modifier: 2
speed: 30 ft.
stats: [ 18, 14, 17, 6, 12, 8 ]
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: frightened, poisoned
gear:
  - halberd
  - heavy crossbow
senses: darkvision 60 ft., passive Perception 11
languages: understands Infernal but can't speak, telepathy 120 ft.
cr: "4"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the merregon's darkvision.
  - name: Magic Resistance
    desc: The merregon has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The merregon makes three Halberd attacks.
  - name: Halberd
    desc: "*Melee Weapon Attack:* +6 to hit, reach 10 ft., one target. *Hit:* 9 (1d10 + 4) slashing damage."
  - name: Heavy Crossbow
    desc: "*Ranged Weapon Attack:* +4 to hit, range 100/400 ft., one target. *Hit:* 7 (1d10 + 2) piercing damage."
reactions:
  - name: Loyal Bodyguard
    desc: When another Fiend within 5 feet of the merregon is hit by an attack roll, the merregon causes itself to be hit instead.
```
