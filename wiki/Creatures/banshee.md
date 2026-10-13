---
title: Banshee
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Undead
size: Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Banshee
size: Medium
type: undead
alignment: Chaotic Evil
ac: 12
hp: 54
hit_dice: 12d8
modifier: 2
speed: 5 ft., fly 40 ft. (hover)
stats: [ 1, 14, 10, 12, 11, 17 ]
saves:
  - wis: 2
damage_resistances: acid, bludgeoning, fire, lightning, piercing, slashing, thunder
damage_immunities: cold, necrotic, poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: Darkvision 60 ft., passive Perception 10
languages: Common, Elvish
cr: "4"
traits:
  - name: Detect Life
    desc: The banshee magically senses the direction of creatures up to 1 mile away that aren't Constructs or Undead.
  - name: Incorporeal Movement
    desc: The banshee can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
actions:
  - name: Multiattack
    desc: The banshee makes two Corrupting Touch attacks and uses Horrify.
  - name: Corrupting Touch
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Necrotic damage."
  - name: Horrify
    desc: "*Wisdom Saving Throw:* DC 13, one creature the banshee can see within 60 feet that can see the banshee. *Failure:* The target has the Frightened condition until the start of the banshee's next turn. *Success:* The target is immune to this banshee's Horrify for 24 hours."
  - name: Deathly Wail (1/Day)
    desc: The banshee releases a mournful wail if it isn't in sunlight. *Constitution Saving Throw:* DC 13, each creature within 30 feet that can hear the wail and isn't a Construct or an Undead. *Failure:* If the target has 25 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, the target takes 10 (3d6) Psychic damage.
```
