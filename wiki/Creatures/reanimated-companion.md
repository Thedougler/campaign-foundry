---
title: Reanimated Companion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Reanimated Companion
size: Medium
type: undead
alignment: Neutral
ac_class: 10 plus your Intelligence modifier
hp: 5 plus five times your Artificer level (the companion has a number of Hit Dice [d8s] equal to your Artificer level)
modifier: 0
speed: 30 ft.
stats: [ 11, 10, 16, 4, 10, 6 ]
damage_resistances: necrotic, poison
damage_immunities: lightning
condition_immunities: charmed, exhaustion, poisoned
senses: blindsight 60 ft., passive Perception 10
languages: understands the languages you know
traits:
  - name: Death Burst
    desc: The companion explodes when it dies. *Dexterity Saving Throw:* DC equals your spell save DC, each creature in a 10-foot Emanation originating from the companion. *Failure:* 2d4 Necrotic damage. *Success:* Half damage.
  - name: Lightning Absorption
    desc: Whenever the companion is subjected to Lightning damage, it regains a number of Hit Points equal to the Lightning damage dealt.
actions:
  - name: Dreadful Swipe
    desc: "*Melee Attack Roll:* Bonus equals your spell attack modifier, reach 5 ft. *Hit:* 1d4 plus your Intelligence modifier Necrotic damage, and the target can't take Opportunity Attacks until the start of its next turn."
```
