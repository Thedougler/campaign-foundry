---
title: Stone Giant Rockspeaker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Stone Giant Rockspeaker
size: Huge
type: giant
subtype: wizard
alignment: Any alignment
ac: 19
ac_class: natural armour
hp: 276
hit_dice: 24d12 + 120
modifier: 2
speed: 40 ft.
stats: [ 23, 15, 20, 19, 14, 10 ]
saves:
  - dex: 7
  - con: 10
  - int: 9
  - wis: 7
skillsaves:
  - athletics: 16
  - history: 9
  - perception: 7
senses: darkvision 120 ft., passive Perception 17
languages: Common, Giant, Terran
cr: "16"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the giant fails a saving throw, it can choose to succeed instead.
  - name: Stone Rune
    desc: |-
      The giant has a stone rune inscribed on a mineral object in its possession. While holding or wearing the object bearing the rune, the giant can use its Prismatic Rays action.

      The object bearing the rune has AC 18; 30 hit points; and immunity to necrotic, poison, and psychic damage. The object regains all its hit points at the end of every turn, but it turns to dust if reduced to 0 hit points or when the giant dies. If the rune is destroyed, the giant can inscribe a stone rune on an object in its possession when it finishes a short or long rest.
actions:
  - name: Multiattack
    desc: The giant makes three Prism Staff attacks.
  - name: Prism Staff
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 16 (3d6 + 6) bludgeoning damage plus 13 (3d8) radiant damage."
  - name: Exploding Geode
    desc: The giant throws a geode at a point within 60 feet of itself, and the geode explodes in a dazzling flash. Each creature in a 20-foot-radius sphere centred on that point must make a DC 17 Dexterity saving throw. On a failed save, a creature takes 13 (3d8) piercing damage plus 13 (3d8) radiant damage and has the blinded condition until the end of its next turn. On a successful save, a creature takes half as much damage only. After the giant throws the geode, roll a d6; on a roll of 4 or lower, the giant has no more geodes to throw.
  - name: Prismatic Rays (Requires Stone Rune)
    desc: "The giant's stone rune emits beams of light that form a 60-foot cone. Each creature in that area must make a DC 17 Dexterity saving throw. For each creature in that area, roll a d6 to determine what ray affects it:"
  - name: "1–2: Blazing Red"
    desc: On a failed save, the creature takes 35 (10d6) radiant damage and has the blinded condition until the end of the giant's next turn. On a successful save, the creature takes half as much damage only.
  - name: "3–4: Dreadful Blue"
    desc: On a failed save, the creature takes 35 (10d6) necrotic damage and has the frightened condition until the end of the giant's next turn. On a successful save, the creature takes half as much damage only.
  - name: "5–6: Sapping Green"
    desc: On a failed save, the creature takes 35 (10d6) force damage and has the incapacitated condition until the end of the giant's next turn. On a successful save, the creature takes half as much damage only.
```
