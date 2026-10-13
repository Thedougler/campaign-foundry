---
title: Otherworldly Steed
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: ""
size: Large
habitat: []
sourcebooks:
  - Player's Handbook (2024)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Otherworldly Steed
size: Large
alignment: Neutral
ac_class: 10 + 1 per spell level
hp: 5 + 10 per spell level (the steed has a number of Hit Dice [d10s] equal to the spell's level)
modifier: 1
speed: 60 ft., fly 60 ft. (requires level 4+ spell)
stats: [ 18, 12, 14, 6, 12, 8 ]
senses: passive Perception 11
languages: telepathy 1 mile (works only with you)
traits:
  - name: Life Bond
    desc: When you regain Hit Points from a level 1+ spell, the steed regains the same number of Hit Points if you're within 5 feet of it.
actions:
  - name: Otherworldly Slam
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d8 + the spell's level of Radiant (Celestial), Psychic (Fey), or Necrotic (Fiend) damage."
bonus_actions:
  - name: Fell Glare (Fiend Only; Recharges after a Long Rest)
    desc: "*Wisdom Saving Throw:* DC equals your spell save DC, one creature within 60 feet the steed can see. *Failure:* The target has the Frightened condition until the end of your next turn."
  - name: Fey Step (Fey Only; Recharges after a Long Rest)
    desc: The steed teleports, along with its rider, to an unoccupied space of your choice up to 60 feet away from itself.
  - name: Healing Touch (Celestial Only; Recharges after a Long Rest)
    desc: One creature within 5 feet of the steed regains a number of Hit Points equal to 2d8 + the spell's level.
```
