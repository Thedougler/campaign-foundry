---
title: Ancient Spirit Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Dragon
size: Gargantuan
habitat:
  - Any
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Spirit Dragon
size: Gargantuan
type: dragon
alignment: Neutral
ac: 21
hp: 420
hit_dice: 24d20 + 168
modifier: 9
speed: 40 ft., burrow 30 ft., fly 80 ft.
stats: [ 26, 14, 25, 24, 18, 23 ]
saves:
  - dex: 9
  - con: 14
skillsaves:
  - history: 14
  - insight: 11
  - perception: 11
  - stealth: 9
damage_resistances: necrotic
senses: Blindsight 60 ft., Darkvision 120 ft., passive Perception 21
languages: Common, Draconic; telepathy 120 ft.
cr: "22"
traits:
  - name: Legendary Resistance (4/Day, or 5/Day in Lair)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of (A) Time-Warping Breath or (B) Spellcasting to cast *Thunderwave* (level 2 version).
  - name: Rend
    desc: "*Melee Attack Roll:* +15, reach 15 ft. *Hit:* 19 (2d10 + 8) Slashing damage plus 9 (2d8) Necrotic damage."
  - name: Ruinous Breath (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 22, each creature in a 90-foot Cone. *Failure:* 72 (16d8) Necrotic damage. *Success:* Half damage."
  - name: Time-Warping Breath
    desc: "*Wisdom Saving Throw:* DC 22, each creature that isn't currently affected by this breath in a 90-foot Cone. *Failure:* The target's Speed is halved, it can't take Reactions, and it can take either an action or a Bonus Action on its turn, not both. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 22):

      **At will:** *Detect Magic*, *Shapechange* (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell), *Thunderwave* (level 2 version)

      **1/day each:** *Legend Lore* (as an action), *Sequester*
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
  - name: Shattering Wave
    desc: The dragon uses Spellcasting to cast *Thunderwave* (level 2 version).
  - name: Unearth Ruins
    desc: The dragon magically raises broken, ancient ruins in a 20-foot-radius, 60-foot-high Cylinder centred on a point it can see within 120 feet. Ground in the Cylinder becomes Difficult Terrain. Each creature in the Cylinder when it appears is subjected to the following effect. *Strength Saving Throw:* DC 22. *Failure:* 13 (3d8) Bludgeoning damage, and the target has the Prone condition. *Failure or Success:* The dragon can't take this action again until the start of its next turn.
```
