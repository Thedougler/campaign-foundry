---
title: Adult Green Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Dragon
size: Huge
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Green Dragon
size: Huge
type: dragon
subtype: chromatic
alignment: Lawful Evil
ac: 19
hp: 207
hit_dice: 18d12 + 90
modifier: 11
speed: 40 ft., fly 80 ft., swim 40 ft.
stats: [ 23, 12, 21, 18, 15, 18 ]
saves:
  - dex: 6
  - wis: 7
skillsaves:
  - deception: 9
  - perception: 12
  - persuasion: 9
  - stealth: 6
damage_immunities: poison
condition_immunities: poisoned
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
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Mind Spike* (level 3 version).
  - name: Rend
    desc: "*Melee Attack Roll:* +11, reach 10 ft. *Hit:* 15 (2d8 + 6) Slashing damage plus 7 (2d6) Poison damage."
  - name: Poison Breath (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 18, each creature in a 60-foot Cone. *Failure:* 56 (16d6) Poison damage. *Success:* Half damage."
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *Detect Magic*, *Mind Spike* (level 3 version)

      **1/day:** *Geas*
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Mind Invasion
    desc: The dragon uses Spellcasting to cast *Mind Spike* (level 3 version).
  - name: Noxious Miasma
    desc: "*Constitution Saving Throw:* DC 17, each creature in a 20-foot-radius Sphere centred on a point the dragon can see within 90 feet. *Failure:* 7 (2d6) Poison damage, and the target takes a -2 penalty to AC until the end of its next turn. *Failure or Success:* The dragon can't take this action again until the start of its next turn."
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
```
