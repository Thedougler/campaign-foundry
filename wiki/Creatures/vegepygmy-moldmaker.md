---
title: Vegepygmy Moldmaker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Plant
size: Small
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vegepygmy Moldmaker
size: Small
type: plant
alignment: typically Neutral
ac: 15
ac_class: natural armour
hp: 44
hit_dice: 8d6 + 16
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 14, 10, 16, 11 ]
saves:
  - int: 2
  - wis: 5
skillsaves:
  - perception: 5
  - stealth: 4
damage_resistances: lightning, piercing
senses: darkvision 60 ft., passive Perception 15
languages: Vegepygmy
cr: "3"
traits:
  - name: Plant Camouflage
    desc: The vegepygmy has advantage on Dexterity (Stealth) checks it makes in any terrain with ample obscuring vegetation.
  - name: Regeneration
    desc: The vegepygmy regains 7 hit points at the start of its turn. If it takes cold, fire, or necrotic damage, this trait doesn't function at the start of the vegepygmy's next turn. The vegepygmy dies only if it starts its turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: The vegepygmy makes two Claw attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 12 (3d6 + 2) slashing damage."
  - name: Toxic Mold (2/Day)
    desc: |-
      The vegepygmy targets a creature it can see within 60 feet of itself. If the target isn't a vegepygmy, it must make a DC 13 Constitution saving throw. On a failed save, the target takes 13 (3d8) poison damage and has the blinded and deafened conditions for 1 minute as it becomes covered in a thick layer of mold. On a successful save, the target takes half as much damage only.

      The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```
