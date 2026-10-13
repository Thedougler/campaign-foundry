---
title: Venom Troll
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Giant
size: Large
habitat:
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
name: Venom Troll
size: Large
type: giant
alignment: Typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 94
hit_dice: 9d10 + 45
modifier: 1
speed: 30 ft.
stats: [ 18, 13, 20, 7, 9, 7 ]
skillsaves:
  - perception: 2
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 60 ft., passive Perception 12
languages: Giant
cr: "7"
traits:
  - name: Poison Splash
    desc: When the troll takes damage of any type but psychic, each creature within 5 feet of the troll takes 9 (2d8) poison damage.
  - name: Regeneration
    desc: The troll regains 10 hit points at the start of each of its turns. If the troll takes acid or fire damage, this trait doesn't function at the start of the troll's next turn. The troll dies only if it starts its turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: The troll makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage plus 4 (1d8) poison damage, and the creature is poisoned until the start of the troll's next turn."
  - name: Claws
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage plus 4 (1d8) poison damage."
  - name: Venom Spray (Recharge 6)
    desc: The troll slices itself with a claw, releasing a spray of poison in a 15-foot cube. The troll takes 7 (2d6) slashing damage (this damage can't be reduced in any way). Each creature in the area must make a DC 16 Constitution saving throw. On a failed save, a creature takes 18 (4d8) poison damage and is poisoned for 1 minute. On a successful save, the creature takes half as much damage and isn't poisoned. A poisoned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```
