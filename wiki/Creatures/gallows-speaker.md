---
title: Gallows Speaker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Undead
size: Huge
habitat:
  - Grassland
  - Planar (Shadowfell)
  - Swamp
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gallows Speaker
size: Huge
type: undead
alignment: Chaotic Evil
ac: 13
hp: 75
hit_dice: 10d12 + 10
modifier: 3
speed: 5 ft., fly 40 ft. (hover)
stats: [ 9, 16, 12, 10, 12, 19 ]
damage_resistances: bludgeoning, piercing, slashing, thunder
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: Truesight 60 ft., passive Perception 11
languages: Common plus two other languages
cr: "6"
traits:
  - name: Aura of Violence
    desc: At the end of each of the gallows speaker's turns, each creature of the gallows speaker's choice in a 15-foot Emanation originating from the gallows speaker suffers the following effect. *Wisdom Saving Throw:* DC 15. *Failure:* The target takes a Reaction to make a melee attack roll against a creature within reach. If no creature is within reach, the target takes 7 (2d6) Psychic damage.
  - name: Whirling Form
    desc: The gallows speaker can enter a creature's space and stop there.
actions:
  - name: Multiattack
    desc: The gallows speaker makes two Whirling Blades attacks.
  - name: Whirling Blades
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 60 ft. *Hit:* 13 (3d6 + 3) Slashing damage plus 7 (3d4) Necrotic damage."
  - name: Howling Wind (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 15, each creature in a 30-foot Cone. *Failure:* 18 (4d8) Thunder damage, and the target has the Frightened condition for 1 minute. While Frightened in this way, the creature has the Deafened condition, is compelled to shriek along with the gallows speaker, and can't cast spells with a Verbal component. The target repeats the save at the end of each of its turns, ending the effect on itself on a success. *Success:* Half damage only."
```
