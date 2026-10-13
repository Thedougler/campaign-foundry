---
title: Dusk Hag
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Fey
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dusk Hag
size: Medium
type: fey
alignment: Neutral Evil
ac: 17
ac_class: natural armour
hp: 82
hit_dice: 15d8 + 15
modifier: 2
speed: 30 ft.
stats: [ 11, 14, 12, 17, 16, 18 ]
saves:
  - int: 6
  - wis: 6
skillsaves:
  - deception: 7
  - insight: 6
  - perception: 6
condition_immunities: blinded, charmed, frightened
senses: blindsight 60 ft., passive Perception 16
languages: Common, Giant, Infernal
cr: "6"
traits:
  - name: Innate Spellcasting
    desc: |-
      The hag's spellcasting ability is Charisma (spell save DC 15). She can innately cast the following spells, requiring no material components:

      **At will:** *detect magic*, *disguise self*

      **3/day each:** *dream*, *hypnotic pattern*, *sleep* (9d8)

      **1/day each:** *legend lore*, *scrying*
  - name: Magic Resistance
    desc: The hag has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The hag makes two Nightmare Touch attacks.
  - name: Claws
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage."
  - name: Nightmare Touch
    desc: "*Melee Spell Attack:* +7 to hit, reach 5 ft., one creature. *Hit:* 18 (4d6 + 4) psychic damage. If the target is unconscious, it takes an extra 10 (3d6) psychic damage and is cursed until the hag dies or the curse is removed. The cursed creature's hit point maximum decreases by 5 (1d10) whenever it finishes a long rest."
reactions:
  - name: Dream Eater
    desc: When an unconscious creature the hag can see within 30 feet of her regains consciousness, the hag can force the creature to make a DC 15 Wisdom saving throw. Unless the save succeeds, the creature takes 11 (2d10) psychic damage, and the hag regains hit points equal to the amount of damage taken.
```
