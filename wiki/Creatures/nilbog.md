---
title: Nilbog
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fey
size: Small
habitat:
  - Forest
  - Hill
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nilbog
size: Small
type: fey
subtype: goblinoid
alignment: Typically Chaotic Neutral
ac: 13
ac_class: leather armour
hp: 7
hit_dice: 2d6
modifier: 2
speed: 30 ft.
stats: [ 8, 14, 10, 10, 8, 15 ]
skillsaves:
  - stealth: 6
senses: darkvision 60 ft., passive Perception 9
languages: Common, Goblin
cr: "1"
traits:
  - name: Nilbogism
    desc: |-
      Any creature that attempts to damage the nilbog must first succeed on a DC 12 Charisma saving throw or be charmed until the end of the creature's next turn. A creature charmed in this way must use its action praising the nilbog.

      The nilbog can't regain hit points, including through magical healing, except through its Reversal of Fortune reaction.
actions:
  - name: Fool's Sceptre
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) bludgeoning damage."
  - name: Mocking Word
    desc: The nilbog targets one creature it can see within 60 feet of it. The target must succeed on a DC 12 Wisdom saving throw or take 5 (2d4) psychic damage and have disadvantage on its next attack roll before the end of its next turn.
  - name: Spellcasting
    desc: |-
      The nilbog casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 12):

      **At will:** *mage hand*, *Tasha's hideous laughter*
bonus_actions:
  - name: Nimble Escape
    desc: The nilbog takes the Disengage or Hide action.
reactions:
  - name: Reversal of Fortune
    desc: In response to another creature dealing damage to the nilbog, the nilbog reduces the damage to 0 and regains 3 (1d6) hit points.
```
