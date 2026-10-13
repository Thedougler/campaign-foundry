---
title: Vegepygmy Thorny Hunter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Plant
size: Medium
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vegepygmy Thorny Hunter
size: Medium
type: plant
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 27
hit_dice: 5d8 + 5
modifier: 2
speed: 40 ft.
stats: [ 15, 14, 13, 2, 10, 6 ]
skillsaves:
  - perception: 4
  - stealth: 4
  - survival: 4
damage_resistances: lightning, piercing
senses: darkvision 60 ft., passive Perception 14
cr: "2"
traits:
  - name: Pack Tactics
    desc: The vegepygmy has advantage on attack rolls against a creature if at least one of the vegepygmy's allies is within 5 feet of the creature and the ally doesn't have the incapacitated condition.
  - name: Plant Camouflage
    desc: The vegepygmy has advantage on Dexterity (Stealth) checks it makes in any terrain with ample obscuring vegetation.
  - name: Regeneration
    desc: The vegepygmy regains 5 hit points at the start of its turn. If it takes cold, fire, or necrotic damage, this trait doesn't function at the start of the vegepygmy's next turn. The vegepygmy dies only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Thorny Body
    desc: At the start of its turn, the vegepygmy deals 2 (1d4) piercing damage to any creature grappling it.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 11 (2d8 + 2) piercing damage. If the target is a creature, it must succeed on a DC 12 Strength saving throw or have the prone condition."
```
