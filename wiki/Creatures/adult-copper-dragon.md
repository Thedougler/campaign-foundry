---
title: Adult Copper Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Dragon
size: Huge
habitat:
  - Hill
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Copper Dragon
size: Huge
type: dragon
subtype: metallic
alignment: Chaotic Good
ac: 18
hp: 184
hit_dice: 16d12 + 80
modifier: 11
speed: 40 ft., climb 40 ft., fly 80 ft.
stats: [ 23, 12, 21, 18, 15, 18 ]
saves:
  - dex: 6
  - wis: 7
skillsaves:
  - deception: 9
  - perception: 12
  - stealth: 6
damage_immunities: acid
senses: Blindsight 60 ft., Darkvision 120 ft., passive Perception 22
languages: Common, Draconic
cr: "14"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of (A) Slowing Breath or (B) Spellcasting to cast *Mind Spike* (level 4 version).
  - name: Rend
    desc: "*Melee Attack Roll:* +11, reach 10 ft. *Hit:* 17 (2d10 + 6) Slashing damage plus 4 (1d8) Acid damage."
  - name: Acid Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 18, each creature in an 60-foot-long, 5-foot-wide Line. *Failure:* 54 (12d8) Acid damage. *Success:* Half damage."
  - name: Slowing Breath
    desc: "*Constitution Saving Throw:* DC 18, each creature in a 60-foot Cone. *Failure:* The target can't take Reactions; its Speed is halved; and it can take either an action or a Bonus Action on its turn, not both. This effect lasts until the end of its next turn."
  - name: Spellcasting
    desc: |-
      The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *Detect Magic*, *Mind Spike* (level 4 version), *Minor Illusion*, *Shapechange* (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell)

      **1/day each:** *Greater Restoration*, *Major Image*
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Giggling Magic
    desc: "*Charisma Saving Throw:* DC 17, one creature the dragon can see within 90 feet. *Failure:* 24 (7d6) Psychic damage. Until the end of its next turn, the target rolls 1d6 whenever it makes an ability check or attack roll and subtracts the number rolled from the D20 Test. *Failure or Success:* The dragon can't take this action again until the start of its next turn."
  - name: Mind Jolt
    desc: The dragon uses Spellcasting to cast *Mind Spike* (level 4 version). The dragon can't take this action again until the start of its next turn.
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
```
