---
title: Sphinx of Secrets
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Celestial
size: Large
habitat:
  - Desert
  - Planar (Upper)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sphinx of Secrets
size: Large
type: celestial
alignment: Lawful Neutral
ac: 16
hp: 136
hit_dice: 16d10 + 48
modifier: 5
speed: 40 ft., fly 60 ft.
stats: [ 18, 15, 16, 18, 18, 18 ]
skillsaves:
  - history: 7
  - perception: 7
  - religion: 7
damage_resistances: necrotic, radiant
damage_immunities: psychic
condition_immunities: charmed, frightened
senses: Truesight 60 ft., passive Perception 17
languages: Celestial, Common
cr: "8"
traits:
  - name: Inscrutable
    desc: No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom (Insight) checks made to ascertain its intentions or sincerity are made with Disadvantage.
  - name: Magic Resistance
    desc: The sphinx has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The sphinx makes three Claw attacks. It can replace one attack with a use of Curse of the Riddle.
  - name: Claw
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 13 (2d8 + 4) Slashing damage plus 7 (2d6) Radiant damage."
  - name: Curse of the Riddle
    desc: "*Intelligence Saving Throw:* DC 15, one creature the sphinx can see within 60 feet. *Failure:* 21 (6d6) Psychic damage, and the target is cursed with a riddle. The cursed target has Disadvantage on ability checks and attack rolls. In addition, if it takes the Magic action, it must succeed on a DC 15 Intelligence saving throw or that action is wasted. The cursed target can take a Study action to make a DC 15 Intelligence check, solving the riddle and ending the curse on a success. The curse ends early if the sphinx curses another target."
  - name: Spellcasting
    desc: |-
      The sphinx casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *Detect Magic*, *Identify*, *Prestidigitation*

      **1/day each:** *Locate Object*, *Remove Curse*
```
