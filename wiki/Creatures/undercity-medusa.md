---
title: Undercity Medusa
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Undercity Medusa
size: Medium
type: monstrosity
alignment: Neutral Evil
ac: 16
ac_class: natural armour
hp: 120
hit_dice: 16d8 + 48
modifier: 4
speed: 30 ft.
stats: [ 16, 18, 16, 17, 12, 15 ]
skillsaves:
  - deception: 5
  - insight: 4
  - perception: 4
  - stealth: 7
senses: darkvision 60 ft., passive Perception 14
languages: Common, Elvish
cr: "6"
traits:
  - name: Innate Spellcasting
    desc: |-
      The medusa's innate spellcasting ability is Intelligence (spell save DC 14). The medusa can innately cast the following spells, requiring no material components:

      **1/day each:** *expeditious retreat*, *fog cloud*, *misty step*
  - name: Magic Resistance
    desc: The medusa has advantage on saving throws against spells and other magical effects.
  - name: Surprise Attack
    desc: During the first round of combat, the medusa has advantage on attack rolls against any creature that is surprised, and it deals an extra 10 (3d6) damage each time it hits such a creature with an attack.
actions:
  - name: Multiattack
    desc: The medusa makes two claw attacks. It can also use Petrifying Gaze before or after making these attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) slashing damage."
  - name: Petrifying Gaze
    desc: The medusa fixes its gaze on one creature within 60 feet of it that it can see and that can see its eyes. The target must make a DC 14 Constitution saving throw. If the saving throw fails by 5 or more, the creature is instantly petrified. Otherwise, a creature that fails the save begins to turn to stone and is restrained. The restrained creature must repeat the saving throw at the end of its next turn, becoming petrified on a failure or ending the effect on a success. The petrification lasts until the creature is freed by a *greater restoration* spell or similar magic.
```
