---
title: Thorny Vegepygmy
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Plant
size: Medium
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
name: Thorny Vegepygmy
size: Medium
type: plant
alignment: Typically Neutral
ac: 14
ac_class: natural armour
hp: 27
hit_dice: 5d8 + 5
modifier: 1
speed: 30 ft.
stats: [ 13, 12, 13, 2, 10, 6 ]
skillsaves:
  - perception: 4
  - stealth: 3
damage_resistances: lightning, piercing
senses: darkvision 60 ft., passive Perception 14
cr: "1"
traits:
  - name: Plant Camouflage
    desc: The thorny has advantage on Dexterity (Stealth) checks it makes in any terrain with ample obscuring vegetation.
  - name: Regeneration
    desc: The thorny regains 5 hit points at the start of its turn. If it takes cold, fire, or necrotic damage, this trait doesn't function at the start of the thorny's next turn. The thorny dies only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Thorny Body
    desc: At the start of its turn, the thorny deals 2 (1d4) piercing damage to any creature grappling it.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 10 (2d8 + 1) piercing damage."
```
