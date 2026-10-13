---
title: Colossus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 25
creature_type: Construct
size: Gargantuan
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Colossus
size: Gargantuan
type: construct
subtype: titan
alignment: Unaligned
ac: 23
hp: 553
hit_dice: 27d20 + 270
modifier: 16
speed: 60 ft.
stats: [ 30, 11, 30, 3, 11, 8 ]
saves:
  - dex: 8
  - wis: 8
damage_resistances: necrotic, radiant
damage_immunities: poison, psychic
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned, stunned, unconscious
senses: Truesight 300 ft., passive Perception 10
languages: understands Celestial and Common but can't speak
cr: "25"
traits:
  - name: Immutable Form
    desc: The colossus can't shape-shift.
  - name: Legendary Resistance (4/Day)
    desc: If the colossus fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The colossus has Advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The colossus deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The colossus makes three attacks, using Slam or Radiant Ray in any combination.
  - name: Slam
    desc: "*Melee Attack Roll:* +18, reach 20 ft. *Hit:* 32 (4d10 + 10) Bludgeoning damage, and the colossus pushes the target up to 20 feet straight away from itself."
  - name: Radiant Ray
    desc: "*Ranged Attack Roll:* +18, range 300 ft. *Hit:* 22 (4d10) Radiant damage. If the target is a Large or smaller creature, it has the Prone condition."
  - name: Divine Beam (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 26, each creature in a 300-foot-long, 10-foot-wide Line. *Failure:* 65 (10d12) Radiant damage. *Success:* Half damage. *Failure or Success:* A creature reduced to 0 Hit Points by this beam disintegrates into dust, leaving behind any magic items it was wearing or carrying."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the colossus can expend a use to take one of the following actions. The colossus regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Smite
    desc: The colossus makes one Radiant Ray attack.
  - name: Stomp
    desc: The colossus moves up to half its Speed without provoking Opportunity Attacks, and it can make one Slam attack at any point during that move.
```
