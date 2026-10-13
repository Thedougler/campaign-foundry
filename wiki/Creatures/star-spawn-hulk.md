---
title: Star Spawn Hulk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Aberration
size: Large
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Star Spawn Hulk
size: Large
type: aberration
alignment: Typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 136
hit_dice: 13d10 + 65
modifier: -1
speed: 30 ft.
stats: [ 20, 8, 21, 7, 12, 9 ]
saves:
  - dex: 3
  - wis: 5
skillsaves:
  - perception: 5
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, frightened
senses: darkvision 60 ft., passive Perception 15
languages: Deep Speech
cr: "10"
traits:
  - name: Psychic Mirror
    desc: If the hulk takes psychic damage, each creature within 10 feet of the hulk takes that damage instead; the hulk takes none of the damage. In addition, the hulk's thoughts and location can't be discerned by magic.
actions:
  - name: Multiattack
    desc: The hulk makes two Slam attacks. If both attacks hit the same target, the target also takes 9 (2d8) psychic damage and must succeed on a DC 17 Constitution saving throw or be stunned until the end of the target's next turn.
  - name: Slam
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 14 (2d8 + 5) bludgeoning damage."
  - name: Reaping Arms (Recharge 5–6)
    desc: The hulk makes a separate Slam attack against each creature within 10 feet of it. Each creature that is hit must also succeed on a DC 17 Dexterity saving throw or be knocked prone.
```
