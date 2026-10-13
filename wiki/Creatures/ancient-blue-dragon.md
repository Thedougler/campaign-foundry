---
title: Ancient Blue Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: Dragon
size: Gargantuan
habitat:
  - Coastal
  - Desert
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Blue Dragon
size: Gargantuan
type: dragon
subtype: chromatic
alignment: Lawful Evil
ac: 22
hp: 481
hit_dice: 26d20 + 208
modifier: 14
speed: 40 ft., burrow 40 ft., fly 80 ft.
stats: [ 29, 10, 27, 18, 17, 25 ]
saves:
  - dex: 7
  - wis: 10
skillsaves:
  - perception: 17
  - stealth: 7
damage_immunities: lightning
senses: Blindsight 60 ft., Darkvision 120 ft., passive Perception 27
languages: Common, Draconic
cr: "23"
traits:
  - name: Legendary Resistance (4/Day, or 5/Day in Lair)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Shatter* (level 3 version).
  - name: Rend
    desc: "*Melee Attack Roll:* +16, reach 15 ft. *Hit:* 18 (2d8 + 9) Slashing damage plus 11 (2d10) Lightning damage."
  - name: Lightning Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 23, each creature in a 120-foot-long, 10-foot-wide Line. *Failure:* 88 (16d10) Lightning damage. *Success:* Half damage."
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 22):

      **At will:** *Detect Magic*, *Invisibility*, *Mage Hand*, *Shatter* (level 3 version)

      **1/day each:** *Scrying*, *Sending*
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Cloaked Flight
    desc: The dragon uses Spellcasting to cast *Invisibility* on itself, and it can fly up to half its Fly Speed. The dragon can't take this action again until the start of its next turn.
  - name: Sonic Boom
    desc: The dragon uses Spellcasting to cast *Shatter* (level 3 version). The dragon can't take this action again until the start of its next turn.
  - name: Tail Swipe
    desc: The dragon makes one Rend attack.
```
