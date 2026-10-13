---
title: Adult Spirit Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Dragon
size: Huge
habitat:
  - Any
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Spirit Dragon
size: Huge
type: dragon
alignment: Neutral
ac: 18
hp: 207
hit_dice: 18d12 + 90
modifier: 7
speed: 40 ft., burrow 30 ft., fly 80 ft.
stats: [ 22, 15, 21, 20, 15, 19 ]
saves:
  - dex: 7
  - con: 10
skillsaves:
  - history: 10
  - insight: 7
  - perception: 7
  - stealth: 7
damage_resistances: necrotic
senses: Blindsight 30 ft., Darkvision 120 ft., passive Perception 17
languages: Common, Draconic; telepathy 120 ft.
cr: "15"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of (A) Time-Warping Breath or (B) Spellcasting to cast *Thunderwave*.
  - name: Rend
    desc: "*Melee Attack Roll:* +11, reach 10 ft. *Hit:* 15 (2d8 + 6) Slashing damage plus 7 (2d6) Necrotic damage."
  - name: Ruinous Breath (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 18, each creature in a 60-foot Cone. *Failure:* 63 (14d8) Necrotic damage. *Success:* Half damage."
  - name: Time-Warping Breath
    desc: "*Wisdom Saving Throw:* DC 18, each creature that isn't currently affected by this breath in a 60-foot Cone. *Failure:* The target's Speed is halved, it can't take Reactions, and it can take either an action or a Bonus Action on its turn, not both. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Magic*, *Shapechange* (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell), *Thunderwave*

      **1/day:** *Legend Lore* (as an action)
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
  - name: Shattering Wave
    desc: The dragon uses Spellcasting to cast *Thunderwave*.
  - name: Unearth Ruins
    desc: The dragon magically raises broken, ancient ruins in a 20-foot-radius, 60-foot-high Cylinder centred on a point it can see within 120 feet. Ground in the Cylinder becomes Difficult Terrain. Each creature in the Cylinder when it appears is subjected to the following effect. *Strength Saving Throw:* DC 18. *Failure:* 5 (2d4) Bludgeoning damage, and the target has the Prone condition. *Failure or Success:* The dragon can't take this action again until the start of its next turn.
```
