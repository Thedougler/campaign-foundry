---
title: Adult Brass Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Dragon
size: Huge
habitat:
  - Desert
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Brass Dragon
size: Huge
type: dragon
subtype: metallic
alignment: Chaotic Good
ac: 18
hp: 172
hit_dice: 15d12 + 75
modifier: 10
speed: 40 ft., burrow 30 ft., fly 80 ft.
stats: [ 23, 10, 21, 14, 13, 17 ]
saves:
  - dex: 5
  - wis: 6
skillsaves:
  - history: 7
  - perception: 11
  - persuasion: 8
  - stealth: 5
damage_immunities: fire
senses: Blindsight 60 ft., Darkvision 120 ft., passive Perception 21
languages: Common, Draconic
cr: "13"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of (A) Sleep Breath or (B) Spellcasting to cast *Scorching Ray*.
  - name: Rend
    desc: "*Melee Attack Roll:* +11, reach 10 ft. *Hit:* 17 (2d10 + 6) Slashing damage plus 4 (1d8) Fire damage."
  - name: Fire Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 18, each creature in a 60-foot-long, 5-foot-wide Line. *Failure:* 45 (10d8) Fire damage. *Success:* Half damage."
  - name: Sleep Breath
    desc: "*Constitution Saving Throw:* DC 18, each creature in a 60-foot Cone. *Failure:* The target has the Incapacitated condition until the end of its next turn, at which point it repeats the save. *2Nd Failure:* The target has the Unconscious condition for 10 minutes. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it."
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *Detect Magic*, *Minor Illusion*, *Scorching Ray*, *Shapechange* (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell), *Speak with Animals*

      **1/day each:** *Detect Thoughts*, *Control Weather*
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Blazing Light
    desc: The dragon uses Spellcasting to cast *Scorching Ray*.
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
  - name: Scorching Sands
    desc: "*Dexterity Saving Throw:* DC 16, one creature the dragon can see within 120 feet. *Failure:* 27 (6d8) Fire damage, and the target's Speed is halved until the end of its next turn. *Failure or Success:* The dragon can't take this action again until the start of its next turn."
```
