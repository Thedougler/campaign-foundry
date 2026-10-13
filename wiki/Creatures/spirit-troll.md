---
title: Spirit Troll
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Giant
size: Large
habitat:
  - Coastal
  - Forest
  - Swamp
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Spirit Troll
size: Large
type: giant
alignment: Typically Chaotic Evil
ac: 17
ac_class: natural armour
hp: 130
hit_dice: 20d10 + 20
modifier: 3
speed: 30 ft.
stats: [ 1, 17, 13, 8, 9, 16 ]
skillsaves:
  - perception: 3
damage_resistances: acid, cold, fire
damage_immunities: bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: exhaustion, grappled, paralysed, petrified, prone, restrained, unconscious
senses: darkvision 60 ft., passive Perception 13
languages: Giant
cr: "11"
traits:
  - name: Incorporeal Movement
    desc: The troll can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Regeneration
    desc: The troll regains 10 hit points at the start of each of its turns. If the troll takes psychic or force damage, this trait doesn't function at the start of the troll's next turn. The troll dies only if it starts its turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: The troll makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one creature. *Hit:* 19 (3d10 + 3) psychic damage, and the target must succeed on a DC 15 Wisdom saving throw or be stunned for 1 minute. The stunned target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Claws
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one creature. *Hit:* 19 (3d10 + 3) psychic damage."
```
