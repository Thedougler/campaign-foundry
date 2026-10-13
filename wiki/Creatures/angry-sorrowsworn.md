---
title: Angry Sorrowsworn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Monstrosity
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Angry Sorrowsworn
size: Medium
type: monstrosity
alignment: Typically Neutral Evil
ac: 18
ac_class: natural armour
hp: 255
hit_dice: 30d8 + 120
modifier: 0
speed: 30 ft.
stats: [ 17, 10, 19, 8, 13, 6 ]
skillsaves:
  - perception: 11
damage_resistances: bludgeoning, piercing, slashing while in dim light or darkness
senses: darkvision 60 ft., passive Perception 21
languages: Common
cr: "13"
traits:
  - name: Two Heads
    desc: The sorrowsworn has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, or knocked unconscious.
  - name: Rising Anger
    desc: |-
      If another creature deals damage to the sorrowsworn, the sorrowsworn's attack rolls have advantage until the end of its next turn, and the first time it hits with a Hook attack on its next turn, the attack's target takes an extra 19 (3d12) psychic damage.

      On its turn, the sorrowsworn has disadvantage on attack rolls if no other creature has dealt damage to it since the end of its last turn.
actions:
  - name: Multiattack
    desc: The sorrowsworn makes two Hook attacks.
  - name: Hook
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 16 (2d12 + 3) piercing damage."
```
