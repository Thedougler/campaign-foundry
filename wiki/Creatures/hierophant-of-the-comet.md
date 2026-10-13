---
title: Hierophant of the Comet
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hierophant of the Comet
size: Medium
type: humanoid
subtype: warlock
alignment: typically Chaotic Evil
ac: 15
ac_class: breastplate
hp: 153
hit_dice: 18d8 + 72
modifier: 1
speed: 30 ft.
stats: [ 12, 13, 18, 15, 17, 20 ]
saves:
  - wis: 7
  - cha: 9
skillsaves:
  - arcana: 10
  - deception: 9
  - persuasion: 9
  - religion: 6
damage_resistances: psychic
senses: truesight 30 ft., passive Perception 13
languages: Common plus any two languages, telepathy 60 ft.
cr: "11"
traits:
  - name: Comet's Voice (1/Day)
    desc: The hierophant can cast *Contact Other Plane*, using Charisma as the spellcasting ability.
  - name: Magic Resistance
    desc: The hierophant has advantage on saving throws against spells and other magical effects.
  - name: Thought Shield
    desc: The hierophant's thoughts can't be read by any means unless the hierophant allows it.
actions:
  - name: Multiattack
    desc: The hierophant makes two Herald's Axe attacks or three Comet Blast attacks.
  - name: Herald's Axe
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 11 (1d12 + 5) slashing damage plus 10 (3d6) necrotic damage."
  - name: Comet Blast
    desc: "*Ranged Spell Attack:* +9 to hit, range 120 ft., one target. *Hit:* 16 (2d10 + 5) force damage."
  - name: All-Consuming Star (Recharge 6)
    desc: "The hierophant conjures a manifestation of the All-Consuming Star: brilliant light and haunting screams that fill a 20-foot-radius sphere centred on a point the hierophant can see within 60 feet of itself. Each creature within the sphere has the blinded and deafened conditions. Each creature that enters the sphere for the first time on a turn or starts its turn there must make a DC 17 Wisdom saving throw. On a failed save, a creature takes 27 (6d8) psychic damage and has the incapacitated condition until the start of its next turn. On a successful save, a creature takes half as much damage only. The manifestation persists until the hierophant dies, has the incapacitated condition, uses a bonus action to end the effect, or uses this action again."
  - name: Spellcasting
    desc: |-
      The hierophant casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *Detect Thoughts*, *Mage Hand*, *Thaumaturgy*

      **1/day each:** *Dimension Door*, *Mass Suggestion*
bonus_actions:
  - name: Star's Hunger
    desc: The hierophant targets one creature within 30 feet of the center of its All-Consuming Star. The target must succeed on a DC 17 Strength saving throw or be pulled up to 30 feet toward the center of the All-Consuming Star.
```
