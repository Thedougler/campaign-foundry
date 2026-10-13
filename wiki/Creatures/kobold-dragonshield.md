---
title: Kobold Dragonshield
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Dragon
size: Small
habitat:
  - Forest
  - Hill
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kobold Dragonshield
size: Small
type: dragon
alignment: Any alignment
ac: 15
ac_class: leather, shield
hp: 44
hit_dice: 8d6 + 16
modifier: 2
speed: 20 ft.
stats: [ 12, 15, 14, 8, 9, 10 ]
skillsaves:
  - perception: 1
damage_resistances: see Dragon's Resistance below
gear:
  - spear
senses: darkvision 60 ft., passive Perception 11
languages: Common, Draconic
cr: "1"
traits:
  - name: Dragon's Resistance
    desc: "The kobold has resistance to a type of damage based on the colour of dragon that invested it with power (choose or roll a d10): 1–2, acid (black or copper); 3–4, cold (silver or white); 5–6, fire (brass, gold, or red); 7–8, lightning (blue or bronze); 9–10, poison (green)."
  - name: Heart of the Dragon
    desc: If the kobold is frightened or paralysed by an effect that allows a saving throw, it can repeat the save at the start of its turn to end the effect on itself and all kobolds within 30 feet of it. Any kobold that benefits from this trait (including the dragonshield) has advantage on its next attack roll.
  - name: Pack Tactics
    desc: The kobold has advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally isn't incapacitated.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the kobold has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The kobold makes two Spear attacks.
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +3 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack."
```
