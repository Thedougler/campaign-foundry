---
title: Necromancer Wizard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat:
  - Desert
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Necromancer Wizard
size: Medium
type: humanoid
alignment: Any alignment
ac: 12
ac_class: 15 with *mage armour*
hp: 110
hit_dice: 20d8 + 20
modifier: 2
speed: 30 ft.
stats: [ 9, 14, 12, 17, 12, 11 ]
saves:
  - int: 7
  - wis: 5
skillsaves:
  - arcana: 7
  - history: 7
damage_resistances: necrotic
senses: passive Perception 11
languages: any four languages
cr: "9"
actions:
  - name: Multiattack
    desc: The necromancer makes three Arcane Burst attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Spell Attack:* +7 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 25 (4d10 + 3) necrotic damage."
  - name: Spellcasting
    desc: |-
      The necromancer casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *dancing lights*, *mage hand*, *prestidigitation*

      **2/day each:** *bestow curse*, *dimension door*, *mage armour*, *web*

      **1/day each:** *circle of death*
bonus_actions:
  - name: Summon Undead (1/Day)
    desc: The necromancer magically summons five skeletons or zombies. The summoned creatures appear in unoccupied spaces within 60 feet of the necromancer, whom they obey. They take their turns immediately after the necromancer. Each lasts for 1 hour, until it or the necromancer dies, or until the necromancer dismisses it as a bonus action.
reactions:
  - name: Grim Harvest (1/Turn)
    desc: "When the necromancer kills a creature with necrotic damage, the necromancer regains 9 (2d8) hit points. "
```
