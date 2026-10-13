---
title: Hoard Mimic
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hoard Mimic
size: Huge
type: monstrosity
alignment: typically Neutral
ac: 14
ac_class: natural armour
hp: 123
hit_dice: 13d12 + 39
modifier: 1
speed: 30 ft.
stats: [ 21, 12, 17, 10, 16, 10 ]
saves:
  - con: 6
  - wis: 6
skillsaves:
  - persuasion: 3
  - stealth: 6
condition_immunities: prone
senses: darkvision 60 ft., passive Perception 13
languages: Common, Draconic, telepathy 120 ft.
cr: "8"
traits:
  - name: False Appearance (Hoard Form Only)
    desc: If the mimic is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the mimic move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the mimic is animate.
actions:
  - name: Multiattack
    desc: The mimic makes one Bite attack and two Pseudopod attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one creature. *Hit:* 16 (2d10 + 5) piercing damage plus 7 (2d6) acid damage."
  - name: Pseudopod
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 12 (2d6 + 5) bludgeoning damage, and the mimic adheres to the target. A creature adhered to the mimic is also grappled by it (escape DC 16). Until this grapple ends, the target is restrained. Ability checks made to escape this grapple have disadvantage."
  - name: Caustic Mist (Recharge 5–6)
    desc: The mimic sprays a fine mist of acid in a 30-foot cone. Each creature in that area must make a DC 14 Dexterity saving throw. On a failed save, the creature takes 27 (6d8) acid damage and is blinded until the end of its next turn. On a successful save, the creature takes half as much damage and isn't blinded.
  - name: Shapechanger
    desc: The mimic transforms into a hoard or back into its true, amorphous form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies.
```
