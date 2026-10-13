---
title: Vegepygmy
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Plant
size: Small
habitat:
  - Forest
  - Swamp
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vegepygmy
size: Small
type: plant
alignment: Typically Neutral
ac: 13
ac_class: natural armour
hp: 13
hit_dice: 3d6 + 3
modifier: 2
speed: 30 ft.
stats: [ 7, 14, 13, 6, 11, 7 ]
skillsaves:
  - perception: 2
  - stealth: 4
damage_resistances: lightning, piercing
gear:
  - sling
senses: darkvision 60 ft., passive Perception 12
languages: Vegepygmy
cr: 1/4
traits:
  - name: Plant Camouflage
    desc: The vegepygmy has advantage on Dexterity (Stealth) checks it makes in any terrain with ample obscuring vegetation.
  - name: Regeneration
    desc: The vegepygmy regains 3 hit points at the start of its turn. If it takes cold, fire, or necrotic damage, this trait doesn't function at the start of the vegepygmy's next turn. The vegepygmy dies only if it starts its turn with 0 hit points and doesn't regenerate.
actions:
  - name: Claws
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage."
  - name: Sling
    desc: "*Ranged Weapon Attack:* +4 to hit, range 30/120 ft., one target. *Hit:* 4 (1d4 + 2) bludgeoning damage."
```
