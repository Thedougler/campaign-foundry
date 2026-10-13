---
title: Cadaver Collector
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Construct
size: Large
habitat:
  - Grassland
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cadaver Collector
size: Large
type: construct
alignment: Typically Lawful Evil
ac: 17
ac_class: natural armour
hp: 189
hit_dice: 18d10 + 90
modifier: 2
speed: 30 ft.
stats: [ 21, 14, 20, 5, 11, 8 ]
damage_immunities: necrotic; poison; psychic; bludgeoning, piercing, slashing from nonmagical attacks that aren't adamantine
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 10
languages: understands all languages but can't speak
cr: "14"
traits:
  - name: Magic Resistance
    desc: The collector has advantage on saving throws against spells and other magical effects.
  - name: Unusual Nature
    desc: The collector doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The collector makes two Slam attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 18 (3d8 + 5) bludgeoning damage plus 16 (3d10) necrotic damage."
  - name: Paralysing Breath (Recharge 5–6)
    desc: The collector releases paralysing gas in a 30-foot cone. Each creature in that area must make a successful DC 18 Constitution saving throw or be paralysed for 1 minute. A paralysed creature repeats the saving throw at the end of each of its turns, ending the effect on itself with a success.
bonus_actions:
  - name: Summon Spectres (Recharges after a Short or Long Rest)
    desc: The collector calls up the enslaved spirits of those it has slain; 1d4 spectres (without Sunlight Sensitivity) arise in unoccupied spaces within 15 feet of it. The spectres act right after the collector on the same initiative count and fight until they're destroyed. They disappear when the collector is destroyed.
```
