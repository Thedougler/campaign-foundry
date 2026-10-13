---
title: Adult Bronze Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Dragon
size: Huge
habitat:
  - Coastal
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Bronze Dragon
size: Huge
type: dragon
subtype: metallic
alignment: Lawful Good
ac: 18
hp: 212
hit_dice: 17d12 + 102
modifier: 10
speed: 40 ft., fly 80 ft., swim 40 ft.
stats: [ 25, 10, 23, 16, 15, 20 ]
saves:
  - dex: 5
  - wis: 7
skillsaves:
  - insight: 7
  - perception: 12
  - stealth: 5
damage_immunities: lightning
senses: Blindsight 60 ft., Darkvision 120 ft., passive Perception 22
languages: Common, Draconic
cr: "15"
traits:
  - name: Amphibious
    desc: The dragon can breathe air and water.
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of (A) Repulsion Breath or (B) Spellcasting to cast *Guiding Bolt* (level 2 version).
  - name: Rend
    desc: "*Melee Attack Roll:* +12, reach 10 ft. *Hit:* 16 (2d8 + 7) Slashing damage plus 5 (1d10) Lightning damage."
  - name: Lightning Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 19, each creature in a 90-foot-long, 5-foot-wide Line. *Failure:* 55 (10d10) Lightning damage. *Success:* Half damage."
  - name: Repulsion Breath
    desc: "*Strength Saving Throw:* DC 19, each creature in a 30-foot Cone. *Failure:* The target is pushed up to 60 feet straight away from the dragon and has the Prone condition."
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17, +10 to hit with spell attacks):

      **At will:** *Detect Magic*, *Guiding Bolt* (level 2 version), *Shapechange* (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell), *Speak with Animals*, *Thaumaturgy*

      **1/day each:** *Detect Thoughts*, *Water Breathing*
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Guiding Light
    desc: The dragon uses Spellcasting to cast *Guiding Bolt* (level 2 version).
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
  - name: Thunderclap
    desc: "*Constitution Saving Throw:* DC 17, each creature in a 20-foot-radius Sphere centred on a point the dragon can see within 90 feet. *Failure:* 10 (3d6) Thunder damage, and the target has the Deafened condition until the end of its next turn."
```
