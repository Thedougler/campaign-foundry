---
title: Dracolich
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Undead
size: Huge or Gargantuan
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dracolich
size: Unknown
type: undead
alignment: Lawful Evil
ac: 20
hp: 225
hit_dice: 18d12 + 108
modifier: 12
speed: 40 ft., burrow 30 ft., fly 80 ft.
stats: [ 25, 10, 23, 19, 15, 21 ]
saves:
  - dex: 6
  - wis: 8
skillsaves:
  - perception: 14
  - stealth: 6
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: Blindsight 60 ft., Darkvision 120 ft., passive Perception 24
languages: Common, Draconic
cr: "17"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the dracolich fails a saving throw, it can choose to succeed instead.
  - name: Life Suppression
    desc: Creatures within 60 feet of the dracolich can't regain Hit Points.
  - name: Magic Resistance
    desc: The dracolich has Advantage on saving throws against spells and other magical effects.
  - name: Soul Gem
    desc: |-
      The dracolich has a magical gem. If the dracolich is destroyed while the gem is on the same plane of existence as it, the dracolich gains a new body in 1d20 days, regaining all its Hit Points and appearing within 5 feet of the gem.

      The gem is a Tiny object that has AC 20; HP 50; and Immunity to Necrotic, Poison, and Psychic damage. The gem regains all its Hit Points at the end of every turn, but it turns to dust if reduced to 0 Hit Points. If the gem is destroyed, the dracolich can create a new one by completing an 8-hour ritual using a gem worth 1,000+ GP and by expending 5,000 GP, which the ritual consumes.
actions:
  - name: Multiattack
    desc: The dracolich makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Ray of Sickness* (level 2 version).
  - name: Rend
    desc: "*Melee Attack Roll:* +13, reach 10 ft. *Hit:* 18 (2d10 + 7) Slashing damage plus 4 (1d8) Necrotic damage."
  - name: Necrotic Breath (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 20, each creature in a 60-foot Cone. *Failure:* 52 (8d12) Necrotic damage. *Success:* Half damage."
  - name: Spellcasting
    desc: |-
      The dracolich casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 19, +11 to hit with spell attacks):

      **At will:** *Detect Magic*, *Ray of Sickness* (level 2 version)

      **1/day each:** *Create Undead* (level 8 version), *Finger of Death*
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dracolich can expend a use to take one of the following actions. The dracolich regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Pounce
    desc: The dracolich moves up to half its Speed, and it makes one Rend attack.
  - name: Sickening Ray
    desc: The dracolich uses Spellcasting to cast *Ray of Sickness* (level 2 version). The dracolich can't take this action again until the start of its next turn.
  - name: Terrifying Presence
    desc: "*Wisdom Saving Throw:* DC 19, each creature in a 30-foot Emanation originating from the dracolich. *Failure:* 11 (2d10) Psychic damage, and the target has the Frightened condition until the end of its next turn. *Failure or Success:* The dracolich can't take this action again until the start of its next turn."
```
