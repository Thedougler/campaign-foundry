---
title: Ancient Red Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 24
creature_type: Dragon
size: Gargantuan
habitat:
  - Hill
  - Mountain
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Red Dragon
size: Gargantuan
type: dragon
subtype: chromatic
alignment: Chaotic Evil
ac: 22
hp: 507
hit_dice: 26d20 + 234
modifier: 14
speed: 40 ft., climb 40 ft., fly 80 ft.
stats: [ 30, 10, 29, 18, 15, 27 ]
saves:
  - dex: 7
  - wis: 9
skillsaves:
  - perception: 16
  - stealth: 7
damage_immunities: fire
senses: Blindsight 60 ft., Darkvision 120 ft., passive Perception 26
languages: Common, Draconic
cr: "24"
traits:
  - name: Legendary Resistance (4/Day, or 5/Day in Lair)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray* (level 3 version).
  - name: Rend
    desc: "*Melee Attack Roll:* +17, reach 15 ft. *Hit:* 19 (2d8 + 10) Slashing damage plus 10 (3d6) Fire damage."
  - name: Fire Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 24, each creature in a 90-foot Cone. *Failure:* 91 (26d6) Fire damage. *Success:* Half damage."
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 23, +15 to hit with spell attacks):

      **At will:** *Command* (level 2 version), *Detect Magic*, *Scorching Ray* (level 3 version)

      **1/day each:** *Fireball* (level 6 version), *Scrying*
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Commanding Presence
    desc: The dragon uses Spellcasting to cast *Command* (level 2 version). The dragon can't take this action again until the start of its next turn.
  - name: Fiery Rays
    desc: The dragon uses Spellcasting to cast *Scorching Ray* (level 3 version). The dragon can't take this action again until the start of its next turn.
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
```
