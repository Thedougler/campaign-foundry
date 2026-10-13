---
title: Whirling Chandelier
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Whirling Chandelier
size: Large
type: construct
alignment: Unaligned
ac: 13
ac_class: natural armour
hp: 105
hit_dice: 14d10 + 28
modifier: 2
speed: 30 ft., fly 30 ft. (hover)
stats: [ 18, 15, 15, 3, 5, 1 ]
damage_resistances: fire
damage_immunities: poison, psychic
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, paralysed, petrified, poisoned
senses: blindsight 60 ft. (blind beyond this radius), passive Perception 7
languages: understands Common but can't speak
cr: "7"
traits:
  - name: False Appearance
    desc: If the chandelier is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the chandelier move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the chandelier is animate.
  - name: Fiery Aura
    desc: Any creature that starts its turn within 5 feet of the chandelier takes 7 (2d6) fire damage.
actions:
  - name: Multiattack
    desc: The chandelier makes three Chain attacks, three Lamp attacks, or a combination thereof.
  - name: Chain
    desc: "*Melee Weapon Attack:* +7 to hit, reach 15 ft., one target. *Hit:* 13 (2d8 + 4) bludgeoning damage, and the target must succeed on a DC 15 Strength saving throw or be pulled into an unoccupied space within 5 feet of the chandelier."
  - name: Lamp
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 9 (2d4 + 4) bludgeoning damage plus 13 (3d8) fire damage."
  - name: Blazing Vortex (Recharge 5–6)
    desc: Each creature within 20 feet of the chandelier and not behind total cover must succeed on a DC 14 Constitution saving throw or take 36 (8d8) fire damage and have the blinded condition until the start of the chandelier's next turn.
```
