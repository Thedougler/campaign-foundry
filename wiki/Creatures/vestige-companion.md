---
title: Vestige Companion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: ""
size: Small
habitat: []
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vestige Companion
size: Small
alignment: Neutral
ac_class: 13 + your Charisma modifier
hp: 4 + four times your Warlock level (the vestige has a number of Hit Dice [d6s] equal to your Warlock level)
modifier: 2
speed: 5 ft., fly 30 ft. (hover)
stats: [ 1, 14, 10, 15, 15, 16 ]
damage_resistances: fire (Fiend only)
condition_immunities: charmed, frightened, prone
senses: passive Perception 12
languages: speaks the languages you know
traits:
  - name: Pact Bond
    desc: Add your Proficiency Bonus to any ability check or saving throw the vestige makes.
actions:
  - name: Vestige's Strike
    desc: "*Melee or Ranged Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. or range 60 ft. *Hit:* 1d6 + 3 plus your Charisma modifier Fire (Fiend), Necrotic (Undead), or Radiant (Celestial) damage."
bonus_actions:
  - name: Divine Power (1/Day)
    desc: |-
      Your vestige manifests a remnant of its divine power in one of the following ways, based on its form:

      **Cursed Invocation (Undead Only).** The vestige places a curse on a creature you can see within 30 feet of the vestige for 1 minute. While cursed, the target has Disadvantage on attack rolls against you and the vestige.

      **Fiendish Swap (Fiend Only).** If you and the vestige are within 60 feet of each other, you both teleport, swapping places.

      **Healing Touch (Celestial Only).** The vestige touches another creature. The target regains Hit Points equal to 2d8 plus your Charisma modifier and ends one condition on it: Blinded, Deafened, or Poisoned.
```
