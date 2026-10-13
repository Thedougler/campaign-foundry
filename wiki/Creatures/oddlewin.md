---
title: Oddlewin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Fey
size: Small
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Oddlewin
size: Small
type: fey
subtype: goblinoid
alignment: Chaotic Neutral
ac: 13
ac_class: leather armour
hp: 21
hit_dice: 6d6
modifier: 2
speed: 30 ft.
stats: [ 8, 14, 10, 10, 16, 15 ]
skillsaves:
  - performance: 4
  - stealth: 6
condition_immunities: charmed
senses: darkvision 60 ft., passive Perception 13
languages: Common, Goblin, Sylvan
cr: "2"
traits:
  - name: Fortune Teller
    desc: Oddlewin can cast the *Augury* spell as a ritual, using cards as the material component.
  - name: Nilbogism
    desc: |-
      Any creature that attempts to damage Oddlewin must first succeed on a DC 12 Charisma saving throw or have the charmed condition until the end of the creature's next turn. The creature must use its action praising Oddlewin.

      Oddlewin can't regain hit points, including through magical healing, except through his Reversal of Fortune reaction.
actions:
  - name: Fool's Sceptre
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) bludgeoning damage."
  - name: Cloud of Cards
    desc: Oddlewin conjures magical cards that slash at the air in a 5-foot cube within 60 feet of Oddlewin until the start of Oddlewin's next turn. A creature that starts its turn in the cube or that enters that area for the first time on a turn takes 10 (4d4) slashing damage.
  - name: Spellcasting
    desc: |-
      Oddlewin casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 12):

      **At will:** *Mage Hand*, *Tasha's Hideous Laughter*
bonus_actions:
  - name: Nimble Escape
    desc: Oddlewin takes the Disengage or Hide action.
reactions:
  - name: Reversal of Fortune
    desc: In response to another creature dealing damage to Oddlewin, Oddlewin reduces the damage to 0 and regains 9 (2d8) hit points.
```
