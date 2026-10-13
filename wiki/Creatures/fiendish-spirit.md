---
title: Fiendish Spirit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fiendish Spirit
size: Large
type: fiend
alignment: Neutral
ac_class: 12 + the spell's level
hp: 50 (Demon only) or 40 (Devil only) or 60 (Yugoloth only) + 15 for each spell level above 6
modifier: 3
speed: 40 ft., climb 40 ft. (Demon only), fly 60 ft. (Devil only)
stats: [ 13, 16, 15, 10, 10, 16 ]
damage_resistances: fire
damage_immunities: poison
condition_immunities: poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: Abyssal, Infernal, Telepathy 60 ft.
traits:
  - name: Death Throes (Demon Only)
    desc: When the spirit drops to 0 Hit Points or the spell ends, the spirit explodes. *Dexterity Saving Throw:* DC equals your spell save DC, each creature in a 10-foot Emanation originating from the spirit. *Failure:* 2d10 plus this spell's level Fire damage. *Success:* Half damage.
  - name: Devil's Sight (Devil Only)
    desc: Magical Darkness doesn't impede the spirit's Darkvision.
  - name: Magic Resistance
    desc: The spirit has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The spirit makes a number of attacks equal to half this spell's level (round down).
  - name: Bite (Demon Only)
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d12 + 3 + the spell's level Necrotic damage."
  - name: Claws (Yugoloth Only)
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d8 + 3 + the spell's level Slashing damage. Immediately after the attack hits or misses, the spirit can teleport up to 30 feet to an unoccupied space it can see."
  - name: Fiery Strike (Devil Only)
    desc: "*Melee or Ranged Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. or range 150 ft. *Hit:* 2d6 + 3 + the spell's level Fire damage."
```
